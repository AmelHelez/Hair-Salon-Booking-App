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
  searchCity = '';
  searchName = '';
  SortbyParam = '';
  sortDirection = "asc";
  city = '';
  name = '';

  constructor(private salonService: SalonService) { }

  ngOnInit(): void {
   this.getAllSalons();
  }

  getAllSalons() {
    this.salonService.getAllSalons().subscribe(
      data => {
        this.salons = data as Salon[];
        for(var i = 0; i < this.salons.length; i++) {
          if(this.salons[i].image) {
          this.salons[i].image = atob(this.salons[i].image);
        }
        this.salons[i].city = this.salons[i].city.toUpperCase();
        this.salons[i].name = this.salons[i].name.toUpperCase();
        }
      }
    )
  }
  onCityFilter() {
    this.searchCity = this.city.toUpperCase();
  }

  onNameFilter() {
    this.searchName = this.name.toUpperCase();
  }

  onCityFilterClear() {
    this.searchCity = '';
    this.city = '';
  }

  onNameFilterClear() {
    this.searchName = '';
    this.name = '';
  }

  onSortDirection() {
    if (this.sortDirection === 'desc') {
      this.sortDirection = "asc";
    } else {
      this.sortDirection = "desc";
    }
  }

}
