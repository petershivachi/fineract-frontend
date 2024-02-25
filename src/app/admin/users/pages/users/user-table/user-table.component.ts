import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.sass']
})
export class UserTableComponent implements OnInit {
  @Input() data: BehaviorSubject<any>;
  datasource: MatTableDataSource<any>;
  @Input() title: string;

  @Output("search") searchData : EventEmitter<any> = new EventEmitter<any>();
  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Output() update: EventEmitter<number[]> = new EventEmitter<number[]>();
  tableDescription: BehaviorSubject<any> = new BehaviorSubject(null);
  reconCilliationDate: BehaviorSubject<any> = new BehaviorSubject(null);
  @Input() displayedColumns: string[] = [
    "username",
    "officeId",
    "firstname",
    "lastname",
    "email",
    // "roles",
    "view",
  ];

  selection = new SelectionModel<any>(true, []);
  allRecordsExist: boolean = false;

  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 50, 75, 2000];
  tab1DisplayedColumns: string[] = [];
  loading: boolean;
  date: string;
  showGenerateExcelButton: boolean = false;

  constructor(
    private dialog: MatDialog,
    private cdref: ChangeDetectorRef,
    private snackbar: SnackbarService
  ) {
    this.displayedColumns = [
      "username",
      "officeId",
      "firstname",
      "lastname",
      "email",
      // "roles",
      "view",
    ];
  }

  ngOnInit(): void {
    this.showGenerateExcelButton = true;
    console.log("TABLE TITLE ", this.title);

    this.displayedColumns = [
      "username",
      "officeId",
      "firstname",
      "lastname",
      "email",
      // "roles",
      "view",
    ];

    this.title = "Personal Accounts";

    this.data.subscribe((dt) => {
      this.totalRows = dt.totalItems;

      this.datasource = new MatTableDataSource<any>([]);

      if (dt.data.length > 0) {
        this.allRecordsExist = true;
        this.datasource = new MatTableDataSource<any>(dt.data);
      } else {
        this.allRecordsExist = false;
      }
    });
  }

  refresh() {
    this.update.emit([this.currentPage, this.pageSize]);
  }

  updateTableTitle(newTitle: string): void {
    this.title = newTitle;

    console.log("TITLE TITLE ", this.title);

    if (this.title != "All Records") {
      this.showGenerateExcelButton = false;
    }
  }

  updateReconDate(newDate: string): void {
    this.date = newDate;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  search(event){
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("Filter Value ", filterValue)
    if (this.datasource.filteredData.length == 0){
      this.searchData.emit({
        searchValue: filterValue,
        page: [0, 10]
      })
    }
  }



  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.datasource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.datasource.data.forEach((row) => this.selection.select(row));
  }

  pageChanged(event: any) {
    console.log("Page changed");
    if (event) {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
    }

    this.update.emit([this.currentPage, this.pageSize]);
  }

  ngOnDestroy() {
    this.data.unsubscribe();
  }

}
