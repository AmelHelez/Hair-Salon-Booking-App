import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuardService implements CanActivate {
  user: User;
  userId: number;

  constructor(public userService: UserService, public router: Router) { }


  canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    if(this.userService.isAuthenticated() && this.userService.isEmployee()) {
      this.router.navigate([`/employee/${this.userService.getEmployeeId()}`]);
      return false;
    }
    return true;
  }
}
