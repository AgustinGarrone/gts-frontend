import pokemonClient from "@/clients/pokemonClient";
import { Pokemon } from "@/types/models";
import { ApiResponse } from "@/types/responses";
import { useMutation } from "react-query";

const useAddRandomPokemon = () => {
  return useMutation<ApiResponse<Pokemon>, Error , {}>(
    async () => {
      const response = await pokemonClient.addRandomPokemon();
      return response;
    }
  );
};

export const usePokemonClient = () => {

    const addRandomMutation = useAddRandomPokemon()

    return {
      addRandomMutation
    }
}