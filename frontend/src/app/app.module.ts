import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
 import { MatInputModule } from '@angular/material/input';
 import {MatFormFieldModule} from '@angular/material/form-field';

import {MatNativeDateModule} from '@angular/material/core';
// import { TimepickerModule } from 'ngx-bootstrap/timepicker';
// import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
// import {MomentDatetimeAdapter} from "@mat-datetimepicker/moment";
// import {MatMomentDatetimeModule} from "@mat-datetimepicker/moment";

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalonListComponent } from './salon/salon-list/salon-list.component';
import { SalonCardComponent } from './salon/salon-card/salon-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SalonService } from './salon/salon.service';
import { SalonDetailsComponent } from './salon/salon-details/salon-details.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AlertifyService } from './services/alertify.service';
import { SalonDetailResolverService } from './salon/salon-details/salon-detail-resolver.service';
import { AddSalonComponent } from './salon/add-salon/add-salon.component';
import { UpdateSalonComponent } from './salon/update-salon/update-salon.component';
import { HttpErrorInterceptorService } from './services/httperror-interceptor.service';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { AppointmentService } from './services/appointment.service';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { UserListComponent } from './user/user-list/user-list.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SalonListComponent,
    SalonCardComponent,
    NavBarComponent,
    SalonDetailsComponent,
    UserRegisterComponent,
    UserLoginComponent,
    AddSalonComponent,
    UpdateSalonComponent,
    AddEmployeeComponent,
    EmployeeHomeComponent,
    AddAppointmentComponent,
    FilterPipe,
    SortPipe,
    UserListComponent,
    EditUserComponent,
    UserProfileComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    NgxGalleryModule,
    ImageCropperModule,
    MatFormFieldModule,
    BsDatepickerModule.forRoot(),
    // TimepickerModule.forRoot(),
    MatDatepickerModule,
    // NgxMatTimepickerModule,
    // NgxMatDatetimePickerModule,
      MatInputModule,
     MatNativeDateModule
    // MatDatepickerModule,
    // MatDatetimepickerModule
    // MomentDatetimeAdapter,
    // MatMomentDatetimeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    SalonService,
    UserService,
    AuthService,
    AlertifyService,
    SalonDetailResolverService,
    AppointmentService,
   // MatNativeDateModule,
    // MatDatepickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
