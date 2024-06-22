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

  async getRandomPokemon(): Promise<ApiResponse<Pokemon>> {
    const response = await this.axios.post(`pokemon/random`);
    return {
      data: response.data.data,
      statusCode: response.status,
      message: response.statusText,
    };
  }

  async addPokemons(pokemonsId: number[]): Promise<ApiResponse<Pokemon[]>> {
    const response = await this.axios.post(`pokemon`, { pokemonsId });
    return {
      data: response.data.data,
      statusCode: response.status,
      message: response.statusText,
    };
  }
}

const pokemonClient = new PokemonClient();

export default pokemonClient;
