import { Review } from "./review";
import { SalonTreatments } from "./salonTreatments";
import { User } from "./user";

export interface Salon {
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
  average?: number;
}
