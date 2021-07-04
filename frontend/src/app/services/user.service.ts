import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserForLogin } from '../models/user';
import { Appointment } from '../models/appointment';
import { Treatment } from '../models/treatment';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = environment.userApi;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  authUser(user: UserForLogin) {
    return this.http.post(baseUrl + "/login", user);
  }

  isAuthenticated(): boolean {
     const token = localStorage.getItem("mytoken");
     if(token) return true;
     else return false;
  }

  addUser(user: User) {
    return this.http.post(baseUrl + "/register", user);
  }

  isAdmin(): boolean {
    const role = +localStorage.getItem("userRole");
    if(role == 1) return true;
    else return false;
  }

  addEmployee(user: User) {
    return this.http.post(baseUrl + "/registeremp", user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
    }

  getUser(id: number) {
    return this.getAllUsers().pipe(
      map(user => {
        return user.find(u => u.id === id);
      })
    );
  }

  updateUser(id: number, user: User) {
    return this.http.put(baseUrl + '/' + id, user);
  }

  deleteUser(userId: number) {
    return this.http.delete(baseUrl + '/' + userId);
  }

  getAllTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>("https://localhost:44393/api/treatments");
  }

  getTreatment(id: number) {
    return this.getAllTreatments().pipe(
      map(treatment => {
        return treatment.find(t => t.id === id);
      })
    )
  }
}
