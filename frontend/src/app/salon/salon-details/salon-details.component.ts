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
import { SalonTreatments } from 'src/app/models/salonTreatments';
import { SalonTreatmentService } from 'src/app/services/salon-treatment.service';
import { TreatmentService } from 'src/app/services/treatment.service';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review';

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
  allApps: Appointment[] = [];
  userId: number;
  salonTreatment: SalonTreatments[] = [];
  salTreat: SalonTreatments;
  reviews: Review[] = [];



  constructor(private salonService: SalonService, private appointmentService: AppointmentService,
    private route: ActivatedRoute, private router: Router, private userService: UserService,
    private alertifyService: AlertifyService, private salonTreatmentService: SalonTreatmentService,
    private treatmentService: TreatmentService, private reviewService: ReviewService) { }

  ngOnInit(): void {
      this.getSalonDetails();
  }

  getSalonDetails() {
    this.salonId = +this.route.snapshot.params['id'];
   this.route.data.subscribe(
     (data: Salon) => {
       this.salonDetail = data['prp'];
       if(this.salonDetail.image) {
        this.salonDetail.image = atob(this.salonDetail.image); }
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
               if(this.appointments[x].userId) {
               this.userService.getUser(this.appointments[x].userId)
               .subscribe(data => {
                 this.appointments[x].user = data;
               })}
               if(this.appointments[x].employeeId) {
               this.userService.getUser(this.appointments[x].employeeId)
               .subscribe(e => {
                 this.appointments[x].employee = e;
               })}
               if(this.appointments[x].treatmentId) {
               this.treatmentService.getTreatment(this.appointments[x].treatmentId)
               .subscribe(tr => {
                 this.appointments[x].treatment = tr;
                 this.salonTreatmentService.getAllSalonTreatments().pipe(
                  map(treat => treat.find(t => t.treatmentId === this.appointments[x].treatmentId))
                ).subscribe(treat => this.appointments[x].price = treat.price)
               }
               )}
               if(this.appDate == this.todaysDate && this.appMonth == this.todaysMonth) {
                this.appointmentList.push(this.appointments[x]);
                this.appointmentList.sort((a,b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
                }
                else if(this.appDate > this.todaysDate && this.appMonth >= this.todaysMonth) {
                this.allApps.push(this.appointments[x]);
                this.allApps.sort((a,b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
                }
              }
            }
          }

          }
        )
        this.getSalonReviews();
      }

   )
   this.images();

  }

  getUserId() {
    this.userId = +localStorage.getItem("userId");
    return this.userId;
  }

  images() {
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

  getSalonReviews() {
    this.reviewService.getAllReviews().pipe(
      map(review => review.find(r => r.salonId === this.salonDetail.id)))
      .subscribe(review => this.reviews.push(review))
  }

  deleteSalon(name: string) {
    if(confirm("Amel, are you sure you want to delete " + name + '?')) {
      this.salonService.deleteSalon(this.salonId)
    .subscribe((data) => {
      // console.log(data);
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
      this.alertifyService.success("User removed successfully.");
      window.location.reload();
    })
    }
  }
}
