import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Appointment } from 'src/app/models/appointment';
import { Salon } from 'src/app/models/salon';
import { User } from 'src/app/models/user';
import { SalonService } from 'src/app/salon/salon.service';
import { AppointmentService } from 'src/app/services/appointment.service';
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
  today: Date;


  constructor(private route: ActivatedRoute, private userService: UserService,
    private salonService: SalonService, private appService: AppointmentService) { }

  ngOnInit(): void {
    this.localStorage();
    this.mainFunction();
  }

  mainFunction() {
    this.userService.getUser(this.userId).subscribe(
      data => {
        this.user = data;
        this.userName = this.user.name;
        if(this.user.roleId == 3) {this.appointments = this.user.appointments;
        this.user.appointments.sort((a,b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());
      }
        else if(this.user.roleId == 2) {
          this.appointments = this.user.appointmentsEmployee;
          this.user.appointmentsEmployee.sort((a,b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());
        }
        // console.log("ZAPOSLENIKOVI APPOINTMENTI: ", this.appointments);
        this.salonService.getSalon(this.user.salonId).subscribe(
          x => {
            this.name = x.name;
            // this.name = this.salon.name;
          }
        )
        this.appointments.forEach(a => {
          this.salonService.getSalon(a.salonId).subscribe(
            s => {
              a.salonName = s.name;
            }
          )
          this.userService.getUser(a.employeeId).subscribe(
            e => {
              a.empName = e.name;
            }
          )
          this.userService.getTreatment(a.treatmentId).subscribe(
            s => {
              a.treatmentName = s.name;
              a.trPrice = s.cost;
            }
          )
        })
      }
    )
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
