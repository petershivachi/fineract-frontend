import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MaterialModule } from "./material.module";
import { FeatherIconsModule } from "./components/feather-icons/feather-icons.module";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableExporterModule } from "mat-table-exporter";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { RoleFilterDirective } from "./directivies/role-filter.directive";
import { WeakRoleFilterDirective } from "./directivies/weak-role-filter.directive";
@NgModule({
  declarations: [RoleFilterDirective, WeakRoleFilterDirective],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      NgbModule,
  ],
  exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      NgbModule,
      PerfectScrollbarModule,
      MaterialModule,
      FeatherIconsModule,
      MatSnackBarModule,
      RoleFilterDirective,
      WeakRoleFilterDirective,
      MatIconModule,
      MatMenuModule,
      MatRadioModule,
      MatFormFieldModule,
      MatSelectModule,
      MatTabsModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatDialogModule,
      MatTableExporterModule,
      MatProgressSpinnerModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule
  ],
  providers: [],
})
export class SharedModule {}
