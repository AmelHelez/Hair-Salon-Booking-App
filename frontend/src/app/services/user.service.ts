import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user: User) {
    let users = [];
    if (localStorage.getItem('Useri')) {
      users = JSON.parse(localStorage.getItem('Useri'));
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Useri', JSON.stringify(users));
  }
}
