import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import egg from "../../../../public/pokemonEgg.png";
import { useEffect, useState } from "react";
import { useAddPokemons, useGetRandomPokemon } from "@/hooks/usePokemonClient";
import { Pokemon } from "@/types/models";
import { errorAlert } from "@/helpers/alerts";
import { playSound, playSuccess } from "@/helpers/fx";
import { PokemonCard } from "../pokemonCard";
import { emptyPokemons } from "@/types/constants";
import { motion } from "framer-motion";
import { useAuthClient } from "@/hooks/useAuthClient";
import { useRouter } from "next/navigation";

export const Selector = () => {
  const [pokemonsSelected, setPokemonsSelected] = useState<boolean>(false);
  const [pokemonsAdded, setPokemonsAdded] = useState<Pokemon[]>(emptyPokemons);
  const addPokemonMutation = useAddPokemons();
  const getRandomMutation = useGetRandomPokemon();
  const { setInitialMutation } = useAuthClient();
  const router = useRouter()

  const addRandom = async (index: number) => {
    try {
      await getRandomMutation.mutateAsync(
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
          onError(error) {
            errorAlert(error.message)
          }
        }
      );
    } catch (error) {
      console.error("Error al añadir pokemon:", error);
    }
  };

  const handleContinueButton = async () => {
    try {
      playSound();
      await setInitialMutation.mutateAsync(undefined, {
        onError: (error) => {
          errorAlert(error.message);
          throw new Error();
        },
      });

      const pokemonsIds = pokemonsAdded.map((pokemon) => pokemon.id);
      await addPokemonMutation.mutateAsync(pokemonsIds, {
        onSuccess: (data) => {
          localStorage.setItem("initialPokemons" , "true" )
        },
        onError: (error) => {
          console.error("Error al agregar pokemons:", error);
          errorAlert(error.message);
          throw new Error();
        },
      });
      router.push('/')
    } catch (error) {
      console.log("Error al agregar pokemones random:", error);
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
                level={pokemon.level}
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
      <Button
        isDisabled={!pokemonsSelected}
        onClick={() => handleContinueButton()}
      >
        Ingresar
      </Button>
    </Flex>
  );
};
