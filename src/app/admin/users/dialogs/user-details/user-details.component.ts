import { Component, Inject, OnInit } from '@angular/core';
import { UserTableComponent } from '../../pages/users/user-table/user-table.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent implements OnInit {
  userDetails: any;
  occurrences: any[] = [];
  meetingIsRecurring: boolean = false;

  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
  ) {
    this.userDetails = data.data;

    console.log("Memo Details ", this.userDetails)
   }

  ngOnInit(): void {
  }

}
