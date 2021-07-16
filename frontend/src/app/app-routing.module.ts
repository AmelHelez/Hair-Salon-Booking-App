import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { AddSalonComponent } from './salon/add-salon/add-salon.component';
import { SalonDetailResolverService } from './salon/salon-details/salon-detail-resolver.service';
import { SalonDetailsComponent } from './salon/salon-details/salon-details.component';
import { SalonListComponent } from './salon/salon-list/salon-list.component';
import { UpdateSalonComponent } from './salon/update-salon/update-salon.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { AdminGuardService as AdminGuard} from './services/admin-guard.service';
import { AuthGuardService as AuthGuard} from './services/auth-guard.service';
import { EmployeeGuardService as EmployeeGuard} from './services/employee-guard.service';
import { AddTreatmentComponent } from './treatments/add-treatment/add-treatment.component';
import { UserReviewsComponent } from './user/user-reviews/user-reviews.component';
import { UserChatComponent } from './user/user-chat/user-chat.component';
import { ChatResponseComponent } from './employee/chat-response/chat-response.component';
import { EmployeeNotificationComponent } from './employee/employee-notification/employee-notification.component';



const routes: Routes = [
  {
    path: "", component: SalonListComponent
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
    path: "admin/add-salon", component: AddSalonComponent, canActivate: [AdminGuard]
  },
  {
    path: "admin/add-treatments/:id", component: AddTreatmentComponent, canActivate: [AdminGuard]
  },
  {
    path: "update/:id", component: UpdateSalonComponent, resolve: {prp: SalonDetailResolverService}, canActivate: [AdminGuard]
  },
  {
    path: "admin/add-employee", component: AddEmployeeComponent, canActivate: [AdminGuard]
  },
  {
    path: "admin/add-employee/:id", component: AddEmployeeComponent, resolve: {prp: SalonDetailResolverService}, canActivate: [AdminGuard]
  },
  {
    path: "employee/:id", component: EmployeeHomeComponent, canActivate: [AuthGuard]
  },
  {
    path: "book/:id", component: AddAppointmentComponent, resolve: {prp: SalonDetailResolverService}, canActivate: [AuthGuard]
  },
  {
    path: "admin/users", component: UserListComponent, canActivate: [AdminGuard]
  },
  {
    path: "edit-user/:id", component: EditUserComponent, resolve: {prp: SalonDetailResolverService}, canActivate: [AuthGuard]
  },
  {
    path: "profile/:id", component: UserProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: ":id/review", component: UserReviewsComponent, canActivate: [AuthGuard]
  },
  {
    path: "chats/:id/:eid/:aid", component: UserChatComponent, canActivate: [AuthGuard]
  },
  {
    path: "chat-response/:id/:eid/:aid/:cid", component: ChatResponseComponent, canActivate: [AuthGuard]
  },
  {
    path: "notifications/:id", component: EmployeeNotificationComponent, canActivate: [AuthGuard]
  },
  {
    path: "**", redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
