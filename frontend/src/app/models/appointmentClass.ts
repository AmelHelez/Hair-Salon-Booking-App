import { Time } from '@angular/common';
import { Appointment } from './appointment';

export class AppointmentClass implements Appointment {
  id: number;
  appointmentDate: Date;
  appointmentTime: Time;
  salonId: number;
  employeeId: number;
  userId: number;
  treatmentId: number;
}
