import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { Salon } from 'src/app/models/salon';
import { AppointmentClass } from 'src/app/models/appointmentClass';
import { Treatment } from 'src/app/models/treatment';
import { User } from 'src/app/models/user';
import { SalonService } from 'src/app/salon/salon.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import { SalonTreatments } from 'src/app/models/salonTreatments';
import { SalonTreatmentService } from 'src/app/services/salon-treatment.service';
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
  theTime = new Date().getHours() + ':' + new Date().getMinutes();
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
  treatments: SalonTreatments[] = [];
  tretman: SalonTreatments;
  appointment = new AppointmentClass();
  appointmentList: Appointment[] = [];
  userId: number;
  user: User;
  allTimes: any[] = [];
  minDate = new Date();
  minDejt = new Date().setDate(this.minDate.getDate() + 1);
  maxDate = new Date().setDate(this.minDate.getDate() + 7);
  maxDatee = new Date(this.maxDate);
  mytime: Date = new Date();
  isDisabled: boolean = false;
  newDate: Date;
  timeMin: string;
  timeMax: string;
  minn: Date;
  salonAppointments: Appointment[] = [];
  appointmentss: Appointment[] = [];
  dejt: Date;
  dejts: Date[] = [];
  korisnik: User;
  appDate: number;
appMonth: number;
todaysDate: number = +new Date().getDate().toString();
  todaysMonth: number = +new Date().getMonth().toString();
  appsDate: Date;

  constructor(private fb: FormBuilder, private router: Router, private appointmentService: AppointmentService,
    private route: ActivatedRoute, private userService: UserService, private alertifyService: AlertifyService,
    private treatmentService: SalonTreatmentService) { }


  ngOnInit(): void {
    if(this.sati > 19) this.minDate = new Date(this.minDejt);
    // console.log("TAJM:", this.datum);
    this.salonId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Salon) => {
        this.salonDetail = data['prp'];
        this.salonDetail.appointments.forEach(x => {
          this.userService.getUser(x.employeeId).subscribe(
            employee => x.employee = employee
          );
        })
       this.salonDetail.appointments.forEach(x => {
        this.appDate = +new Date(x.appointmentDate).getDate().toString();
        this.appMonth = +new Date(x.appointmentDate).getMonth().toString();
        if(this.appDate >= this.todaysDate && this.appMonth >= this.todaysMonth) this.salonAppointments.push(x);
       })
       this.salonAppointments.sort((a,b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
        console.log("SALON APPOINTMENTS:", this.salonAppointments);
        this.timeMin = `0${this.salonDetail.opened}:00`;
        this.timeMax = `${this.salonDetail.closed}:00`;

        // console.log(this.timeMin);
        // console.log(this.timeMax);
        this.userService.getAllUsers().subscribe(
          xs => {
            this.employees = xs;
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

    this.getUser();
    this.CreateAddAppointmentForm();
    this.appointmentss.sort((a,b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())

    // if(this.appointmentDate.value != null) this.getAppointments(this.appointmentDate);

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

  getAppointments() {
    var test = this.addAppointmentForm.get('date') as FormControl;
    var date = new Date(test.value);
    //  this.ArrayB = this.ArrayA.filter(item => item.id == filteredUserID))
    // var date = new Date(appointmentDate.value);
    // this.salonAppointments.forEach(x => {
    //   if(x.appointmentDate == date) this.appointmentss.push(x);
    // })
    // return this.appointmentss;
    this.appointmentss = this.salonAppointments.filter(x => x.appointmentDate == date);
    return this.appointments;
    // console.log(this.appointmentss);
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


  onSubmit() {
    console.log(this.appointmentTime.value);
    this.mapApp();
    this.appointmentService.addAppointment(this.appointment).subscribe(
      (response: Appointment) => {
        const appointment = response;
        this.router.navigate([`/details/${this.salonId}`]);
        this.alertifyService.success("Appointment booked!");
      }, error => {
        this.alertifyService.error("Appointment booking failed. Please try again.");
      });
  }

  getUser() {
    this.userId = +localStorage.getItem("userId");
    this.userService.getUser(this.userId)
    .subscribe(user => {
      this.user = user;
    })
    this.getTreatments();
  }

  getTreatments() {
    this.treatmentService.getAllSalonTreatments().subscribe(
      treatment => {
        for(var x = 0; x < treatment.length; x++) {
          if(treatment[x].salonId == this.salonId) this.treatments.push(treatment[x]);
        }
      }
    )
  }

  findTreatmentPrice() {
    this.treatments.forEach(tr => {
      if(tr.treatmentId == +this.treatment.value) this.appointment.price = tr.price;
    })
  }


  mapApp(): void {
   if(this.appointmentDate.value >= this.datum) this.appointment.appointmentDate = this.appointmentDate.value;
   this.appointment.appointmentTime = this.appointmentTime.value;
   this.appointment.treatmentId = +this.treatment.value;
   this.findTreatmentPrice();
   this.appointment.salonId = this.salonId;
   if(this.user.roleId == 3) this.appointment.userId = this.userId;
   else this.appointment.userId = this.client.value;
   this.appointment.employeeId = +this.employeeControl.value;
  }


}
