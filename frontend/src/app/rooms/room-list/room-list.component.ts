import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { DatePipe } from '@angular/common';

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
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  username = '';
  displayedColumns: string[] = ['roomname'];
  rooms = [];
  isLoadingResults = true;
  stotka: number = 100;

  constructor(private route: ActivatedRoute, private router: Router, public datepipe: DatePipe) {
    this.username = localStorage.getItem('username');
    firebase.database().ref('rooms/').on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.isLoadingResults = false;
    });
  }

  ngOnInit(): void {
  }

  enterChatRoom(roomname: string) {
    const chat = { roomname: '', username: '', message: '', date: '', type: '' };
    chat.roomname = roomname;
    chat.username = this.username;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.message = `${this.username} enter the room`;
    chat.type = 'join';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);

    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.username === this.username);
      if (user !== undefined) {
        const userRef = firebase.database().ref('roomusers/' + user.key);
        userRef.update({status: 'online'});
      } else {
        const newroomuser = { roomname: '', username: '', status: '' };
        newroomuser.roomname = roomname;
        newroomuser.username = this.username;
        newroomuser.status = 'online';
        const newRoomUser = firebase.database().ref('roomusers/').push();
        newRoomUser.set(newroomuser);
      }
    });

    this.router.navigate(['/chatroom', roomname]);
  }

  logout(): void {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
