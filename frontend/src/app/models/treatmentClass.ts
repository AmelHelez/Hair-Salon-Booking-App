import { Appointment } from './appointment';
import { Treatment } from './treatment';
import { SalonTreatments } from './salonTreatments';

export class TreatmentClass implements Treatment {
  id: number;
  name: string;
  appointments: Appointment[];
  salonTreatments: SalonTreatments[];
}
