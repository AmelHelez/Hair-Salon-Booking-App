import { Time } from "@angular/common";
import { Treatment } from "./treatment";
import { User } from "./user";

export interface Appointment {
  id: number;
  appointmentDate: Date;
  appointmentTime: Time;
  salonId: number;
  salonName?: string;
  employeeId: number;
  employee?: User;
  userId: number;
  user?: User;
  treatmentId: number;
  treatment?: Treatment;
  price?: number;
  newDate?: Date;
}
