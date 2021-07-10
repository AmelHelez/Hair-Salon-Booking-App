import { Component, Input, OnInit } from '@angular/core';
import { Salon } from '../../models/salon';

@Component({
  selector: 'app-salon-card',
  templateUrl: './salon-card.component.html',
  styleUrls: ['./salon-card.component.css']
})
export class SalonCardComponent implements OnInit {
 @Input() salon: Salon;
 average: number;
 sum: number = 0;
 cnt: number = 0;

  constructor() { }


  ngOnInit(): void {
    this.getSalonReviews();
  }

  getSalonReviews() {
    for(var x = 0; x < this.salon.salonReviews.length; x++) {
        this.sum += this.salon.salonReviews[x].grade;
        this.cnt++;
    }
    this.average = this.sum / this.cnt;
    return this.average;
  }

}
