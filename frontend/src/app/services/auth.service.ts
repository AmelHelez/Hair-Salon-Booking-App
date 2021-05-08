import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: any) {
    let UserArray = [];
    if (localStorage.getItem("Useri")) {
      UserArray = JSON.parse(localStorage.getItem("Useri"));
    }
    return UserArray.find(p => p.name === user.name && p.password === user.password);
  }
}
