export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  mobile: string;
  age: number;
  city: string;
  roleId: number;
}

export interface UserForLogin {
  name: string;
  password: string;
  token: string;
  roleId: number;
}
