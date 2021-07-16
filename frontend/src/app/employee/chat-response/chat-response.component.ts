import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-response',
  templateUrl: './chat-response.component.html',
  styleUrls: ['./chat-response.component.css']
})
export class ChatResponseComponent implements OnInit {
  userId: number;
  user: User;
  employeeId: number;
  employee: User;
  chat: Chat;
  responseChatForm: FormGroup;
  appointmentId: number;
  appointment: Appointment;
  chatId: number;


  constructor(private userService: UserService, private chatService: ChatService,
    private appService: AppointmentService, private route: ActivatedRoute, private alertify: AlertifyService,
    private fb: FormBuilder, private location: Location) { }

  ngOnInit(): void {
    this.employeeId = +this.route.snapshot.params['eid'];
    this.userId = +this.route.snapshot.params['id'];
    this.appointmentId = +this.route.snapshot.params['aid'];
    this.chatId = +this.route.snapshot.params['cid'];
    this.userService.getUser(this.employeeId).subscribe(data => this.employee = data);
    this.userService.getUser(this.userId).subscribe(data => this.user = data);
    this.chatService.getChat(this.chatId).subscribe(data => this.chat = data);
    this.appService.getAppointment(this.appointmentId).subscribe(data => this.appointment = data);
    this.CreateResponseChatForm();
  }

  CreateResponseChatForm() {
    this.responseChatForm = this.fb.group({
      action: [null, Validators.required]
    });
  }

  get action() {
    return this.responseChatForm.get('action') as FormControl;
  }


  updateChat(chatId: number) {
      console.log(this.responseChatForm.value);
      this.chatService.getChat(chatId).subscribe(
        chat => {
          chat.appointmentId = this.appointmentId;
          chat.userId = this.userId;
          chat.message = this.chat.message;
          chat.employeeId = this.employeeId;
          if(this.action.value == "okay") chat.action = true;
          else {
            chat.action = false;
            this.appService.deleteAppointment(this.appointmentId).subscribe(() => {
            this.alertify.warning("The appointment has been deleted.")
            this.location.back();
            })
          }
          this.chatService.updateChat(this.chatId, chat).subscribe(() => {
            this.alertify.success("You responded to your client.");
            this.location.back();
          }
          )
          // console.log("NEW CHAT:", chat);
        }
      )
  }

}
