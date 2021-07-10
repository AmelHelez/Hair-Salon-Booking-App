import { Salon } from './salon';
import { Treatment } from './treatment';

export interface SalonTreatments {
  id: number;
  salonId: number;
  salon: Salon;
  treatmentId: number;
  treatment: Treatment;
  price: number;
}
