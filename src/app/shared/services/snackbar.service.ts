import { Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(private _snackBar: MatSnackBar) {}

  showNotification(text, colorName) {
    this._snackBar.open(text, "X", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: [colorName, "login-snackbar"],
    });
  }

  showErrorNotification(text): void{
    this._snackBar.open(text, "X", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ["snackbar-danger", "login-snackbar"],
    });
  }


  showLongErrorNotification(text): void{
    this._snackBar.open(text, "X", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 10000,
      panelClass: ["snackbar-danger", "login-snackbar"],
    });
  }

}
