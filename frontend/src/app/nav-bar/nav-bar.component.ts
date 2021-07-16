import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Chat } from '../models/chat';
import { User } from '../models/user';
import { AlertifyService } from '../services/alertify.service';
import { ChatService } from '../services/chat.service';
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
  chats: Chat[] = [];

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserService, private alertifyService: AlertifyService,
    private chatService: ChatService) { }

  ngOnInit(): void {
    this.userService.getAllUsers()
    .subscribe((data) => {
      this.users = data;
    })

  this.getUser();
  this.getChats();
}

  whichRole(): number {
    this.userRole = +localStorage.getItem("userRole");
    if(this.userRole == 1) return 1;
    else if(this.userRole == 2) return 2;
    else return 3;
  }

  getEmployeeId() {
    this.userService.getEmployeeId();
  }

  getChats() {
    this.chatService.getAllChats().pipe(
      map(chat => chat.find(c => c.employeeId === this.userId))
    ).subscribe(chat => this.chats.push(chat));
 }

  getUserId() {
    this.userId = +localStorage.getItem("userId");
    return this.userId;
  }

  getUser() {
    this.userId = +localStorage.getItem("userId");
    this.userService.getUser(this.userId).subscribe(
       data => {
         this.user = data;
         return this.user;
       }
    )
  }

  loggedIn() {
    this.loggedInUser = localStorage.getItem("username");
    return this.loggedInUser;
  }


  onLogout() {
    localStorage.removeItem("mytoken");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    this.alertifyService.success("You are logged out.");
    this.router.navigate(['/']);
    // window.location.reload();
  }


}
