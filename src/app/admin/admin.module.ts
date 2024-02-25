import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { CdkColumnDef } from "@angular/cdk/table";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableExporterModule } from "mat-table-exporter";
import { ComponentsModule } from "../shared/components/components.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    MatTableModule,
    MatTableExporterModule,
    ComponentsModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    MatRadioModule,
    MatCardModule,
  ],
  providers: [CdkColumnDef, DatePipe],
})
export class AdminModule {}
