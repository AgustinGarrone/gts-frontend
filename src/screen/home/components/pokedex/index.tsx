"use client";
import { useAuth } from "@/hooks/useAuth";
import { useGetUserPokemons } from "@/hooks/usePokemonClient";
import { DecodeTokenData } from "@/types/auth";
import { Pokemon } from "@/types/models";
import { PokemonCard } from "@/ui/components/pokemonCard";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export const Pokedex = () => {
  const { getUserInfo } = useAuth();
  const [userPokemons, setUserPokemons] = useState<Pokemon[] | undefined>([]);
  const userInfo = getUserInfo() as DecodeTokenData | null;
  const { data, isLoading, error, isRefetching } = useGetUserPokemons(
    userInfo!.id
  );

  useEffect(() => {
    setUserPokemons(data);
    console.log(data);
  }, [data, isLoading, isRefetching]);

  return (
    <Flex w="80%" h="70%" wrap="wrap">
      <Text>Tus pokémons</Text>
      <Splide
        options={{
          perPage: 4,
          width: "100%",
        }}
      >
        {userPokemons &&
          userPokemons.map((pokemon) => {
            return (
              <SplideSlide key={pokemon.id}>
                <PokemonCard
                  name={pokemon.name}
                  image={pokemon.image}
                  abilities={pokemon.abilities!}
                  id={pokemon.id}
                  types={pokemon.types!}
                />
              </SplideSlide>
            );
          })}
      </Splide>
    </Flex>
  );
};
