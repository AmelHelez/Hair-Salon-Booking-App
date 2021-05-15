import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { AddSalonComponent } from './salon/add-salon/add-salon.component';
import { SalonCardComponent } from './salon/salon-card/salon-card.component';
import { SalonDetailResolverService } from './salon/salon-details/salon-detail-resolver.service';
import { SalonDetailsComponent } from './salon/salon-details/salon-details.component';
import { SalonListComponent } from './salon/salon-list/salon-list.component';
import { UpdateSalonComponent } from './salon/update-salon/update-salon.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
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
    path: "add", component: AddSalonComponent
  },
  {
    path: "update/:id", component: UpdateSalonComponent, resolve: {prp: SalonDetailResolverService}
  },
  {
    path: "admin/add-employee", component: AddEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
