import { Component, OnInit } from '@angular/core';


import { ApiService } from '../api.service';
import { user } from '../user';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

 
  displayedColumns: string[] = ['FName', 'LName','Email','Username','phone'];
  data: user[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getusers()
      .subscribe(res => {
        this.data = res;
        console.log("hefny",this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
      console.log("constructor");
  }

}
