"use client";
import { Pokemon, Trade, TradeResponse, TradeState } from "@/types/models";
import { Flex, Img, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { PokemonModal } from "../pokemonModal";
import { playSound, playSuccess } from "@/helpers/fx";
import { ProposalModal } from "../proposalModal";
import { useGetUserPokemons } from "@/hooks/usePokemonClient";
import { useAuth } from "@/hooks/useAuth";
import { DecodeTokenData } from "@/types/auth";
import { FaExchangeAlt } from "react-icons/fa";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GiSelect } from "react-icons/gi";
import ConfirmationModal from "@/screen/trades/components/myProposals/components/confirmationModal";
import { useResponseProposal } from "@/hooks/useTradeClient";
import { errorAlert, successAlert } from "@/helpers/alerts";

type TradeCardProp = {
  tradeId: number;
  pokemon1: Pokemon;
  pokemon2?: Pokemon;
  user1Name: string;
  user2Name?: string;
  tradeState: TradeState;
  refetchAvailableTrades?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Trade[], unknown>>;
  refetchUserTrades: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Trade[], unknown>>;
};

export const TradeCard: FC<TradeCardProp> = ({
  tradeId,
  user1Name,
  user2Name,
  pokemon1,
  pokemon2,
  tradeState,
  refetchAvailableTrades,
  refetchUserTrades,
}) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openProposal, setOpenProposal] = useState(false);
  const [openResponseModal, setOpenResponseModal] = useState(false);
  const [responseProposal, setResponseProposal] = useState<TradeResponse>();
  const { getUserInfo } = useAuth();
  const userInfo = getUserInfo() as DecodeTokenData;
  const [userPokemons, setUserPokemons] = useState<Pokemon[]>([]);
  const responseProposalMutation = useResponseProposal();

  const { data, isLoading, refetch, isRefetching } = useGetUserPokemons(
    userInfo.id
  );

  const renderTradeState = () => {
    if (tradeState === TradeState.PENDING) {
      return "Pendiente";
    } else if (
      tradeState === TradeState.PROPOSED &&
      user1Name === userInfo.username
    ) {
      return "Propuesta recibida";
    } else if (tradeState === TradeState.PROPOSED) {
      return "Propuesta realizada";
    } else {
      return "Intercambio completo!";
    }
  };

  const renderOwnerName = (username: string) => {
    if (username === userInfo.username) {
      return "Tú propuesta";
    } else if (!username && user1Name === userInfo.username) {
      return "Esperando..";
    } else if (!username) {
      return "Ofrecer";
    }
    return username;
  };

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
    if (user1Name !== userInfo.username) {
      playSound();
      setOpenProposal(true);
    }
  };

  const closeProposalModal = () => {
    playSound();
    setOpenProposal(false);
  };

  const handleResponseAction = (response: TradeResponse) => {
    playSound();
    setResponseProposal(response);
    setOpenResponseModal(true);
  };

  const handleResponseProposal = async (tradeResponse: TradeResponse) => {
    await responseProposalMutation.mutateAsync(
      { tradeId, tradeResponse },
      {
        onSuccess: async (data) => {
          if (refetchAvailableTrades) {
            await refetchAvailableTrades();
          }
          await refetchUserTrades();
          setOpenResponseModal(false);
          playSuccess();
          successAlert("Intercambio respondido con éxito");
        },
        onError: (error) => {
          errorAlert(error.message);
        },
      }
    );
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
      justifyContent="center"
      bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
      direction="column"
    >
      {pokemon1 && pokemon2 && <Text color="black">{renderTradeState()}</Text>}
      <Flex w="100%" h="90%" alignItems="center" justifyContent="space-around">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap="1em"
          width="40%"
        >
          <Text fontSize="10px">{renderOwnerName(user1Name)}</Text>
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

        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
          w="20%"
        >
          <FaExchangeAlt style={{ height: "30%", width: "100%" }} />
          {user1Name === userInfo.username &&
            tradeState === TradeState.PROPOSED && (
              <Flex h="50%" w="100%">
                <AiOutlineCheckCircle
                  onClick={() => handleResponseAction(TradeResponse.CONFIRM)}
                  style={{ width: "70%", height: "80%", cursor: "pointer" }}
                />
                <AiOutlineCloseCircle
                  onClick={() => handleResponseAction(TradeResponse.REJECT)}
                  style={{ width: "70%", height: "80%", cursor: "pointer" }}
                />
              </Flex>
            )}
        </Flex>

        <Flex
          direction="column"
          alignItems="center"
          w="40%"
          justifyContent="center"
          gap="1em"
        >
          <Text fontSize="10px">{renderOwnerName(user2Name!)}</Text>
          {pokemon2 ? (
            <Flex
              bgColor="white"
              alignItems="center"
              justifyContent="center"
              borderRadius="300px"
              onClick={() => openPokemonDetail(pokemon2)}
              cursor="pointer"
            >
              <Img
                src={pokemon2.image}
                alt={pokemon2.name}
                width="80%"
                height="80%"
                zIndex="2"
              />
            </Flex>
          ) : (
            <GiSelect
              onClick={() => handleProposeClick()}
              style={{
                cursor: "pointer",
                width: "40%",
                height: "80%",
                color: "gray",
              }}
            />
          )}
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
            refetchPokemons={refetch}
            refetchAvailableTrades={refetchAvailableTrades!}
            refetchUserTrades={refetchUserTrades}
            tradeId={tradeId}
            wantedPokemonName={pokemon1.name}
            closeProposalModal={closeProposalModal}
            userPokemons={userPokemons}
            isOpen={openProposal}
          />
        )}
        {openResponseModal && pokemon2 && responseProposal && (
          <ConfirmationModal
            onClose={setOpenResponseModal}
            message={`Estás seguro que deseas ${
              responseProposal === TradeResponse.CONFIRM
                ? "confirmar"
                : "rechazar"
            } el intercambio de ${pokemon1.name} por ${pokemon2.name} ?`}
            onResponse={handleResponseProposal}
            tradeResponse={responseProposal}
          />
        )}
      </Flex>
    </Flex>
  );
};
