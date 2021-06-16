import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
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
  salon = new SalonClass();
  salonUpdate = null;
  salonId: number;
  fileToUpload: File = null;
  imageChangedEvent: any = '';
  public base64Slika: string;
  croppedImage: any = '';
  ime: string;
  adresa: string;
  grad: string;
  salonNew: Salon;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private salonService: SalonService, private alertifyService: AlertifyService) { }

    handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.base64Slika = btoa(binaryString);
    }

    fileChangeEvent($event) {
      this.imageChangedEvent = event;
      var image: any = new Image();
      var file: File = $event.target.files[0];
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      var myReader: FileReader = new FileReader();
      myReader.onloadend = function (loadEvent: any) {
        image.src = loadEvent.target.result;
      };
      myReader.readAsDataURL(file);
    }

    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
    }



  ngOnInit(): void {
    this.salonId = +this.route.snapshot.params['id'];
   this.route.data.subscribe(
     (data: Salon) => {
       console.log(data);
       this.salon = data['prp'];
     }
   )
   this.salonService.getSalon(this.salonId).subscribe(
     x => {
       this.salonNew = x;
       this.ime = this.salonNew.name;
       this.grad = this.salonNew.city;
       this.adresa = this.salonNew.address;
     }
   )
    this.CreateAddSalonForm();
  }


  CreateAddSalonForm() {
    this.updateSalonForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      employeeNumber: [null],
      image: [null],
      phoneNumber: [null, [Validators.maxLength(12)]],
      email: [null, [Validators.email]]    });
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

  get image() {
    return this.updateSalonForm.get('image') as FormControl;
  }

  get phoneNumber() {
    return this.updateSalonForm.get('phoneNumber') as FormControl;
  }

  get email() {
    return this.updateSalonForm.get('email') as FormControl;
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
        this.alertifyService.success("SALON UPDATED!");
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.alertifyService.error("Not updated...");
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
     if(!this.name.value) salon.name = this.ime;
     else salon.name = this.name.value;
     if(!this.city.value) salon.city = this.grad;
     else salon.city = this.city.value;
     if(!this.address.value) salon.address = this.adresa;
     else salon.address = this.address.value;
     salon.employeeNumber = this.employeeNumber.value;
     salon.image = btoa(this.croppedImage);
     salon.phoneNumber = this.phoneNumber.value;
     salon.email = this.email.value;
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
}
