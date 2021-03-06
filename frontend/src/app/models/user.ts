import { Appointment } from "./appointment";
import { Review } from "./review";
import { Chat } from './chat';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  mobile: string;
  age: number;
  city: string;
  roleId: number;
  salonId?: number;
  salonName?: string;
  appointments?: Appointment[];
  appointmentsEmployee?: Appointment[];
  userReviews?: Review[];
  chats?: Chat[];
  chatsEmployee?: Chat[];
}

export interface UserForLogin {
  id: number;
  username: string;
  password: string;
  token: string;
  roleId: number;
  salonId?: number;
}

export interface EditUser {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  mobile: string;
  age: number;
  city: string;
}
