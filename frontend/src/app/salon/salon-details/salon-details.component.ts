import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Salon } from 'src/app/models/salon';
import { SalonService } from '../salon.service';
import { AppointmentService } from '../../services/appointment.service';
//import { SalonClass } from '../../models/salonClass';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { Appointment } from 'src/app/models/appointment';
import { Treatment } from 'src/app/models/treatment';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-salon-details',
  templateUrl: './salon-details.component.html',
  styleUrls: ['./salon-details.component.css']
})
export class SalonDetailsComponent implements OnInit {
  salonDetail: Salon;
  public salonId: number;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  employees: User[];
  employee: User;
  empList: User[] = [];
  loggedInUser: string;
  userRole: number;
  appointments: Appointment[] = [];
  treatments: Treatment[] = [];
  appointment: Appointment;
  appointmentList: Appointment[] = [];
  user: User;
  treatment: Treatment;
  userToDelete: User;
  employeeApp: User;
  todaysDate: number = +new Date().getDate().toString();
  todaysMonth: number = +new Date().getMonth().toString();
  appDate: number;
  appMonth: number;


  constructor(private salonService: SalonService, private appointmentService: AppointmentService,
    private route: ActivatedRoute, private router: Router, private userService: UserService,
    private alertifyService: AlertifyService) { }

  ngOnInit(): void {
   this.salonId = +this.route.snapshot.params['id'];
   this.route.data.subscribe(
     (data: Salon) => {
      //  console.log("MONTH", this.todaysMonth);
       this.salonDetail = data['prp'];
       if(this.salonDetail.image) {
        this.salonDetail.image = atob(this.salonDetail.image); }
       /* this.userService.getAllUsers().pipe(
          map(employee => {
            this.employee = employee.find(e => e.salonId === this.salonDetail.id);
            if(this.employee.salonId)
            this.salonDetail.employees.push(this.employee);
          })
        )
        console.log("Employees:", this.salonDetail.employees);*/
        this.userService.getAllUsers().subscribe(
          xs => {
            this.employees = xs;
            for(var x = 0; x < this.employees.length; x++) {
              if(this.employees[x].salonId === this.salonId) {
              this.employee = (this.employees[x]);
               this.empList.push(this.employee);
            }
            }
          }
        )

        this.appointmentService.getAllAppointments().subscribe(
          apt => {
            this.appointments = apt;
            if(this.appointments.length > 0) {
              console.log("Appointmenti: ", this.appointments);
            for(var x = 0; x < this.appointments.length; x++) {
              if(this.appointments[x].salonId === this.salonId) {
                this.appDate = +new Date(this.appointments[x].appointmentDate).getDate().toString();
                this.appMonth = +new Date(this.appointments[x].appointmentDate).getMonth().toString();
                if(this.appDate == this.todaysDate && this.appMonth == this.todaysMonth)
                this.appointmentList.push(this.appointments[x]);
                // console.log(`DATE: ${this.appDate} and MONTH: ${this.appMonth}`);
                // console.log(this.appointments[x].appointmentDate);
               // this.appointment = this.appointments[x];
               // this.appointment.employeeName = this.employee.name;
               // console.log("App:", this.appointment);
               if(this.appointments[x].userId) {
               this.userService.getUser(this.appointments[x].userId)
               .subscribe(data => {
                 this.user = data;
               })}
               if(this.appointments[x].employeeId) {
               this.userService.getUser(this.appointments[x].employeeId)
               .subscribe(e => {
                 this.employeeApp = e;
               })}
               if(this.appointments[x].treatmentId) {
               this.userService.getTreatment(this.appointments[x].treatmentId)
               .subscribe(x => {
                 this.treatment = x;
               })}
              //  this.appointmentList.push(this.appointments[x]);
              }
            }
          }
            // console.log("APPOINTMENTS: ", this.appointmentList);

          }
        )
      }

   )



   this.galleryOptions = [
    {
      width: '100%',
      height: '465px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: true
    }

  ];

  this.galleryImages = [
    {
      small: 'assets/images/salon1.png',
      medium: 'assets/images/salon1.png',
      big: 'assets/images/salon1.png'
    },
    {
      small: 'assets/images/salon2.jpg',
      medium: 'assets/images/salon2.jpg',
      big: 'assets/images/salon2.jpg'
    },
    {
      small: 'assets/images/salon3.png',
      medium: 'assets/images/salon3.png',
      big: 'assets/images/salon3.png'
    },
    {
      small: 'assets/images/salon4.png',
      medium: 'assets/images/salon4.png',
      big: 'assets/images/salon4.png'
    },
    {
      small: 'assets/images/salon5.png',
      medium: 'assets/images/salon5.png',
      big: 'assets/images/salon5.png'
    }
  ];

    this.getTreatments();
  }

  loggedIn() {
    this.loggedInUser = localStorage.getItem("username");
    return this.loggedInUser;
  }

  whichRole(): number {
    this.userRole = +localStorage.getItem("userRole");
    if(this.userRole == 1) return 1;
    else if(this.userRole == 2) return 2;
    else return 3;
  }

  deleteSalon(name: string) {
    if(confirm("Amel, are you sure you want to delete " + name + '?')) {
      this.salonService.deleteSalon(this.salonId)
    .subscribe((data) => {
      console.log(data);
      this.router.navigate(['/']);
      this.alertifyService.success("Salon removed successfully!");
    })
    }
  }

  deleteUser(id: number) {
    this.userService.getUser(id).subscribe(
      data => {
        this.userToDelete = data;
      }
    )
    if(confirm("Amel, are you sure you want to delete " + this.userToDelete.name + '?')) {
      this.userService.deleteUser(id)
    .subscribe((data) => {
      console.log(data);
      this.alertifyService.success("User removed successfully.");
      window.location.reload();
    })
    }
  }

  // getApps() {
  //   this.appointmentService.getAllAppointments().subscribe(
  //     data => {
  //       this.appointments = data;
  //       console.log("Data:",data);
  //     }
  //   )
  // }

  getTreatments() {
    this.userService.getAllTreatments().subscribe(
      data => {
        this.treatments = data;
      }
    )
  }

}
