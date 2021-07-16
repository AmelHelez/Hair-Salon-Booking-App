import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Salon } from 'src/app/models/salon';
import { SalonClass } from 'src/app/models/salonClass';
import { User } from 'src/app/models/user';
import { SalonService } from 'src/app/salon/salon.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  registrationForm: FormGroup;
  user: User;
  user2: User;
  userSubmitted: boolean;
  salonList: any[];
  salonId: number;
  salonClass: Salon;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private userService: UserService, private alertifyService: AlertifyService,
    private router: Router, private salonService: SalonService) { }

  ngOnInit(): void {
    this.createRegistrationForm();
    this.getSalons();
  }

  getSalons() {
    this.salonId = +this.route.snapshot.params['id'];
   this.route.data.subscribe(
     (data: Salon) => {
      //  console.log(data);
       this.salonClass = data['prp'];
      // console.log("SALON CLASS:", this.salonClass);
     }
   )
    this.salonService.getAllSalons().subscribe(
      data => {
        this.salonList = data;
        // console.log(data);
      }
    );
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(12)]],
      age: [null, Validators.required],
      city: [null, [Validators.required, Validators.minLength(2)]],
      salon: [null]
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

  get username() {
    return this.registrationForm.get('username') as FormControl;
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

  get salon() {
    return this.registrationForm.get('salon') as FormControl;
  }



  onSubmit()
  {
     console.log(this.registrationForm);
     this.userSubmitted = true;
     if(this.registrationForm.valid) {
     this.userService.addEmployee(this.userData()).subscribe(() => {
      this.userSubmitted = false;
      this.registrationForm.reset();
      this.router.navigate[(`/details/${this.salonId}`)];
      this.alertifyService.success("Amel, you have successfully added a new employee.");
     });
     }
  }

  userData(): User {
    if(!this.salonClass) {
     return this.user = {
       id: null,
       name: this.name.value,
       email: this.email.value,
       username: this.username.value,
       password: this.password.value,
       mobile: this.mobile.value,
       age: this.age.value,
       city: this.city.value,
       roleId: null,
       salonId: this.salon.value
     }
    }
    else {
      return this.user = {
        id: null,
        name: this.name.value,
        email: this.email.value,
        username: this.username.value,
        password: this.password.value,
        mobile: this.mobile.value,
        age: this.age.value,
        city: this.city.value,
        roleId: null,
        salonId: this.salonClass.id
      }
    }
  }
}
