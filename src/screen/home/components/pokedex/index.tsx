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
  //TODO: fix
  const { data, isLoading, error, isRefetching } = useGetUserPokemons(
    userInfo?.id
  );

  useEffect(() => {
    if (userInfo) {
        setUserPokemons(data);
    console.log(data);
    }
  }, [data, isLoading, isRefetching , userInfo]);

  return (
    <Flex w="80%" gap="3em" h="70%" wrap="wrap" cursor="pointer" direction="column">
      <Text mt="2em">Tus pokémons</Text>
      <Splide
        options={{
          perPage: 3,
          width: "100%",
          gap:"3em",
        }}
      >
        {userPokemons &&
          userPokemons.map((pokemon) => {
            return (
              <SplideSlide key={pokemon.id}>
                <PokemonCard
                  name={pokemon.name}
                  level={pokemon.level}
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
