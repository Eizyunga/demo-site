export interface User {
  firstName: string;
  lastName?: string
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserDetails {
  firstName: string;
  lastName?: string
  email: string;
}

export interface OTP {
  pass: string;
}

export enum LoginState {
  LOGIN = 'login',
  SIGNUP = 'signup',
}
