import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Salon } from 'src/app/models/salon';
import { SalonService } from '../salon.service';

@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.component.html',
  styleUrls: ['./salon-list.component.css']
})
export class SalonListComponent implements OnInit {

  salons: Salon[] = [];


  constructor(private salonService: SalonService) { }

  ngOnInit(): void {
    this.salonService.getAllSalons().subscribe(
      data => {
        console.log(data);
        this.salons = data as Salon[];
      }, error => {
        console.log(error);
      }
    )
  }

}
