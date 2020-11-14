import { Component, OnInit } from '@angular/core';


import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';



@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  userForm: FormGroup;
  id:string='';
  fName: string ='';
  lName: string='';
  username:string='';
  password:string='';
  email: string='';
  phone: string='';
  
  
   isLoadingResults = false;
  

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getuser(this.route.snapshot.params['id']);
    this.userForm = this.formBuilder.group({
      'fName' : [null, Validators.required],
      'lName' : [null, Validators.required],
      'username' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
      'phone' : [null, Validators.required]     
    });
  }

  getuser(id) {
    
    

    this.api.getuser(id).subscribe(data => {
      this.id  =  data.id;
      
      console.log(data.username);


      this.userForm.setValue({

        

        fName: data.fName,
        lName: data.lName,
        username:data.username,
        password:data.password,
        email: data.email,
        phone: data.phone,

       
      });
      
    });
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;

   // console.log(form);
   console.log(this.id);
    this.api.updateuser(this.id, form)
      .subscribe(res => {
          //let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/user-details', this.id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  userDetails() {
    this.router.navigate(['/user-details', this.id]);
  }

}
