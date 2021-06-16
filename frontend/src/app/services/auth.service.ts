import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserForLogin } from '../models/user';

const baseUrl = environment.userApi;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authUser(user: UserForLogin) {
    return this.http.post(baseUrl + "/login", user);
  }
}
