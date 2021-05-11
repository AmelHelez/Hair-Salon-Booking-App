import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalonListComponent } from './salon/salon-list/salon-list.component';
import { SalonCardComponent } from './salon/salon-card/salon-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {SalonService} from './salon/salon.service';
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
    UpdateSalonComponent
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
    NgxGalleryModule
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
    SalonDetailResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
