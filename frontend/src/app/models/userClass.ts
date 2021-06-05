import {User} from './user';

export class UserClass implements User {
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

}
