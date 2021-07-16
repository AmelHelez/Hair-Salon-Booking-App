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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HammerModule } from "@angular/platform-browser";

//I keep the new line
import { MatNativeDateModule } from '@angular/material/core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { DatePipe } from '@angular/common';

//I keep the new line
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
import { AddTreatmentComponent } from './treatments/add-treatment/add-treatment.component';
import { TreatmentService } from './services/treatment.service';
import { SalonTreatmentService } from './services/salon-treatment.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserReviewsComponent } from './user/user-reviews/user-reviews.component';
import { ReviewService } from './services/review.service';
import { ChatService } from './services/chat.service';
import { UserChatComponent } from './user/user-chat/user-chat.component';
import { ChatResponseComponent } from './employee/chat-response/chat-response.component';
import { EmployeeNotificationComponent } from './employee/employee-notification/employee-notification.component';

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
    FooterComponent,
    AddTreatmentComponent,
    UserReviewsComponent,
    UserChatComponent,
    ChatResponseComponent,
    EmployeeNotificationComponent
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
    MatButtonModule,
    MatFormFieldModule,
    BsDatepickerModule.forRoot(),
    MatTableModule,
    // AppointmentPicker,
    // TimepickerModule.forRoot(),
    MatDatepickerModule,
    // NgxMatTimepickerModule,
    // NgxMatDatetimePickerModule,
    MatInputModule,
    MatNativeDateModule,
    TimepickerModule.forRoot(),
    NgbModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,
    HammerModule
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
    ChatService,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    SalonService,
    UserService,
    AuthService,
    AlertifyService,
    SalonDetailResolverService,
    AppointmentService,
    TreatmentService,
    SalonTreatmentService,
    ReviewService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
