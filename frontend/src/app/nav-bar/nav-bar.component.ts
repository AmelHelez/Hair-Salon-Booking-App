import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedInUser: string;
  users: User[];
  user: User;
  userId: number;
  userRole: number;

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserService, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    //this.user = this.userService.getUser();
    this.userService.getAllUsers()
    .subscribe((data) => {
      this.users = data;
      //console.log(this.users);
    })
    //this.userRole = +localStorage.getItem("userRole");
   // console.log("Role:",this.userRole);
    /*this.user = this.userService.getUser(+this.route.snapshot.params['id']);
   this.route.data.subscribe(
     (data: User) => {
       console.log(data);
       this.user = data;
       console.log(this.user);
  });*/

  this.getUser();
}

  whichRole(): number {
    this.userRole = +localStorage.getItem("userRole");
    if(this.userRole == 1) return 1;
    else if(this.userRole == 2) return 2;
    else return 3;
  }

  getUser() {
    this.userId = +localStorage.getItem("userId");
    this.userService.getUser(this.userId).subscribe(
       data => {
         this.user = data;
         return this.user;
         console.log(this.user);
       }
    )
  }

  loggedIn() {
    this.loggedInUser = localStorage.getItem("username");
    return this.loggedInUser;
  }

 /* isAdmin(): boolean {
    this.userRole = localStorage.getItem("userRole");
    if (this.userRole == '1') return true;
    else return false;
  }*/

  onLogout() {
    localStorage.removeItem("mytoken");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    this.router.navigate(['/']);
    this.alertifyService.success("You are logged out.");
  }


}
