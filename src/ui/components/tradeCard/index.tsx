"use client";
import { Pokemon } from "@/types/models";
import { Flex, Img } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { FC, useState } from "react";
import unknownIcon from "../../../../public/unknown.png";
import { PokemonModal } from "../pokemonModal";
import { playSound } from "@/helpers/fx";

type TradeCardProp = {
  pokemon1: Pokemon;
  pokemon2?: Pokemon;
};

export const TradeCard: FC<TradeCardProp> = ({ pokemon1, pokemon2 }) => {
  // Estado para manejar el Pokemon seleccionado
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPokemonDetail = (pokemon: Pokemon) => {
    playSound()
    setSelectedPokemon(pokemon);
    setIsOpen(true);
  };

  const closePokemonDetail = () => {
    playSound()
    setSelectedPokemon(null);
    setIsOpen(false);
  };
  return (
    <Flex
      w="30em"
      h="40%"
      borderRadius="50px"
      alignItems="center"
      justifyContent="space-around"
      bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
    >
      <Flex
        bgColor="white"
        alignItems="center"
        justifyContent="center"
        borderRadius="300px"
        onClick={() => openPokemonDetail(pokemon1)}
        width={{
          xl: "6em",
        }}
        cursor="pointer"
      >
        <Img
          src={pokemon1.image}
          alt={pokemon1.name}
          width="80%"
          height="100%"
          zIndex="2"
        />
      </Flex>
      <ArrowRightIcon />

      <Img
        src={unknownIcon.src}
        alt={pokemon1.name}
        width={{
          xl: "5em",
        }}
        cursor="pointer"
        zIndex="2"
        filter="drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))"
      />

      {selectedPokemon && isOpen && (
        <PokemonModal
          selectedPokemon={selectedPokemon}
          isOpen={isOpen}
          closePokemonDetail={closePokemonDetail}
        />
      )}
    </Flex>
  );
};
