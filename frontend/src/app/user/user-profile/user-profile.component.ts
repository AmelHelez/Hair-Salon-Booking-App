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
  loggedInUser: number;
  userRole: number;
  appointments: Appointment[] = [];
  saloncic: Salon;


  constructor(private route: ActivatedRoute, private userService: UserService,
    private salonService: SalonService, private appService: AppointmentService) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id'];
    this.loggedInUser = +localStorage.getItem("userId");
    this.userRole = +localStorage.getItem("userRole");
    this.userService.getUser(this.userId).subscribe(
      data => {
        this.user = data;
        this.appointments = this.user.appointments;
        this.salonService.getSalon(this.user.salonId).subscribe(
          x => {
            this.salon = x;
            this.name = this.salon.name;
          }
        )
      }
    )
    console.log("SALON", this.saloncic);
  }

  getDetails() {
     for(var x = 0; x < this.appointments.length; x++) {
       this.salonService.getAllSalons().pipe(
         map((salon) => {
           this.saloncic = salon.find(s => s.id === this.appointments[x].salonId);
         })
       )
     }
     return this.saloncic;
  }

  whichRole(): number {
    this.userRole = +localStorage.getItem("userRole");
    if(this.userRole == 1) return 1;
    else if(this.userRole == 2) return 2;
    else return 3;
  }


}
