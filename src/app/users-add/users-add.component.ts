import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  userForm: FormGroup;
  
  fName: string ='';
  lName: string='';
  username:string='';
  password:string='';
  email: string='';
  phone: string='';

  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      'fName' : [null, Validators.required],
      'lName' : [null, Validators.required],
      'username' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
      'phone' : [null, Validators.required]  
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.adduser(form)
      .subscribe(res => {
        //let id = res['id'];
        this.isLoadingResults = false;
        //console.log(id);
        this.router.navigate(['/users']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
