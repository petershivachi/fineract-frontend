import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { BaseComponent } from "./base/base.component";
import { NotificationDialogComponent } from "./notification-dialog/notification-dialog.component";

@NgModule({
  declarations: [
    FileUploadComponent,
    BreadcrumbComponent,
    BaseComponent,
    NotificationDialogComponent
  ],
  imports: [SharedModule, MatCardModule, MatDialogModule, PerfectScrollbarModule, MatIconModule],
  exports: [FileUploadComponent, BreadcrumbComponent],
})
export class ComponentsModule {}
