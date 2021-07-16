import { Chat } from "./chat";
import { User } from "./user";

export class ChatClass implements Chat {
  appointmentId: number;
  id: number;
  message?: string;
  action?: boolean;
  userId: number;
  user: User;
  employeeId: number;
  employee: User;
}
