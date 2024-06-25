"use client";
import { ApiResponse } from "@/types/responses";
import RESTClient from "./RESTClient";
import { Pokemon } from "@/types/models";
import axios from "axios";
class PokemonClient extends RESTClient {
  private allowedDomain: string | undefined;

  constructor() {
    super();
    this.allowedDomain = "http://localhost:4000/";
  }

  async getRandomPokemon(): Promise<ApiResponse<Pokemon>> {
    try {
      const response = await this.axios.post(`pokemon/random`);
      return {
        data: response.data.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: error.response?.status || 500,
          message: error.response?.data.message,
        };
        throw apiResponse;
      } else {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: 500,
          message: "Error al obtener pokémons",
        };
        throw apiResponse;
      }
    }
  }

  async getUserPokemons(userId: number): Promise<ApiResponse<Pokemon[]>> {
    try {
      const response = await this.axios.get(`pokemon/${userId}`);
      return {
        data: response.data.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiResponse: ApiResponse<[]> = {
          data: [],
          statusCode: error.response?.status || 500,
          message: error.response?.data.message,
        };
        throw apiResponse;
      } else {
        const apiResponse: ApiResponse<[]> = {
          data: [],
          statusCode: 500,
          message: "Error al obtener pokémons",
        };
        throw apiResponse;
      }
    }
  }

  async addPokemons(pokemonIds: number[]): Promise<ApiResponse<Pokemon[]>> {
    try {
      const response = await this.axios.post(`pokemon`, { pokemonIds });
      return {
        data: response.data.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiResponse: ApiResponse<[]> = {
          data: [],
          statusCode: error.response?.status || 500,
          message: error.response?.data.message,
        };
        throw apiResponse;
      } else {
        const apiResponse: ApiResponse<[]> = {
          data: [],
          statusCode: 500,
          message: "Error al añadir pokémon",
        };
        throw apiResponse;
      }
    }
  }

  async deletePokemon(pokemonId: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await this.axios.delete(`pokemon/${pokemonId}`);
      return {
        data: response.data.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiResponse: ApiResponse<boolean> = {
          data: false,
          statusCode: error.response?.status || 500,
          message: error.response?.data.message,
        };
        throw apiResponse;
      } else {
        const apiResponse: ApiResponse<boolean> = {
          data: false,
          statusCode: 500,
          message: "Error al eliminar pokémon",
        };
        throw apiResponse;
      }
    }
  }
}

const pokemonClient = new PokemonClient();

export default pokemonClient;
