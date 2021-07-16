import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { ChatClass } from 'src/app/models/chatClass';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
  userId: number;
  user: User;
  employeeId: number;
  employee: User;
  appointment: Appointment;
  addChatForm: FormGroup;
  chat = new ChatClass();
  appointmentId: number;

  constructor(private chatService: ChatService, private alertify: AlertifyService,
    private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder,
    private location: Location, private appService: AppointmentService) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id'];
    this.employeeId = +this.route.snapshot.params['eid'];
    this.appointmentId = +this.route.snapshot.params['aid'];
    this.userService.getUser(this.userId).subscribe(data => this.user = data);
    this.userService.getUser(this.employeeId).subscribe(data => this.employee = data);
    this.appService.getAppointment(this.appointmentId).subscribe(a => this.appointment = a);
    this.CreateAddChatForm();
  }

  CreateAddChatForm() {
    this.addChatForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get message() {
    return this.addChatForm.get('message') as FormControl;
  }

  onSubmit() {
    console.log(this.addChatForm.value);
    this.mapChat();
    console.log(this.chat);
    this.chatService.addChat(this.chat).subscribe(() => this.isSuccessful());
  }

  isSuccessful() {
    this.alertify.success(`The message to ${this.employee.username} is sent.`);
    this.location.back();
  }

  mapChat(): void {
    this.chat.userId = this.user.id;
    this.chat.employeeId = this.employee.id;
    this.chat.appointmentId = this.appointment.id;
    this.chat.message = this.message.value;
  }

}
