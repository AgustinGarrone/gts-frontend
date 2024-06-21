"use client";
import { ApiResponse } from "@/types/responses";
import {
  AuthResponses,
  LoginMutationData,
  RegisterMutationData,
} from "../types/auth";
import RESTClient from "./RESTClient";
import { Pokemon } from "@/types/models";

class PokemonClient extends RESTClient {
  private allowedDomain: string | undefined;

  constructor() {
    super();
    this.allowedDomain = "http://localhost:4000/";
  }

  async addRandomPokemon(): Promise<ApiResponse<Pokemon>> {
    const response = await this.axios.post(`pokemon/random`);
    console.log(response);
    return {
      data: response.data.data,
      statusCode: response.status,
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
}

const pokemonClient = new PokemonClient();

export default pokemonClient;
