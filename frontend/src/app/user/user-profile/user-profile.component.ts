import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Salon } from 'src/app/models/salon';
import { User } from 'src/app/models/user';
import { SalonService } from 'src/app/salon/salon.service';
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


  constructor(private route: ActivatedRoute, private userService: UserService,
    private salonService: SalonService) { }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id'];
    this.loggedInUser = +localStorage.getItem("userId");
    this.userRole = +localStorage.getItem("userRole");
    //  console.log("ROLE", this.userRole);
    this.userService.getUser(this.userId).subscribe(
      data => {
        this.user = data;
        console.log(data);
        this.salonService.getSalon(this.user.salonId).subscribe(
          x => {
            this.salon = x;
            this.name = this.salon.name;
            //console.log("SALON:",this.salon);
          }
        )
      }
    )
    // this.salonService.getSalon(this.user.salonId).subscribe(
    //   x => {
    //        this.salon = x;
    //        console.log("SALON",this.salon);
    //       //  this.name = this.salon.name;
    //       //  console.log("NAME:",this.name);
    //   }
    // )

  }

}
