import { Component, OnInit } from '@angular/core';
import { Salon } from 'src/app/models/salon';
import { User } from 'src/app/models/user';
import { SalonService } from 'src/app/salon/salon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  salons: Salon[] = [];
  salon: Salon;
  name: string;
  constructor(private userService: UserService, private salonService: SalonService) { }

  ngOnInit(): void {
     this.userService.getAllUsers().subscribe(
       data => {
         for(var x = 0; x < data.length; x++) {
           if(data[x].roleId > 1) this.users.push(data[x]);
           if(data[x].roleId == 2) {
             this.salonService.getSalon(data[x].salonId).subscribe(
               data => {
                 this.salon = data;
                 for(x = 0; x < this.users.length; x++) {
                  if(this.users[x].salonId == this.salon.id) this.users[x].salonName = this.salon.name;
                  // console.log("NAMES:", this.users[x].salonName);
                }
                 this.salons.push(this.salon);
               }
             )
           }
         }
        //  console.log("USERS:", this.users);
       }
     )
  }

}
