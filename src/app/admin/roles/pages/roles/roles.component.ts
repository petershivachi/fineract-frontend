import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import {RoleService} from "../../data/services/role.service";
import {UserError} from "../../../../shared/data/error";


@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.sass"],
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "name",
    "disabled",
    "description",
    "actions",
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  selection = new SelectionModel<any>(true, []);
  data: any;
  error: any;
  isLoading: boolean = true;
  Roles: any[] = [];
  currentUser: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private roleService: RoleService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {

    // this.currentUser = this.tokenCookieService.getUser().username;

    this.getRoles();
  }

  refresh() {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getAllRoles().subscribe(
      (res) => {
        console.log("Roles *** ", res)
        if (res.length > 0) {
          this.isLoading = false;

          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        throw new UserError(err.message);;
      }
    );
  }

  hasAccess: boolean;
 
  addRoleCall() {
    this.router.navigate(["/admin/roles/add"]);
  }

  viewRoleCall(data) {
    // sessionStorage.setItem("viewRolesData", JSON.stringify(data));

    console.log(data);
    this.router.navigate([`/admin/roles/add`], {
      state: {
        function_type: "VIEW",
        data,
      },
    });
  }

  editRoleCall(data) {
      this.router.navigate([`/admin/roles/add`], {
        state: {
          function_type: "UPDATE",
          data,
        },
      });

  
  }

  deleteRoleCall(data) {
    // sessionStorage.setItem("editRolesData", JSON.stringify(data));
      this.router.navigate([`/admin/roles/add`], {
        state: {
          function_type: "DELETE",
          data
        },
      });
  }

  activateRole(data) {
    if (this.hasAccess) {
      // sessionStorage.setItem("editRolesData", JSON.stringify(data));
      this.router.navigate([`/admin/roles/add`], {
        state: {
          function_type: "ACTIVATE",
          data
        },
      });
    } 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateStatus(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      data: row,
    };
    // const dialogRef = this.dialog.open(RoleStatusComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.getRoles();
    // });
  }
}
