import { Salon } from './salon';
import { SalonTreatments } from './salonTreatments';
import { Treatment } from './treatment';

export class SalonTreatmentsClass implements SalonTreatments {
  id: number;
  salonId: number;
  salon: Salon;
  treatmentId: number;
  treatment: Treatment;
  price: number;
}
