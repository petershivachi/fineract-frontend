import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NotificationDialogData } from "../data/notification-dialog-data";
import { NotificationDialogComponent } from "../components/notification-dialog/notification-dialog.component";

@Injectable({
  providedIn: "root",
})
export class GlobalErrorHandlerService extends ErrorHandler {
  constructor(private dialog: MatDialog, private ngZone: NgZone) {
    super();
  }

  handleError(error: Error) {
    console.log("Error name is: ", error.name);
    if (error.name === "error" || error.name === "success") {
      this.ngZone.run(() => {
        const data: NotificationDialogData = {
          message: error.message,
          status: error.name == "error" ? "error" : "success",
          buttonText: error.name == "error" ? "Cancel" : "Ok",
          icon: "error",
        };
        this.dialog.open(NotificationDialogComponent, {
          data,
          maxWidth: "500px"
        });
      });
    } else {
      console.error("Error is: ", error);
    }
  }
}
