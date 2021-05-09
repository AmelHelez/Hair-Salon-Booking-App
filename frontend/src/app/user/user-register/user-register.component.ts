import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: User;
  userSubmitted: boolean;

  constructor(private fb: FormBuilder,
    private userService: UserService, private alertifyService: AlertifyService,
    private router: Router) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(12)]],
      age: [null, Validators.required],
      city: [null, [Validators.required, Validators.minLength(2)]]
    }, {validators: this.passwordMatchingValidator});
  }

  passwordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null :
    {notmatched: true};
  }

  get name() {
    return this.registrationForm.get('name') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }

  get age() {
    return this.registrationForm.get('age') as FormControl;
  }

  get city() {
    return this.registrationForm.get('city') as FormControl;
  }

  onSubmit()
  {
     console.log(this.registrationForm);
     this.userSubmitted = true;
     if(this.registrationForm.valid) {
     this.userService.addUser(this.userData()).subscribe(() => {
      this.userSubmitted = false;
      this.registrationForm.reset();
      this.alertifyService.success("You are successfully registered!");
      this.router.navigate(['/login']);
     }, error => {
       console.log(error);
       this.alertifyService.error(error.error);
     });
     }
  }

  userData(): User {
     return this.user = {
       name: this.name.value,
       email: this.email.value,
       password: this.password.value,
       mobile: this.mobile.value,
       age: this.age.value,
       city: this.city.value
     }
  }



}
