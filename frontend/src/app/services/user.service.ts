import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.userApi;

  addUser(user: User) {
    return this.http.post(this.baseUrl + "/users/register", user);
  /*  let users = [];
    if (localStorage.getItem('Useri')) {
      users = JSON.parse(localStorage.getItem('Useri'));
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Useri', JSON.stringify(users));*/
  }
}
