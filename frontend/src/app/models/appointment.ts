import { Time } from "@angular/common";

export interface Appointment {
  id: number;
  appointmentDateTime: Date;
  salonId: number;
  employeeId: number;
  userId: number;
  treatmentId: number;
}
