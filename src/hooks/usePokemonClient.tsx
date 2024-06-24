import pokemonClient from "@/clients/pokemonClient";
import { Pokemon } from "@/types/models";
import { ApiResponse } from "@/types/responses";
import { useMutation, useQuery } from "react-query";

export const useGetRandomPokemon = () => {
  return useMutation<ApiResponse<Pokemon>, Error , {}>(
    async () => {
      const response = await pokemonClient.getRandomPokemon();
      return response;
    }
  );
};

export const useAddPokemons = () => {
  return useMutation<ApiResponse<Pokemon[]> , Error , number[]>(
    async (pokemonsIds: number[]) => {
      const response = await pokemonClient.addPokemons(pokemonsIds)
      return response
    }
  )
}

export const useDeletePokemon = () => {
  return useMutation<ApiResponse<boolean> , Error , number>(
    async (pokemonId: number) => {
      const response = await pokemonClient.deletePokemon(pokemonId)
      return response
    }
  )
}

export const useGetUserPokemons = (userId: number) => {
  return useQuery(["getUserPokemons", userId], async () => { 
    const response = await pokemonClient.getUserPokemons(userId); 
    return response.data; 
  });
};