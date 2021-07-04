import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }


  canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    if(this.userService.isAuthenticated() && !this.userService.isAdmin()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}



