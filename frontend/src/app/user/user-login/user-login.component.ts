import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private userService: UserService,
    private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    //console.log(loginForm.value);
    this.userService.authUser(loginForm.value).subscribe(
      (response: UserForLogin) => {
        console.log(response);
        const user = response;
        localStorage.setItem("userId", user.id.toString());
        localStorage.setItem("mytoken", user.token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("userRole", user.roleId.toString());
        if(user.salonId) localStorage.setItem("empSalon", user.salonId.toString());
        if(user.roleId == 1) {
          this.alertifyService.success("Welcome Amel.");
          this.router.navigate(['/']);
        }
        else if(user.roleId == 2) {
          this.alertifyService.success("You are successfully logged in!");
          this.router.navigate([`/employee/${user.id}`]);
        }

        else if(user.roleId == 3) {
          this.alertifyService.success("You are successfully logged in!");
          this.router.navigate(['/']);
        }
      });
}

}
