import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import egg from "../../../../public/pokemonEgg.png";
import { useState } from "react";
import { usePokemonClient } from "@/hooks/usePokemonClient";
import { Pokemon } from "@/types/models";
import { errorAlert } from "@/helpers/alerts";
import { playSuccess } from "@/helpers/fx";
import { PokemonCard } from "../pokemonCard";

export const Selector = () => {
  const [pokemonsSelected, setPokemonsSelected] = useState<boolean>(false);
  const [pokemonsAdded, setPokemonsAdded] = useState<Pokemon[]>([]);
  const { addRandomMutation } = usePokemonClient();

  const addRandom = async () => {
    try {
      await addRandomMutation.mutateAsync(
        {},
        {
          onSuccess: (data) => {
            setPokemonsAdded((prev) => {
              return [...prev, data.data];
            });
            playSuccess();
          },
        }
      );
    } catch (error) {
      console.error("Error al añadir pokemon:", error);
    }
  };

  return (
    <Flex
      w="80%"
      alignItems="center"
      justifyContent="center"
      gap="4em"
      direction="column"
    >
      <Text>Elige tus pokemon</Text>
      <Flex w="100%" alignItems="center" justifyContent="space-around">
        <Image
          onClick={() => addRandom()}
          style={{ cursor: "pointer" }}
          height={200}
          src={egg}
          alt="pokemon egg"
        />
       <PokemonCard name="finizen" image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/963.png" types={[{id:1 , name:"electric"}]} id={20}/>
        <Image
          onClick={() => addRandom()}
          style={{ cursor: "pointer" }}
          height={200}
          src={egg}
          alt="pokemon egg"
        />
      </Flex>
      <Button isDisabled={!pokemonsSelected}>Ingresar</Button>
    </Flex>
  );
};
