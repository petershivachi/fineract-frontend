import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs";
import { UserService } from "src/app/data/services/user.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { UserError } from "src/app/shared/data/error";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-add-user-form",
  templateUrl: "./add-user-form.component.html",
  styleUrls: ["./add-user-form.component.sass"],
})
export class AddUserFormComponent extends BaseComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  isPersonal: boolean = true;
  files: FileList;
  myForm: FormData = new FormData();

  accountTypes: string[] = [
    "Personal Account",
    "Joint Account",
    "Company Account",
    "Group Account",
  ];

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private userService: UserService
  ) {
    super();

    this.docForm = this.fb.group({
      username: ["", [Validators.required]],
      officeId: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      email: ["", [Validators.required]],
      roles: ["", [Validators.required]],
      accountType: [""]
    });
  }

  ngOnInit(): void {}

  uploadFilesOption(event) {
    console.log("Event ", event);
  }

  uploadFiles(event: any, docType: any) {
    console.log("My FILE ******* ", docType);
    const files: FileList = event.target.files;

    if (files.length > 1) {
      throw new UserError(`MESSAGE: ${"Please upload one file"}`);
    } else {
      for (let i = 0; i < files.length; i++) {
        this.myForm.append(docType, files[i]);

        console.log("My FILE ******* ", docType, files[i].name);
      }
    }
  }

  validateCheckFilesStartsWithAllowedFormart(arr: boolean[]): boolean {
    return arr.every((value) => value === true);
  }

  reconcileFiles() {
    console.log("Doc Form Value", this.docForm.value);

    this.myForm.append("apiRequestBodyAsJson", this.docForm.value);

    Array.from((this.myForm as any).entries()).forEach((i) => {
      console.log("Item ", i);
    });

    this.userService
      .createUserAccounts(this.myForm)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "Account added successfully !",
            "text-danger"
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
