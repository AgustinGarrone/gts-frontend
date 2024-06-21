import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import egg from "../../../../public/pokemonEgg.png";
import { useEffect, useState } from "react";
import { usePokemonClient } from "@/hooks/usePokemonClient";
import { Pokemon } from "@/types/models";
import { errorAlert } from "@/helpers/alerts";
import { playSuccess } from "@/helpers/fx";
import { PokemonCard } from "../pokemonCard";
import { emptyPokemons } from "@/types/constants";
import { motion } from "framer-motion";

export const Selector = () => {
  const [pokemonsSelected, setPokemonsSelected] = useState<boolean>(false);
  const [pokemonsAdded, setPokemonsAdded] = useState<Pokemon[]>(emptyPokemons);
  const { addRandomMutation } = usePokemonClient();

  const addRandom = async (index: number) => {
    try {
      await addRandomMutation.mutateAsync(
        {},
        {
          onSuccess: (data) => {
            setPokemonsAdded((prevPokemons) => {
              const updatedPokemons = [...prevPokemons];
              updatedPokemons[index] = data.data;
              return updatedPokemons;
            });
            playSuccess();
          },
        }
      );
    } catch (error) {
      console.error("Error al añadir pokemon:", error);
    }
  };

  useEffect(() => {
    const allPokemonsSelected = pokemonsAdded.every((p) => {
      return p.name !== "";
    });
    if (allPokemonsSelected) {
      setPokemonsSelected(true);
    }
  }, [pokemonsAdded]);

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
        {pokemonsAdded.map((pokemon, index) =>
          pokemon.name ? (
            <motion.div
              key={pokemon.id}
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <PokemonCard
                name={pokemon.name}
                id={pokemon.id}
                types={pokemon.types!}
                abilities={pokemon.abilities!}
                image={pokemon.image}
              />
            </motion.div>
          ) : (
            <Image
              key={index}
              onClick={() => addRandom(index)}
              style={{ cursor: "pointer" }}
              height={200}
              src={egg}
              alt="pokemon egg"
            />
          )
        )}
      </Flex>
      <Button isDisabled={!pokemonsSelected}>Ingresar</Button>
    </Flex>
  );
};
