import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);
    this.authService.authUser(loginForm.value).subscribe(
      (response: UserForLogin) => {
        console.log(response);
        const user = response;
        localStorage.setItem("mytoken", user.token);
        localStorage.setItem("myname", user.name);
        localStorage.setItem("userRole", user.roleId.toString());
        if(user.roleId == 1) {
          this.alertifyService.success("ADMINE!");
        }
        else if(user.roleId == 2) this.alertifyService.success("EMPLOYEE!");
        else if(user.roleId == 3) this.alertifyService.success("KLIJENTU!");


        this.router.navigate(['/']);
      }
    );
    /*if(token) {
      localStorage.setItem("mytoken", token.name);
      this.alertifyService.success("Login successful!");
      this.router.navigate(['/']);
    } else {
      this.alertifyService.error("Login unsuccessful..");
    }*/
  }

}
