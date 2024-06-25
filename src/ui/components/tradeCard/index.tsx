"use client";
import { Pokemon } from "@/types/models";
import { Flex, Img , Text } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { FC, useEffect, useState } from "react";
import unknownIcon from "../../../../public/unknown.png";
import { PokemonModal } from "../pokemonModal";
import { playSound } from "@/helpers/fx";
import { ProposalModal } from "../proposalModal";
import { useGetUserPokemons } from "@/hooks/usePokemonClient";
import { useAuth } from "@/hooks/useAuth";
import { DecodeTokenData } from "@/types/auth";

type TradeCardProp = {
  tradeId: number;
  pokemon1: Pokemon;
  pokemon2?: Pokemon;
  user1Name: string;
  user2Name?: string;
};

export const TradeCard: FC<TradeCardProp> = ({
  tradeId,
  user1Name,
  user2Name,
  pokemon1,
  pokemon2,
}) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openProposal, setOpenProposal] = useState(false);
  const { getUserInfo } = useAuth();
  const userInfo = getUserInfo() as DecodeTokenData;
  const [userPokemons, setUserPokemons] = useState<Pokemon[]>([]);
  const { data, isLoading, refetch, isRefetching } = useGetUserPokemons(
    userInfo.id
  );

  const openPokemonDetail = (pokemon: Pokemon) => {
    playSound();
    setSelectedPokemon(pokemon);
    setIsOpen(true);
  };

  const closePokemonDetail = () => {
    playSound();
    setSelectedPokemon(null);
    setIsOpen(false);
  };

  const handleProposeClick = () => {
    playSound();
    setOpenProposal(true);
  };

  const closeProposalModal = () => {
    playSound();
    setOpenProposal(false);
  };

  useEffect(() => {
    if (data && userInfo) {
      setUserPokemons(data);
    }
  }, [data, isLoading, isRefetching, userInfo]);

  return (
    <Flex
      w="30em"
      h="100%"
      borderRadius="50px"
      alignItems="center"
      justifyContent="space-around"
      bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
    >
      <Flex direction="column" alignItems="center" justifyContent="center" gap="1em">
        <Text fontSize="10px">{user1Name}</Text>
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
          height="80%"
          zIndex="2"
        />
      </Flex>
        </Flex>
      
      <ArrowRightIcon />

      <Flex direction="column" alignItems="center" justifyContent="center" gap="1em">
      <Text fontSize="10px">Ofrecer</Text>
      <Img
        src={unknownIcon.src}
        alt={pokemon1.name}
        width={{
          xl: "5em",
        }}
        height="80%"
        onClick={() => handleProposeClick()}
        cursor="pointer"
        zIndex="2"
        filter="drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))"
      />
</Flex>
      {selectedPokemon && isOpen && (
        <PokemonModal
          selectedPokemon={selectedPokemon}
          isOpen={isOpen}
          closePokemonDetail={closePokemonDetail}
        />
      )}
      {openProposal && (
        <ProposalModal
          refetch={refetch}
          tradeId={tradeId}
          wantedPokemonName={pokemon1.name}
          closeProposalModal={closeProposalModal}
          userPokemons={userPokemons}
          isOpen={openProposal}
        />
      )}
    </Flex>
  );
};
