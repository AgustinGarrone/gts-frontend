"use client";
import { ApiResponse } from "@/types/responses";
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

  async getUserPokemons(userId: number): Promise<ApiResponse<Pokemon[]>> {
    const response = await this.axios.get(`pokemon/${userId}`);
    return {
      data: response.data.data,
      statusCode: response.status,
      message: response.statusText,
    };
  }

  async addPokemons(pokemonIds: number[]): Promise<ApiResponse<Pokemon[]>> {
    const response = await this.axios.post(`pokemon`, { pokemonIds });
    return {
      data: response.data.data,
      statusCode: response.status,
      message: response.statusText,
    };
  }

  async deletePokemon(pokemonId: number): Promise<ApiResponse<boolean>> {
    const response = await this.axios.delete(`pokemon/${pokemonId}`);
    return {
      data: response.data.data,
      statusCode: response.status,
      message: response.statusText,
    };
  }
}

const pokemonClient = new PokemonClient();

export default pokemonClient;
