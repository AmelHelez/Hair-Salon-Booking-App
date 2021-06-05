import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { AddSalonComponent } from './salon/add-salon/add-salon.component';
import { SalonCardComponent } from './salon/salon-card/salon-card.component';
import { SalonDetailResolverService } from './salon/salon-details/salon-detail-resolver.service';
import { SalonDetailsComponent } from './salon/salon-details/salon-details.component';
import { SalonListComponent } from './salon/salon-list/salon-list.component';
import { UpdateSalonComponent } from './salon/update-salon/update-salon.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const routes: Routes = [
  {
    path: "", component: SalonListComponent,
  },
  {
    path: "details/:id", component: SalonDetailsComponent, resolve: {prp: SalonDetailResolverService}
  },
  {
    path: "login", component: UserLoginComponent
  },
  {
    path: "register", component: UserRegisterComponent
  },
  {
    path: "admin/add-salon", component: AddSalonComponent
  },
  {
    path: "update/:id", component: UpdateSalonComponent, resolve: {prp: SalonDetailResolverService}
  },
  {
    path: "admin/add-employee", component: AddEmployeeComponent
  },
  {
    path: "admin/add-employee/:id", component: AddEmployeeComponent, resolve: {prp: SalonDetailResolverService}
  },
  {
    path: "employee/:id", component: EmployeeHomeComponent
  },
  {
    path: "book/:id", component: AddAppointmentComponent, resolve: {prp: SalonDetailResolverService}
  },
  {
    path: "admin/users", component: UserListComponent
  },
  {
    path: "edit-user/:id", component: EditUserComponent, resolve: {prp: SalonDetailResolverService}
  },
  {
    path: "profile/:id", component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
