export interface User {
  name: string;
  email: string;
  password: string;
  mobile: string;
  age: number;
  city: string;
}

export interface UserForLogin {
  name: string;
  password: string;
  token: string;
}
