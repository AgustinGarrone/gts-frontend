import pokemonClient from "@/clients/pokemonClient";
import { Pokemon } from "@/types/models";
import { ApiResponse } from "@/types/responses";
import { useMutation } from "react-query";

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
    async (pokemonsId: number[]) => {
      const response = await pokemonClient.addPokemons(pokemonsId)
      return response
    }
  )
}
