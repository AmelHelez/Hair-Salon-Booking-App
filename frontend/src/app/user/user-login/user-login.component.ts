import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroupDirective, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  username = '';
  ref = firebase.database().ref('users/');
  matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService,
    private alertifyService: AlertifyService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // if (localStorage.getItem('username')) {
    //   this.router.navigate(['/roomlist']);
    // }
    // this.loginForm = this.formBuilder.group({
    //   'username' : [null, Validators.required]
    // });
  }

  onLogin(loginForm: NgForm) {
    //console.log(loginForm.value);
    this.userService.authUser(loginForm.value).subscribe(
      (response: UserForLogin) => {
        // console.log(response);
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
      const login = loginForm.value;
    this.ref.orderByChild('username').equalTo(login.username).once('value', snapshot => {
      if (snapshot.exists()) {
        // localStorage.setItem('username', login.username);
        // this.router.navigate(['/roomlist']);
      } else {
        const newUser = firebase.database().ref('users/').push();
        newUser.set(login);
        // localStorage.setItem('username', login.username);
        // this.router.navigate(['/roomlist']);
      }
    });
}

}
