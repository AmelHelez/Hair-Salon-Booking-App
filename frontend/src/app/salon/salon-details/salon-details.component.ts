import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Salon } from 'src/app/models/salon';
import { SalonService } from '../salon.service';
//import { SalonClass } from '../../models/salonClass';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-salon-details',
  templateUrl: './salon-details.component.html',
  styleUrls: ['./salon-details.component.css']
})
export class SalonDetailsComponent implements OnInit {
  salonDetail: Salon;
  public salonId: number;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private salonService: SalonService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
   this.salonId = +this.route.snapshot.params['id'];
   this.route.data.subscribe(
     (data: Salon) => {
       console.log(data);
       this.salonDetail = data['prp'];
     }

   )

   this.galleryOptions = [
    {
      width: '100%',
      height: '465px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: true
    }

  ];

  this.galleryImages = [
    {
      small: 'assets/images/salon1.png',
      medium: 'assets/images/salon1.png',
      big: 'assets/images/salon1.png'
    },
    {
      small: 'assets/images/salon2.jpg',
      medium: 'assets/images/salon2.jpg',
      big: 'assets/images/salon2.jpg'
    },
    {
      small: 'assets/images/salon3.png',
      medium: 'assets/images/salon3.png',
      big: 'assets/images/salon3.png'
    },
    {
      small: 'assets/images/salon4.png',
      medium: 'assets/images/salon4.png',
      big: 'assets/images/salon4.png'
    },
    {
      small: 'assets/images/salon5.png',
      medium: 'assets/images/salon5.png',
      big: 'assets/images/salon5.png'
    }
  ];

   /* this.route.params.subscribe(
      (params) => {
        this.salonId = params['id'];
        this.salonService.getSalon(+this.salonId)
        .subscribe((data: Salon) => {
          this.salonDetail = data;
          console.log(this.salonDetail);
          console.log(data);
        }, error => this.router.navigate(['/']))
      }
    )*/
  }

}
