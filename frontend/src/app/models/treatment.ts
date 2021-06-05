import { Appointment } from './appointment';

export interface Treatment {
  id: number;
  name: string;
  cost: number;
  appointments: Appointment[];
}
