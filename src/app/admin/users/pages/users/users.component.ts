import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { BehaviorSubject, takeUntil } from "rxjs";
import { UserTableComponent } from "./user-table/user-table.component";
import { HttpParams } from "@angular/common/http";
import { UserService } from "src/app/data/services/user.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.sass"],
})
export class UsersComponent extends BaseComponent implements OnInit {
  loading: boolean;
  tab1DisplayedColumns: string[] = [];
  reconDate: string;
  allPaybillRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  matchedPaybillRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  mismatchedAirtimeRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  pendingReversalsRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  webAndFinSpilloverRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  settledReversalsRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  pendingFloatRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  settledFloatRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  webSpilloverRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  finSpilloverRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  verifedExceptionRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  settledManualCompletionRecords: BehaviorSubject<any> = new BehaviorSubject(
    null
  );
  pendingManualCompletionRecords: BehaviorSubject<any> = new BehaviorSubject(
    null
  );
  failedReverslaRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  tableDescription: BehaviorSubject<any> = new BehaviorSubject(null);
  selectedTabTitle: string;
  @ViewChild("tableRef") tableRef: UserTableComponent;
  @Output("search")
  private searchEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.getAllAirtimeReconcilliationRecords();
  }

  onTabChange(event: MatTabChangeEvent): void {
    const selectedIndex = event.index;
    console.log();

    switch (selectedIndex) {
      case 0:
        this.selectedTabTitle = "Personal Accounts";
        this.tableRef.updateTableTitle(this.selectedTabTitle);
        this.tableRef.updateReconDate(this.reconDate);
        this.tableDescription.next("Personal Accounts");
        this.tab1DisplayedColumns = [
          "username",
          "officeId",
          "firstname",
          "lastname",
          "email",
          // "roles",
          "view",
        ];
        break;
      case 1:
        this.selectedTabTitle = "Joint Accounts";
        this.tableRef.updateTableTitle(this.selectedTabTitle);
        this.tableRef.updateReconDate(this.reconDate);
        this.tableDescription.next("Joint Accounts");
        this.tab1DisplayedColumns = [
          "username",
          "officeId",
          "firstname",
          "lastname",
          "email",
          // "roles",
          "view",
        ];
        break;
      case 2:
        this.selectedTabTitle = "Company Accounts";
        this.tableRef.updateTableTitle(this.selectedTabTitle);
        this.tableRef.updateReconDate(this.reconDate);
        this.tableDescription.next("Company Accounts");
        this.tab1DisplayedColumns = [
          "username",
          "officeId",
          "firstname",
          "lastname",
          "email",
          // "roles",
          "view",
        ];
        break;
      case 3:
        this.selectedTabTitle = "Gropup Accounts";
        this.tableRef.updateTableTitle(this.selectedTabTitle);
        this.tableRef.updateReconDate(this.reconDate);
        this.tableDescription.next("Gropuped Account");
        this.tab1DisplayedColumns = [
          "username",
          "officeId",
          "firstname",
          "lastname",
          "email",
          // "roles",
          "view",
        ];
        break;
      default:
        break;
    }
  }

  getAllAirtimeReconcilliationRecords() {
    this.userService
      .fetchAllUserAccounts()
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log("ALL AIRTIME RECORDS ", res);
          this.allPaybillRecords.next(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
