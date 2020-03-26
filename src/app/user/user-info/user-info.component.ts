import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private route:Router,private router:ActivatedRoute,private userService:UserService) { }
  userData = [];
  userId:any;
  
  ngOnInit() {
	this.getUserData();
  }

  getUserData() {
	this.router.params.subscribe((param)=>{
		console.log("id",param.id);
		this.userId = param.id;
		this.userService.getUserInfo(this.userId).subscribe((response)=>{
		  console.log("response",response);
		  if(response instanceof Array) {
			  this.userData = response;
		  }
		})
	  })
  }
}
