import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/models/user';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-notification',
  templateUrl: './employee-notification.component.html',
  styleUrls: ['./employee-notification.component.css']
})
export class EmployeeNotificationComponent implements OnInit {
  userId: number;
  user: User;
  employeeId: number;
  employee: User;
  chat: Chat;
  chats: Chat[] = [];
  userRole: number;

  constructor(private userService: UserService, private chatService: ChatService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.userId = +this.route.snapshot.params['id'];
    this.userRole = +localStorage.getItem("userRole");
    this.userService.getUser(this.userId).subscribe(data => {
      if(this.userRole == 2) {
        this.user = data;
        this.user.chatsEmployee = data.chatsEmployee;
        this.chats = data.chatsEmployee;
        console.log(this.chats);
      } else if(this.userRole == 3) {
        this.user = data;
        this.user.chats = data.chats;
        this.chats = data.chats;
        console.log(this.chats);
      }
    });
  }

  whichRole(): number {
    this.userRole = +localStorage.getItem("userRole");
    if(this.userRole == 1) return 1;
    else if(this.userRole == 2) return 2;
    else return 3;
  }
}
