import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { NotificationService } from "src/app/data/services/notification.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { RoleService } from "../../data/services/role.service";
import { Role } from "../../data/types/role";
import { Privilege } from "../../data/types/privilege";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { UserError } from "../../../../shared/data/error";

interface Node {
  name: string;
  children?: Node[];
  accessRight?: Privilege;
  category?: string;
  subCategory?: string;
}

interface SingleSelection {
  selected: SelectionModel<string>;
  total: number;
}

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.sass"],
})
export class AddRoleComponent extends BaseComponent implements OnInit {
  loading = false;
  function_type: string;

  rolesData: Role;
  roleTree = {};
  rolesInTree: Node[] = [];
  treeControl = new NestedTreeControl<Node>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();
  selection: SelectionModel<String> = new SelectionModel<String>(true, []);
  nodesDict: any = {};
  roleName: string = "";

  selectionMap: Map<string, SingleSelection> = new Map<
    string,
    SingleSelection
  >();

  private basicActionsAddOns: {
    name: string;
    selected: boolean;
    accessRights: string;
  }[];

  apiFormData: FormGroup;

  displayArray: { name: string; selected: boolean; accessRights: string }[];
  obj: any;
  hasChild = (_: number, node: Node) =>
    !!node.children && node.children.length > 0;
  isLoading = true;

  constructor(
    private router: Router,
    private notificationAPI: NotificationService,
    private roleService: RoleService
  ) {
    super();

    if (this.router.getCurrentNavigation().extras.state) {
      this.function_type =
        this.router.getCurrentNavigation().extras.state.function_type;
      this.rolesData = this.router.getCurrentNavigation().extras.state.data;
    } else {
      this.function_type = "ADD";
    }
  }

  ngOnInit() {
    // this.roleService
    //   .fetchAllAccessRights()
    //   .pipe(takeUntil(this.subject))
    //   .subscribe({
    //     next: (res) => {
    //       this.isLoading = false;
    //       this.createRoleTree(res);
    //       this.createDatasource();
    //       this.initializeRoles();
    //     },
    //     error: (err) => {
    //       this.isLoading = false;
    //       throw new UserError(err.message);
    //     },
    //   });
  }

  createRoleTree(accessRights: Privilege[]) {
    accessRights.forEach((privilege) => {
      if (this.roleTree[privilege.category]) {
        if (this.roleTree[privilege.category][privilege.subCategory]) {
          this.roleTree[privilege.category][privilege.subCategory].push(
            privilege
          );
        } else {
          this.roleTree[privilege.category][privilege.subCategory] = [
            privilege,
          ];
        }
      } else {
        this.roleTree[privilege.category] = {};
        this.roleTree[privilege.category][privilege.subCategory] = [privilege];
      }
    });
  }

  private initializeRoles() {
    if (!!this.rolesData) {
      this.rolesData.accessRights.forEach((priv) => {
        this.selection.select(priv.accessRights);
        this.selectionMap.get(priv.category).selected.select(priv.accessRights);
        this.selectionMap
          .get(priv.subCategory)
          .selected.select(priv.accessRights);
      });
      this.roleName = this.rolesData.name;
    }
  }

  private createDatasource() {
    for (const category of Object.keys(this.roleTree)) {
      const children: Node[] = [];
      const subs = this.roleTree[category];
      let total = 0;
      for (const subCategory of Object.keys(subs)) {
        const accessRights: Privilege[] = subs[subCategory];
        const miniChildren: Node[] = accessRights.map((priv) => {
          const node = {
            name: priv.name,
            accessRight: priv,
            subCategory: subCategory,
            category: category,
          };
          this.nodesDict[priv.accessRights] = node;
          return node;
        });
        children.push({
          name: subCategory,
          children: miniChildren,
          category: category,
        });
        this.selectionMap.set(subCategory, {
          selected: new SelectionModel<string>(true, []),
          total: miniChildren.length,
        });
        total += miniChildren.length;
      }
      this.rolesInTree.push({
        name: category,
        children: children,
      });
      this.selectionMap.set(category, {
        selected: new SelectionModel<string>(true, []),
        total: total,
      });
    }
    this.dataSource.data = this.rolesInTree;
  }

  onSubmit() {
    this.loading = true;
    const role: Role = {
      name: this.roleName.toUpperCase(),
      privileges: this.selection.selected,
    };
    if (!!this.rolesData) {
      role.id = this.rolesData.id;
    }
    if (this.function_type == "ADD") {
      this.roleService.createRole(role).subscribe({
        next: (res) => {
          this.notificationAPI.alertSuccess(res.message);
          this.loading = false;
          this.clearAll();
        },
        error: (err) => {
          this.loading = false;
          throw new UserError(err.message);
        },
      });
    } else if (this.function_type == "UPDATE") {
      this.roleService.updateRole(role).subscribe({
        next: (res) => {
          this.loading = false;
          this.notificationAPI.alertSuccess(res.message);
          this.clearAll();
        },
        error: (err) => {
          this.loading = false;
          throw new UserError(err.message);
        },
      });
    } else if (this.function_type == "DELETE"){
      this.roleService.deactivateRole(this.rolesData.id).subscribe({
        next: res=>{
          this.loading = false;
          this.notificationAPI.alertSuccess(res.message);
          this.clearAll();
        },
        error: (err)=>{
          this.loading = false;
          throw new UserError(err.message);
        }
      })
    }
  }

  clearAll(): void {
    this.roleName = "";
    this.selection.clear();
    for (const value of this.selectionMap.values()) {
      value.selected.clear();
    }
  }

  selectAllByCategoryOrSubCategory(node: Node, event) {
    const indSelection = this.selectionMap.get(node.name);

    if (!!node.category) {
      const value = this.roleTree[node.category][node.name];
      const rights = value.map((priv) => priv.accessRights);
      const parentSelection = this.selectionMap.get(node.category);
      if (event.checked) {
        this.selection.select(...rights);
        indSelection.selected.select(...rights);
        parentSelection.selected.select(...rights);
      } else {
        this.selection.deselect(...rights);
        indSelection.selected.deselect(...rights);
        parentSelection.selected.deselect(...rights);
      }
    } else {
      const cat = this.roleTree[node.name];
      for (const key of Object.keys(cat)) {
        const value: Privilege[] = cat[key];
        const childSelection = this.selectionMap.get(key);

        const rights = value.map((priv) => priv.accessRights);
        if (event.checked) {
          this.selection.select(...rights);
          indSelection.selected.select(...rights);
          childSelection.selected.select(...rights);
        } else {
          this.selection.deselect(...rights);
          indSelection.selected.deselect(...rights);
          childSelection.selected.deselect(...rights);
        }
      }
    }
  }

  childChanged(node: Node) {
    this.selection.toggle(node.accessRight.accessRights);
    this.selectionMap
      .get(node.category)
      .selected.toggle(node.accessRight.accessRights);
    this.selectionMap
      .get(node.subCategory)
      .selected.toggle(node.accessRight.accessRights);
  }

    removeSelected(each: String) {
    //@ts-ignore
    this.childChanged(this.nodesDict[each]);
    }
}
