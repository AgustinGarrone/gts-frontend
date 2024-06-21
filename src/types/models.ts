export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export interface UserWithToken extends User {
  token: string;
}

export default interface IJwt {
  access_token: string;
  expires_in: number;
  token_type: string;
}
