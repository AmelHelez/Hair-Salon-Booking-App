import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  addEmployee(user: User) {
    return this.http.post(this.baseUrl + "/users/registeremp", user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://localhost:44393/api/users");
    /*.pipe(
      map(data => {
        const usersArray: Array<User> = [];
        const localProperties = JSON.parse(localStorage.getItem('newUser'));;

        if (localProperties) {
          for (const id in localProperties) {
              if(localProperties.hasOwnProperty(id)) {
                usersArray.push(localProperties[id]);
              }
            else {
              usersArray.push(localProperties[id]);
            }
          }
        }

        for (const id in data) {
            if(data.hasOwnProperty(id)) {
              usersArray.push(data[id]);
            }
          else {
            usersArray.push(data[id]);
          }
        }
        return usersArray;
      })
    );*/
    }

  getUser(id: number) {
    return this.getAllUsers().pipe(
      map(user => {
        return user.find(u => u.id === id);
      })
    );
  }
}
