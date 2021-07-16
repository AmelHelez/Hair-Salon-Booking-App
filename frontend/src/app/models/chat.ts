import { User } from './user';

export interface Chat {
  id: number;
  message?: string;
  action?: boolean;
  userId: number;
  user: User;
  employeeId: number;
  employee: User;
  appointmentId: number;
}
