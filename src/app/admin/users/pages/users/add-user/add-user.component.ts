import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {
  isLinear = false;
  reconConfig: FormGroup;
  reconFiles: FormGroup;


  constructor() { }

  ngOnInit(): void {
  }

}
