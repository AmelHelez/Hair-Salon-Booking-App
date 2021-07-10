import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Appointment } from 'src/app/models/appointment';
import { Salon } from 'src/app/models/salon';
import { SalonTreatments } from 'src/app/models/salonTreatments';
import { User } from 'src/app/models/user';
import { SalonService } from 'src/app/salon/salon.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SalonTreatmentService } from 'src/app/services/salon-treatment.service';
import { TreatmentService } from 'src/app/services/treatment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: number;
  user: User;
  name: string;
  salon: Salon;
  loggedInUserId: number;
  userRole: number;
  appointments: Appointment[] = [];
  saloncic: Salon;
  userName: string;
  today: Date = new Date();
  treatmentId: number;
  allTreatments: SalonTreatments[] = [];


  constructor(private route: ActivatedRoute, private userService: UserService,
    private salonService: SalonService, private appService: AppointmentService,
    private treatmentService: TreatmentService, private salonTreatmentsService: SalonTreatmentService) { }

  ngOnInit(): void {
    this.localStorage();
    this.mainFunction();
  }

  mainFunction() {
    this.userService.getUser(this.userId).subscribe(
      data => {
        this.user = data;
        this.userName = this.user.name;
        if(this.user.roleId == 3) {
        this.appointments = this.user.appointments;
        this.user.appointments.sort((a,b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());
      }
        else if(this.user.roleId == 2) {
          this.appointments = this.user.appointmentsEmployee;
          this.user.appointmentsEmployee.sort((a,b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());
        }
        this.salonService.getSalon(this.user.salonId).subscribe(
          x => {
            this.name = x.name;
          }
        )
        this.appointments.forEach(a => {
          a.newDate = new Date(a.appointmentDate);
          this.salonService.getSalon(a.salonId).subscribe(
            s => {
              a.salonName = s.name;
            }
          )
          this.userService.getUser(a.employeeId).subscribe(
            e => {
              a.employee = e;
            }
          )
          this.treatmentService.getTreatment(a.treatmentId).subscribe(
            s => {
              this.treatmentId = s.id;
              a.treatment = s;
            }
          )
          this.salonTreatmentsService.getAllSalonTreatments().pipe(
            map(salonTreatment =>
              salonTreatment.find(st => st.salonId === this.user.salonId && st.treatmentId === a.treatmentId)))
              .subscribe(salonTreatment => a.price = salonTreatment.price)
        })
      }
    )
  }

  getSalonTreatments() {
      this.salonTreatmentsService.getAllSalonTreatments().pipe(
        map(salonTreatment =>
          salonTreatment.find(st => st.salonId === this.user.salonId && st.treatmentId === this.treatmentId)))
          .subscribe(salonTreatment => this.allTreatments.push(salonTreatment))
  }


  localStorage() {
    this.userId = +this.route.snapshot.params['id'];
    this.loggedInUserId = +localStorage.getItem("userId");
    this.userRole = +localStorage.getItem("userRole");
  }

  usersRole(): number {
    if(this.user.roleId == 1) return 1;
    else if(this.user.roleId == 2) return 2;
    else return 3;
  }


  getDetails() {
      this.appointments.forEach(a => {
        this.salonService.getSalon(a.salonId).subscribe(
          s => {
            return s;
          }
        )
      })
  }

  whichRole(): number {
    this.userRole = +localStorage.getItem("userRole");
    if(this.userRole == 1) return 1;
    else if(this.userRole == 2) return 2;
    else return 3;
  }

  userProfileRole(): number {
    if(this.user.roleId == 1) return 1;
    else if(this.user.roleId == 2) return 2;
    else return 3;
  }


}
