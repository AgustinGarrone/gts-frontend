export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  initialPokemons: boolean;
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

export enum TradeState {
  PENDING = "PENDING",
  PROPOSED = "PROPOSED",
  COMPLETED = "COMPLETED",
}

export enum TradeResponse {
  REJECT = "REJECT",
  CONFIRM = "CONFIRM",
}

export interface Trade {
  id: number;
  user1id: number;
  user2id: number;
  pokemon1id: number;
  pokemon2id: number;
  state: TradeState;
}

export interface Notification {
  id: number;
  userId: number;
  message: string;
}
