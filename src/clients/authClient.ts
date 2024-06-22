"use client";
import {
  AuthResponses,
  LoginMutationData,
  RegisterMutationData,
} from "../types/auth";
import RESTClient from "./RESTClient";

class AuthClient extends RESTClient {
  private allowedDomain: string | undefined;

  constructor() {
    super();
    this.allowedDomain = "http://localhost:4000/";
  }

  async login(data: LoginMutationData): Promise<AuthResponses> {
    const response = await this.axios.post(`auth/login`, data);
    return {
      user: response.data.data,
      status: response.status,
      message: response.statusText,
    };
  }

  async register(data: RegisterMutationData): Promise<AuthResponses> {
    const response = await this.axios.post("auth/register", data);
    return {
      user: response.data,
      status: response.status,
      message: response.statusText,
    };
  }

  async setInitialPokemonsTrue(): Promise<boolean> {
    const response = await this.axios.post("auth/setInitial");
    return response.data;
  }
}

const authClient = new AuthClient();

export default authClient;
