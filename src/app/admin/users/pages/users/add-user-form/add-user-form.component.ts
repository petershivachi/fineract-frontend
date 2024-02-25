import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.sass']
})
export class AddUserFormComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  isPersonal: boolean = true;

  accountTypes: string[] = ["Personal Account", "Joint Account", "Company Account", "Group Account"]

  constructor(private fb: FormBuilder) {
    this.docForm = this.fb.group({
      first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      last: [""],
      gender: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      password: ["", [Validators.required]],
      conformPassword: ["", [Validators.required]],
      designation: [""],
      department: [""],
      address: [""],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ["", [Validators.required]],
      education: [""],
      uploadImg: [""],
    });
   }

  ngOnInit(): void {
  }

}
