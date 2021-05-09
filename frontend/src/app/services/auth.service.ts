import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserForLogin } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.userApi;

  constructor(private http: HttpClient) { }

  authUser(user: UserForLogin) {

    return this.http.post(this.baseUrl + "/users/login", user);
   /* let UserArray = [];
    if (localStorage.getItem("Useri")) {
      UserArray = JSON.parse(localStorage.getItem("Useri"));
    }
    return UserArray.find(p => p.name === user.name && p.password === user.password);*/
  }
}
