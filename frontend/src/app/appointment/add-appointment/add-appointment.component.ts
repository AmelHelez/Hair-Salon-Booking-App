import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Appointment } from 'src/app/models/appointment';
import { Salon } from 'src/app/models/salon';
import { AppointmentClass } from 'src/app/models/appointmentClass';
import { Treatment } from 'src/app/models/treatment';
import { User } from 'src/app/models/user';
import { SalonService } from 'src/app/salon/salon.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  year: number = new Date().getFullYear();
  month: number = new Date().getMonth();
  day: number = new Date().getDate();
  datum: Date = new Date(this.year, this.month, this.day);
  sati: number = new Date().getHours();
  minute: number = new Date().getMinutes();
  todaysTime: Date = new Date(this.year,this.month,this.day,this.sati,this.minute);
  addAppointmentForm: FormGroup;
  nextClicked: boolean;
  salonId: number;
  salonDetail: Salon;
  employees: User[] = [];
  employee: User;
  empList: User[] = [];
  clientList: User[] = [];
  loggedInUser: string;
  userRole: number;
  appointments: Appointment[] = [];
  treatments: Treatment[] = [];
  appointment = new AppointmentClass();
  appointmentList: Appointment[] = [];
  userId: number;
  user: User;
  allTimes: any[] = [];
  disabled: Time[] = [];
  mytime: Date = new Date();
  isDisabled: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private appointmentService: AppointmentService,
    private route: ActivatedRoute, private userService: UserService, private alertifyService: AlertifyService) { }


  ngOnInit(): void {
    console.log("DATUM", this.sati);
    this.salonId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Salon) => {
        this.salonDetail = data['prp'];
        this.userService.getAllUsers().subscribe(
          xs => {
            this.employees = xs;
            //console.log(this.employees);
            for(var x = 0; x < this.employees.length; x++) {
              if(this.employees[x].salonId === this.salonId) {
              this.employee = this.employees[x];
               this.empList.push(this.employee);
            }
            if(this.employees[x].roleId == 3) this.clientList.push(this.employees[x]);
            }
          }
        )
      }
    )
    this.appointmentService.getAllAppointments().subscribe(
      ap => {
        for(var x = 0; x < ap.length; x++) {
          if(this.mytime == ap[x].appointmentDate) this.isDisabled = true;
          this.disabled.push(ap[x].appointmentTime);
        }
      }
    )
    this.getUser();
    this.CreateAddAppointmentForm();
  }



  CreateAddAppointmentForm() {
    this.addAppointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      treatment: [null, Validators.required],
      employee: [null, Validators.required],
      client: [null]
  })
}

  get appointmentDate() {
    return this.addAppointmentForm.get('date') as FormControl;
   }

   get appointmentTime() {
    return this.addAppointmentForm.get('time') as FormControl;
   }


  get treatment() {
    return this.addAppointmentForm.get('treatment') as FormControl;
  }

  get employeeControl() {
    return this.addAppointmentForm.get('employee') as FormControl;
  }

  get client() {
    return this.addAppointmentForm.get('client') as FormControl;
  }

  onBack() {
    this.router.navigate(['/']);
  }

  whichRole(): number {
    this.userRole = +localStorage.getItem("userRole");
    if(this.userRole == 1) return 1;
    else if(this.userRole == 2) return 2;
    else return 3;
  }


  onSubmit2() {
    console.log(this.addAppointmentForm.value);
    this.mapApp();
    this.appointmentService.addAppointment(this.appointment).subscribe(
      (response: Appointment) => {
        const appointment = response;
        localStorage.setItem('appointment', appointment.appointmentDate.toString());
        this.router.navigate([`/details/${this.salonId}`]);
        this.alertifyService.success("APPOINTMENT ADDED!");
      });
  }

  getUser() {
    this.userId = +localStorage.getItem("userId");
    this.userService.getUser(this.userId)
    .subscribe(user => {
      this.user = user;
      console.log("USER:", this.user);
    })
    this.getTreatments();
  }

  getTreatments() {
    this.userService.getAllTreatments().subscribe(
      data => {
        this.treatments = data;
        console.log("TREATMENTS: ", this.treatments);
        return this.treatments;
      }
    )
  }


  mapApp(): void {
   if(this.appointmentDate.value >= this.datum) this.appointment.appointmentDate = this.appointmentDate.value;
   if(this.appointmentTime.value >= this.todaysTime) this.appointment.appointmentTime = this.appointmentTime.value;
   this.appointment.treatmentId = this.treatment.value;
   this.appointment.salonId = this.salonId;
   if(this.user.roleId == 3) this.appointment.userId = this.userId;
   else this.appointment.userId = this.client.value;
   this.appointment.employeeId = this.employeeControl.value;
  }
}
