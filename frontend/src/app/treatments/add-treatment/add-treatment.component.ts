import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Treatment } from 'src/app/models/treatment';
import { TreatmentService } from 'src/app/services/treatment.service';
import { TreatmentClass } from '../../models/treatmentClass';
import { SalonTreatmentsClass } from '../../models/salonTreatmentsClass';
import { SalonTreatmentService } from 'src/app/services/salon-treatment.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { SalonTreatments } from 'src/app/models/salonTreatments';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrls: ['./add-treatment.component.css']
})
export class AddTreatmentComponent implements OnInit {
  salonId: number;
  addTreatmentForm: FormGroup;
  treatments: Treatment[] = [];
  treatment = new TreatmentClass();
  salonTreatment = new SalonTreatmentsClass();
  pricee: number;
  salonsId: number;
  dodaniTreatment: Treatment;


  constructor(private treatmentService: TreatmentService, private route: ActivatedRoute,
    private fb: FormBuilder, private salTreatService: SalonTreatmentService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.getRequiredInfo();
    this.createAddTreatmentForm();
  }

  getRequiredInfo() {
    this.salonId = +this.route.snapshot.params['id'];
    this.treatmentService.getAllTreatments().subscribe(
      data => this.treatments = data
    )
  }

  createAddTreatmentForm() {
    this.addTreatmentForm = this.fb.group({
      trId: [null],
      price: [null],
      newName: [null],
      newPrice: [null]
    })
  }

  get trId() {
    return this.addTreatmentForm.get('trId') as FormControl;
  }

  get price() {
    return this.addTreatmentForm.get('price') as FormControl;
  }

  get newName() {
    return this.addTreatmentForm.get('newName') as FormControl;
  }

  get newPrice() {
    return this.addTreatmentForm.get('newPrice') as FormControl;
  }

  map(): void {
   this.salonTreatment.salonId = this.salonId;
   this.salonTreatment.treatmentId = +this.trId.value;
   this.salonTreatment.price = this.price.value;
  }

  mapNew(): void {
    this.treatment.name = this.newName.value;
    this.salonsId = this.salonId;
    this.pricee = +this.newPrice.value;
  }

  add() {
    console.log(this.addTreatmentForm.value);
    if(this.trId.value != null && this.price.value != null) {
      this.map();
      console.log("POSTOJECTI TRETMAN", this.salonTreatment);
      this.salTreatService.addSalonTreatment(this.salonTreatment).subscribe(
        (response: SalonTreatments) => {
          this.isSuccessful();
        }
      )
    } else if(this.trId.value == null && this.price.value == null) {
      this.mapNew();
      console.log("NOVI TREATMENT:", this.treatment);
      this.treatmentService.addTreatment(this.treatment).subscribe(
        (data: Treatment) => {
          this.dodaniTreatment = data;
          this.isSuccessful();
          this.mapTreatmentId();
        }
      )
    }
  }

  isSuccessful() {
    this.alertify.success("Treatment added successfully! You can add as much as you want!");
    this.addTreatmentForm.reset();
  }

  mapTreatmentId() {
          console.log(this.dodaniTreatment);
          debugger;
          this.salonTreatment.treatmentId = this.dodaniTreatment.id;
          this.salonTreatment.price = this.pricee;
          this.salonTreatment.salonId = this.salonsId;
          this.salTreatService.addSalonTreatment(this.salonTreatment).subscribe(
            (data) => {
              this.alertify.success("UZASSSSSS");
              console.log("NOVI TRETMAN:", data);}
          )
      }
}
