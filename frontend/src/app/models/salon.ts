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
  employees?: User[];
}
