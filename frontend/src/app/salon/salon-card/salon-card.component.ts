import { Component, Input, OnInit } from '@angular/core';
import { Salon } from '../../models/salon';

@Component({
  selector: 'app-salon-card',
  templateUrl: './salon-card.component.html',
  styleUrls: ['./salon-card.component.css']
})
export class SalonCardComponent implements OnInit {
 @Input() salon: Salon;
 @Input() hideButton: boolean;
 //slika: string = atob(this.salon.image);


    //salon: Salon;

  constructor() { }


  ngOnInit(): void {

  }

}
