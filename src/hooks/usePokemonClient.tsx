import pokemonClient from "@/clients/pokemonClient";
import { errorAlert } from "@/helpers/alerts";
import { playSuccess } from "@/helpers/fx";
import { Pokemon } from "@/types/models";
import { ApiResponse } from "@/types/responses";
import { useMutation } from "react-query";

const useAddRandomPokemon = () => {
  return useMutation<ApiResponse<Pokemon>, Error>(
    async () => {
      const response = await pokemonClient.addRandomPokemon();
      return response;
    },
    {
      onSuccess: (data) => {
        playSuccess();
      },
      onError: (error) => {
        console.error("Error al añadir pokemon:", error);
        errorAlert("Error al añadir pokemon")
        throw new Error(error.message);
      },
    }
  );
};

export const usePokemonClient = () => {

    const addRandomMutation = useAddRandomPokemon()

    return (
        addRandomMutation
    )
}