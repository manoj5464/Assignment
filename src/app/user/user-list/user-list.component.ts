import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList:any;
  constructor(private route:Router,private router:ActivatedRoute,private userService:UserService) {

  }

  ngOnInit() {
    this.userService.getUserList().subscribe((userData)=>{
      console.log("userData",userData);
      if(userData && userData['length']> 0 ) {
        this.userList = userData;
      }
    });
  }
  
  navigateToUserInfo(userId) {
      this.route.navigate(['/user', userId]);;
  }

}
