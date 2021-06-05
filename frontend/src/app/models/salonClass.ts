import { Salon } from './salon';
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
  employees?: User[];
}
