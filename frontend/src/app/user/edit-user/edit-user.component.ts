import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Salon } from 'src/app/models/salon';
import { EditUser, User } from 'src/app/models/user';
import { SalonService } from 'src/app/salon/salon.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: number;
  user: User;
  updateUserForm: FormGroup;
  nextClicked: boolean;
  userUpdate = null;
  salonList: Salon[] = [];
  loggedInAdmin: number;



  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private alertify: AlertifyService, private userService: UserService,
    private router: Router, private salonService: SalonService) { }

  ngOnInit(): void {
    this.loggedInAdmin = +localStorage.getItem("userRole");
    console.log(this.loggedInAdmin);
    this.userId = +this.route.snapshot.params['id'];
    //console.log(this.userId);
    this.userService.getUser(this.userId).subscribe(
      data => {
        this.user = data;
        console.log("USER:", this.user);
      }
    )
    this.salonService.getAllSalons().subscribe(
      x => {
        this.salonList = x;
      }
    )
    // this.route.data.subscribe(
    //   (data: User) => {
    //     console.log("USER:",data);
    //     this.user = data['prp'];
    //   }
    // )
    this.UpdateUserForm();
  }

  UpdateUserForm() {
    this.updateUserForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(12)]],
      age: [null, Validators.required],
      city: [null, [Validators.required, Validators.minLength(2)]],
      salon: [null]
    }, {validators: this.passwordMatchingValidator})
  }

  passwordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null :
    {notmatched: true};
  }

  get name() {
    return this.updateUserForm.get('name') as FormControl;
  }

  get email() {
    return this.updateUserForm.get('email') as FormControl;
  }

  get username() {
    return this.updateUserForm.get('username') as FormControl;
  }

  get password() {
    return this.updateUserForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.updateUserForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.updateUserForm.get('mobile') as FormControl;
  }

  get age() {
    return this.updateUserForm.get('age') as FormControl;
  }

  get city() {
    return this.updateUserForm.get('city') as FormControl;
  }

  get salon() {
    return this.updateUserForm.get('salon') as FormControl;
  }

 updateUser(userId: number) {
   this.userService.getUser(userId).subscribe(
     user => {
       user.name = this.name.value;
       user.email = this.email.value;
       user.username = this.username.value;
       user.password = this.password.value;
       user.city = this.city.value;
       user.age = this.age.value;
       user.mobile = this.mobile.value;
       if(this.user.roleId == 2) user.salonId = this.salon.value;
       //user.roleId = this.user.roleId;
       this.userService.updateUser(this.userId, user).subscribe(
         () => {
           this.alertify.success("USER UPDATED!");
           if(this.loggedInAdmin == 1) this.router.navigate(['/admin/users']);
           else this.router.navigate(['/']);
         })
     });
 }

}
