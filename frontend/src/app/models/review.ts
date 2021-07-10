import { Salon } from './salon';
import { User } from './user';

export interface Review {
  id: number;
  grade: number;
  comment: string;
  dateReviewed: Date;
  salonId: number;
  salon: Salon;
  userId: number;
  user: User;
}
