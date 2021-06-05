import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Salon } from 'src/app/models/salon';
import { SalonClass } from 'src/app/models/salonClass';
import { User } from 'src/app/models/user';
import { SalonService } from 'src/app/salon/salon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {
  employeeSalon: User;
  salonId: number;
  empId: number;
  salon = new SalonClass();
  //salon: Salon;

  constructor(private userService: UserService, private route: ActivatedRoute,
    private salonService: SalonService) { }


  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.empId = +this.route.snapshot.params['id'];
    console.log(this.empId);
    this.userService.getUser(this.empId)
    .subscribe((data: User) => {
      this.employeeSalon = data;
      console.log("EMPLOYEE:", this.employeeSalon);
     // console.log("Employee:", this.employeeSalon);
     this.salonService.getSalon(this.employeeSalon.salonId)
    .subscribe((data: Salon) => {
      this.salon = data;
      if(this.salon.image)
        this.salon.image = atob(this.salon.image);
      console.log("Salon:", data);
    });
    });


  }


  // getSalon() {
  //   this.salonService.getSalon(this.employeeSalon.salonId)
  //   .subscribe((data: Salon) => {
  //     this.salon = data;
  //     console.log("Salon:", data);
  //   })

/*    this.salonService.getSalon(this.salonId).subscribe(
      data => {
        this.salon = data;
        console.log("Salon:", data);
      }
    )*/
//  }

 /* whichSalon() {
    this.employeeSalon = +localStorage.getItem("empSalon");
  }*/

}
