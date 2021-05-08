import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Salon } from 'src/app/models/salon';
import { SalonClass } from 'src/app/models/salonClass';
import { AlertifyService } from 'src/app/services/alertify.service';
import { SalonService } from '../salon.service';

@Component({
  selector: 'app-update-salon',
  templateUrl: './update-salon.component.html',
  styleUrls: ['./update-salon.component.css']
})
export class UpdateSalonComponent implements OnInit {

  updateSalonForm: FormGroup;
  nextClicked: boolean;
  //salon: Salon;
  salon = new SalonClass();
  salonUpdate = null;
  salonId: number;

  /*
  salonView: Salon = {
    id: null,
    name: '',
    address: '',
    city: '',
    employeeNumber: null
   }
*/
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private salonService: SalonService, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.salonId = +this.route.snapshot.params['id'];
   this.route.data.subscribe(
     (data: Salon) => {
       console.log(data);
       this.salon = data['prp'];
     }
   )
    this.CreateAddSalonForm();
  }

  CreateAddSalonForm() {
    this.updateSalonForm = this.fb.group({
      name: [null, Validators.required],
      city: [null, Validators.required],
      address: [null, Validators.required],
      employeeNumber: [null]
    });
  }

  get name() {
    return this.updateSalonForm.get('name') as FormControl;
  }

  get address() {
    return this.updateSalonForm.get('address') as FormControl;
  }

  get city() {
    return this.updateSalonForm.get('city') as FormControl;
  }

  get employeeNumber() {
    return this.updateSalonForm.get('employeeNumber') as FormControl;
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log(this.updateSalonForm.value);
    this.salonService.updateSalon(this.salon.id, this.updateSalonForm.value).subscribe(
      (response: Salon) => {
        console.log(response);
        const salon = response;
        //localStorage.getItem('salonToken');
        this.alertifyService.success("SALON UPDATED YEAAAAAH!");
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.alertifyService.error("JEBO GA LED!");
      });
     /*else {
      this.salon.id = this.salonUpdate;
      this.salonService.updateSalon(this.salon).subscribe(() => {
        this.alertifyService.warning("SALON UPDATED!");
        this.updateSalonForm.reset();
      })
    }*/
  }

  updateSalon(salonId: number) {
    this.salonService.getSalon(salonId).subscribe(salon => {
      //this.massage = null;
     // this.dataSaved = false;
     // this.salonUpdate = salon.id;
     salon.name = this.name.value;
     salon.city = this.city.value;
     salon.address = this.address.value;
     salon.employeeNumber = this.employeeNumber.value;
     //this.updateSalonForm.controls['city'].setValue(this.salon.city);
     //this.mapSalon();
     this.salonService.updateSalon(this.salonId, salon)
     .subscribe(() => {
      this.alertifyService.success("SALON UPDATED!");
      this.router.navigate(["/details/", salon.id]);
     }, error => {
       console.log("ERROR: ");
       console.log(error);
     })
    });
  }
/*
  mapSalon(): void {
    //this.salon.id = this.salonService.addPropID();
    //this.salon.id = this.salonService.getSalon()
    this.salon.name = this.name.value;
    this.salon.address = this.address.value;
    this.salon.city = this.city.value;
    this.salon.employeeNumber = +this.employeeNumber.value;
  }*/

}
