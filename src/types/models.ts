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

export interface Type {
  id: number;
  name: string;
}

export interface Ability {
  id: number;
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  level: number;
  abilities?: Ability[];
  types?: Type[];
  ownerId: number;
}
