import { NgxMatDatetimePicker } from '@angular-material-components/datetime-picker';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Appointment } from 'src/app/models/appointment';
import { Salon } from 'src/app/models/salon';
import { SalonClass } from 'src/app/models/salonClass';
import { Treatment } from 'src/app/models/treatment';
import { User } from 'src/app/models/user';
import { SalonService } from 'src/app/salon/salon.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  mytime: Date = new Date();
  addAppointmentForm: FormGroup;
  nextClicked: boolean;
  appointment: Appointment;
  salonId: number;
  salonDetail: Salon;
  employees: User[] = [];
  employee: User;
  empList: User[] = [];
  loggedInUser: string;
  userRole: number;
  appointments: Appointment[] = [];
  treatments: Treatment[] = [];
 // appointment: Appointment;
  appointmentList: Appointment[] = [];
  userId: number;
  user: User;

  constructor(private fb: FormBuilder, private router: Router, private appointmentService: AppointmentService,
    private route: ActivatedRoute, private userService: UserService,
    private salonService: SalonService, private alertifyService: AlertifyService) { }


  ngOnInit(): void {
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
              //  console.log("Employee:",this.employee);
               this.empList.push(this.employee);
            }
            }
          }
        )
      }
    )
    this.getUser();
    this.CreateAddAppointmentForm();
  }

  // openPicker(picker : NgxMatDatetimePicker<Date>){
  //   picker.open();
  // }


  CreateAddAppointmentForm() {
    this.addAppointmentForm = this.fb.group({
      // appointmentDate: [null, Validators.required],
      // appointmentTime: [null, Validators.required],
      appointmentDate: [null, Validators.required],
      treatment: [null, Validators.required],
      employee: [null, Validators.required]
  })
}
get appointmentDate() {
    return this.addAppointmentForm.get('appointmentDate') as FormControl;
   }

  // get appointmentDate() {
  //   return this.addAppointmentForm.get('appointmentDate') as FormControl;
  // }

  // get appointmentTime() {
  //   return this.addAppointmentForm.get('appointmentTime') as FormControl;
  // }

  get treatment() {
    return this.addAppointmentForm.get('treatment') as FormControl;
  }

  get employeeControl() {
    return this.addAppointmentForm.get('employee') as FormControl;
  }

  onBack() {
    this.router.navigate(['/']);
  }



  onSubmit2() {
    console.log(this.addAppointmentForm.value);
    this.mapApp();
   // this.salon.image = this.image.value;
    this.appointmentService.addAppointment(this.appointment).subscribe(
      (response: Appointment) => {
        console.log("Da vidimo: ");
        console.log(response);
        const appointment = response;
       // localStorage.setItem('appointmentDate', appointment.appointmentDate.toString());
        //localStorage.setItem('appointmentTime', appointment.appointmentTime.toString());
        localStorage.setItem('appointment', appointment.appointmentDate.toString());
        this.router.navigate([`/salon-details/${this.salonId}`]);
        this.alertifyService.success("APPOINTMENT ADDED!");
      }
        //  error => {
      //   console.log(error);
      // }
      );

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

  // openPicker(picker : NgxMatDatetimePicker<Date>){
  //   picker.open();

  // }


  mapApp(): void {
   //this.appointment.appointmentDate = this.appointmentDate.value;
   //this.appointment.appointmentTime = this.appointmentTime.value;
   this.appointment.appointmentDate = this.appointmentDate.value;
   this.appointment.treatmentId = this.treatment.value;
   this.appointment.salonId = this.salonId;
   this.appointment.userId = this.userId;
   this.appointment.employeeId = this.employeeControl.value;
   //this.appointment.treatmentId = this.treatment.id;
    //this.image.patchValue(btoa(this.croppedImage));
  }

}
