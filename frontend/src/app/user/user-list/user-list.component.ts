import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Salon } from 'src/app/models/salon';
import { User } from 'src/app/models/user';
import { SalonService } from 'src/app/salon/salon.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userToDelete: User;
  salons: Salon[] = [];
  salon: Salon;
  name: string;
  searchSalon = '';
  salonName = '';
  user: User;
  usersFilter: User[] = [];
  salonFilter: Salon[] = [];

  constructor(private userService: UserService, private salonService: SalonService,
    private alertifyService: AlertifyService) { }

  ngOnInit(): void {
     this.userService.getAllUsers().subscribe(
       data => {
         for(var x = 0; x < data.length; x++) {
           if(data[x].roleId > 1) this.users.push(data[x]);
           if(data[x].roleId == 2) {
             this.salonService.getSalon(data[x].salonId).subscribe(
               xy => {
                 this.salon = xy;
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

  deleteUser(id: number) {
    this.userService.getUser(id).subscribe(
      data => {
        this.userToDelete = data;
      }
    )
    if(confirm("Amel, are you sure you want to delete " + this.userToDelete.name + '?')) {
      this.userService.deleteUser(id)
    .subscribe((data) => {
      // console.log(data);
      this.alertifyService.success("User removed successfully.");
      window.location.reload();
    })
    }
  }

  onSalonFilter() {
    this.searchSalon = this.salonName.toUpperCase();
    this.userService.getAllUsers().subscribe(
       x => {
         this.usersFilter = x;
       }
    )
    this.salonService.getAllSalons().subscribe(
      x => {
        this.salonFilter = x;

      }
    )
  }

  onSalonFilterClear() {
    this.searchSalon = '';
    this.salonName = '';
  }
}
