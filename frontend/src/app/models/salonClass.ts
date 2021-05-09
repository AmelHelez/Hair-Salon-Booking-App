import { Salon } from './salon';

export class SalonClass implements Salon {
  id: number;
  name: string;
  city: string;
  address: string;
  image?: File;
  employeeNumber: number;
}
