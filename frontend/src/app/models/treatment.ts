import { Appointment } from './appointment';
import { SalonTreatments } from './salonTreatments';

export interface Treatment {
  id: number;
  name: string;
  appointments: Appointment[];
  salonTreatments?: SalonTreatments[];
}
