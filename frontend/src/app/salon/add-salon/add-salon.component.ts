import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Salon } from '../../models/salon';
import { SalonClass } from '../../models/salonClass';
import { AlertifyService } from 'src/app/services/alertify.service';
import { SalonService } from '../salon.service';

@Component({
  selector: 'app-add-salon',
  templateUrl: './add-salon.component.html',
  styleUrls: ['./add-salon.component.css']
})
export class AddSalonComponent implements OnInit {
  addSalonForm: FormGroup;
  nextClicked: boolean;
  //salon: Salon;
  salon = new SalonClass();
  fileToUpload: File = null;


  /*
  salonView: Salon = {
    id: null,
    name: '',
    address: '',
    city: '',
    employeeNumber: null
   }
*/
  constructor(private fb: FormBuilder, private router: Router,
    private salonService: SalonService, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.CreateAddSalonForm();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

  CreateAddSalonForm() {
    this.addSalonForm = this.fb.group({
      name: [null, Validators.required],
      city: [null, Validators.required],
      address: [null, Validators.required],
      employeeNumber: [null]
    });
  }

  get name() {
    return this.addSalonForm.get('name') as FormControl;
  }

  get address() {
    return this.addSalonForm.get('address') as FormControl;
  }

  get city() {
    return this.addSalonForm.get('city') as FormControl;
  }

  get employeeNumber() {
    return this.addSalonForm.get('employeeNumber') as FormControl;
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;
    if(this.addSalonForm.valid) {
     // console.log("ID: ", this.salon.id);
     // console.log("Name", this.salon.name);
      //console.log(this.addSalonForm);
     // console.log(this.salon);
      this.mapSalon();
      this.salonService.addProperty(this.salon)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
      this.alertifyService.success("Congrats! Your salon is now available for booking!");
      this.router.navigate(['/']);
    } else {
      this.alertifyService.error("Please review the form and provide all valid entries.");
    }

  }

  onSubmit2() {
    console.log(this.addSalonForm.value);
    this.mapSalon();
    this.salonService.addSalon(this.salon).subscribe(
      (response: Salon) => {
        console.log(response);
        const salon = response;
        localStorage.setItem('salonToken', salon.name);
        this.alertifyService.success("SALON ADDED YEAAAAAH!");
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      });

  }

  /*updateSalon(salonId: number) {
    this.salonService.getSalon(salonId).subscribe(salon => {
      //this.massage = null;
     // this.dataSaved = false;
      this.salonUpdate = salon.id;
      this.addSalonForm.controls['name'].setValue(salon.name);
      this.addSalonForm.controls['city'].setValue(salon.city);
      this.addSalonForm.controls['address'].setValue(salon.address);
      this.addSalonForm.controls['employeeNumber'].setValue(salon.employeeNumber);
    });

  }*/

  mapSalon(): void {
    //this.salon.id = this.salonService.addPropID();
    //this.salon.id = this.salonService.getSalon()
    this.salon.name = this.name.value;
    this.salon.address = this.address.value;
    this.salon.city = this.city.value;
    this.salon.employeeNumber = this.employeeNumber.value;
  }

}
