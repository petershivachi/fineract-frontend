import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {NotificationDialogData} from "../../data/notification-dialog-data";
import Swal from "sweetalert2";

@Component({
  selector: "app-notification-dialog",
  templateUrl: "./notification-dialog.component.html",
  styleUrls: ["./notification-dialog.component.sass"],
})
export class NotificationDialogComponent implements OnInit {

  icon = "info";
  message="----";
  buttonText = "Ok"
  status = "error"
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: NotificationDialogData,
    private dialogRef: MatDialogRef<NotificationDialogComponent>
  ) {
    if (data?.icon) this.icon = data.icon;
    if (data?.message) this.message = data.message;
    if (data?.buttonText) this.buttonText = data.buttonText;
    if(data?.status) this.status = data.status
  }
  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
