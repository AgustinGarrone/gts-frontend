"use client";
import { Pokemon } from "@/types/models";
import { PokemonCard } from "@/ui/components/pokemonCard";
import { Flex } from "@chakra-ui/react";
import { FC } from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { playSound } from "@/helpers/fx";

type PokedexProps = {
  userPokemons: Pokemon[];
};

export const Pokedex: FC<PokedexProps> = ({ userPokemons }) => {
  return (
    <Flex
      w="90%"
      h="100%"
      justifyContent="center"
      wrap="wrap"
      cursor="pointer"
      direction="column"
    >
      <Splide
        options={{
          perPage: 3,
          type: "slide",
          perMove: "1",
          gap: "2em",
          width: "72vw",
          height: "43vh",
          arrows: false,
        }}
        onMove={() => {
          playSound();
        }}
      >
        {userPokemons &&
          userPokemons.map((pokemon) => (
            <SplideSlide
              key={pokemon.id}
              style={{ margin: "2em", height: "90%", padding: 0 }}
            >
              <PokemonCard
                name={pokemon.name}
                level={pokemon.level}
                image={pokemon.image}
                abilities={pokemon.abilities!}
                id={pokemon.id}
                types={pokemon.types!}
              />
            </SplideSlide>
          ))}
      </Splide>
    </Flex>
  );
};
