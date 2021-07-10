import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Salon } from '../../models/salon';
import { SalonClass } from '../../models/salonClass';
import { AlertifyService } from 'src/app/services/alertify.service';
import { SalonService } from '../salon.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-salon',
  templateUrl: './add-salon.component.html',
  styleUrls: ['./add-salon.component.css']
})
export class AddSalonComponent implements OnInit {
  addSalonForm: FormGroup;
  nextClicked: boolean;
  salon = new SalonClass();
  fileToUpload: File = null;
  imageChangedEvent: any = '';
  public base64Slika: string;
  croppedImage: any = '';
  mojaslika: any;


  constructor(private fb: FormBuilder, private router: Router,
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
      employeeNumber: [null],
      image: [null],
      opened: [null, Validators.required],
      closed: [null, Validators.required],
      phoneNumber: [null, Validators.maxLength(12)],
      email: [null, Validators.email]
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

  get image() {
    return this.addSalonForm.get('image') as FormControl;
  }

  get phoneNumber() {
    return this.addSalonForm.get('phoneNumber') as FormControl;
  }

  get email() {
    return this.addSalonForm.get('email') as FormControl;
  }

  get opened() {
    return this.addSalonForm.get('opened') as FormControl;
  }

  get closed() {
    return this.addSalonForm.get('closed') as FormControl;
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log(this.addSalonForm.value);
    this.mapSalon();
    console.log(this.salon);
    this.salonService.addSalon(this.salon).subscribe(
      (response: Salon) => {
        const salon = response;
        localStorage.setItem('salonToken', salon.name);
        this.alertifyService.success("Salon is successfully added!");
        this.router.navigate(['/']);
      }, error => {
        this.alertifyService.error("Salon registration is unsuccessful.");
      });

  }

  mapSalon(): void {
    this.salon.name = this.name.value;
    this.salon.address = this.address.value;
    this.salon.city = this.city.value;
    this.salon.employeeNumber = this.employeeNumber.value;
    this.salon.image = btoa(this.croppedImage);
    this.salon.phoneNumber = this.phoneNumber.value;
    this.salon.email = this.email.value;
    this.salon.opened = new Date(this.opened.value).getHours();
    this.salon.closed = new Date(this.closed.value).getHours();
  }

}
