import { Time } from "@angular/common";

export interface Appointment {
  id: number;
  appointmentDate: Date;
  appointmentTime: Time;
  salonId: number;
  salonName?: string;
  employeeId: number;
  empName?: string;
  userId: number;
  treatmentId: number;
  treatmentName?: string;
  trPrice?: number;
}
