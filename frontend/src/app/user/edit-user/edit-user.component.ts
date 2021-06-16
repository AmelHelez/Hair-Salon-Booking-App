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
  userForm: User;
  ime: string;
  mail: string;
  juzernejm: string;
  ejd: number;
  siti: string;
  mobitel: string;
  salonID: number;
  salonClass: Salon;



  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private alertify: AlertifyService, private userService: UserService,
    private router: Router, private salonService: SalonService) { }

  ngOnInit(): void {
    this.loggedInAdmin = +localStorage.getItem("userRole");
    // console.log(this.loggedInAdmin);
    this.userId = +this.route.snapshot.params['id'];
    //console.log(this.userId);
    this.userService.getUser(this.userId).subscribe(
      data => {
        this.user = data;
        this.ime = this.user.name;
        this.mail = this.user.email;
        this.juzernejm = this.user.username;
        this.siti = this.user.city;
        if(this.user.roleId == 2)
        {
          this.salonID = this.user.salonId;
        this.salonService.getSalon(this.salonID).subscribe(
          s => {
            this.salonClass = s;
            console.log("SALON:", this.salonClass);
          }
        )}
      }
    )
    // this.salonService.getAllSalons().subscribe(
    //   x => {
    //     this.salonList = x;
    //   }
    // )

     this.UpdateUserForm();
  }

  // getSalon() {
  //   if(this.salonID) {
  //     this.salonService.getSalon(this.salonID).subscribe(
  //       s => {
  //         this.salonClass = s;
  //       }
  //     )
  //     return this.salonClass;
  //   }
  // }

  UpdateUserForm() {
    this.updateUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, Validators.maxLength(12)],
      age: [null],
      city: ['', [Validators.required, Validators.minLength(2)]],
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
       if(!this.name.value) user.name = this.ime;
       else user.name = this.name.value;
       if(!this.email.value) user.email = this.mail;
       else user.email = this.email.value;
       if(!this.username.value) user.username = this.juzernejm;
       else user.username = this.username.value;
       user.password = this.password.value;
       if(!this.city.value) user.city = this.siti;
       else user.city = this.city.value;
       user.age = this.age.value;
       user.mobile = this.mobile.value;
       if(this.user.roleId == 2 && !this.salonClass) user.salonId = this.salon.value;
       else if(this.user.roleId == 2 && this.salonClass) user.salonId = this.salonClass.id;
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
