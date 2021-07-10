import { Review } from './review';
import { Salon } from './salon';
import { SalonTreatments } from './salonTreatments';
import { User } from './user';

export class SalonClass implements Salon {
  id: number;
  name: string;
  city: string;
  address: string;
  image?: string;
  employeeNumber: number;
  phoneNumber: string;
  email: string;
  opened: number;
  closed: number;
  employees?: User[];
  salonTreatments?: SalonTreatments[];
  salonReviews?: Review[];
}
