import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;
  chatForm: FormGroup;
  username = '';
  roomname = '';
  message = '';
  users = [];
  chats = [];
  matcher = new MyErrorStateMatcher();


  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe) {
      this.username = localStorage.getItem('username');
      this.roomname = this.route.snapshot.params.roomname;
      firebase.database().ref('chats/').on('value', resp => {
        this.chats = [];
        this.chats = snapshotToArray(resp);
        setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
      });
      firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2: any) => {
        const roomusers = snapshotToArray(resp2);
        this.users = roomusers.filter(x => x.status === 'online');
      });
    }

ngOnInit(): void {
this.chatForm = this.formBuilder.group({
'message' : [null, Validators.required]
});
}

onFormSubmit(form: any) {
const chat = form;
chat.roomname = this.roomname;
chat.username = this.username;
chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
chat.type = 'message';
const newMessage = firebase.database().ref('chats/').push();
newMessage.set(chat);
this.chatForm = this.formBuilder.group({
'message' : [null, Validators.required]
});
}

exitChat() {
const chat = { roomname: '', username: '', message: '', date: '', type: '' };
chat.roomname = this.roomname;
chat.username = this.username;
chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
chat.message = `${this.username} leave the room`;
chat.type = 'exit';
const newMessage = firebase.database().ref('chats/').push();
newMessage.set(chat);

firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp: any) => {
let roomuser = [];
roomuser = snapshotToArray(resp);
const user = roomuser.find(x => x.username === this.username);
if (user !== undefined) {
const userRef = firebase.database().ref('roomusers/' + user.key);
userRef.update({status: 'offline'});
}
});

this.router.navigate(['/roomlist']);
}
}
