import { Pokemon, Trade } from "@/types/models";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { PokemonCard } from "../pokemonCard";
import { useProposeTrade } from "@/hooks/useTradeClient";
import { errorAlert, successAlert } from "@/helpers/alerts";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { playSound } from "@/helpers/fx";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

type ProposalModalProps = {
  closeProposalModal: () => void;
  isOpen: boolean;
  wantedPokemonName: string;
  tradeId: number;
  userPokemons: Pokemon[];
  refetchPokemons: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Pokemon[], unknown>>;
  refetchAvailableTrades: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Trade[], unknown>>;
  refetchUserTrades: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Trade[], unknown>>;
};

export const ProposalModal: FC<ProposalModalProps> = ({
  closeProposalModal,
  isOpen,
  wantedPokemonName,
  tradeId,
  userPokemons,
  refetchPokemons,
  refetchAvailableTrades,
  refetchUserTrades,
}) => {
  const proposeMutation = useProposeTrade();
  const [activePokemon, setActivePokemon] = useState<Pokemon>();

  const handleActiveSlide = (splide) => {
    const activeIndex = splide.index;
    const pokemon = userPokemons![activeIndex];
    setActivePokemon(pokemon);
  };

  const confirmProposal = async () => {
    if (activePokemon) {
      await proposeMutation.mutateAsync(
        {
          tradeId: tradeId,
          pokemonId: activePokemon.id,
        },
        {
          onSuccess: async (data) => {
            closeProposalModal();
            successAlert("Intercambio ofrecido con éxito");
            await refetchPokemons();
            await refetchAvailableTrades();
            await refetchUserTrades();
          },
          onError: (error) => {
            closeProposalModal();
            errorAlert(error.message);
          },
        }
      );
    } else {
      errorAlert("Debes elegir un pokémon antes");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeProposalModal} size="xl">
      <ModalOverlay />
      <ModalContent bgGradient="linear(to-b, #e6f7ff, #b3ecff)">
        <ModalHeader textAlign="center">
          ¿Que pokémon ofreces a cambio de {wantedPokemonName}?
        </ModalHeader>
        <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Splide
            options={{
              perPage: 1,
              type: "slide",
              perMove: "1",
              width: "16em",
              height: "43vh",
              pagination: false,
            }}
            onMove={() => {
              playSound();
            }}
            onActive={(e) => handleActiveSlide(e)}
          >
            {userPokemons &&
              userPokemons.map((p) => {
                return (
                  <SplideSlide key={p.id} style={{ height: "90%", padding: 0 }}>
                    <PokemonCard
                      name={p.name}
                      level={p.level}
                      image={p.image}
                      abilities={p.abilities!}
                      id={p.id}
                      types={p.types!}
                    />
                  </SplideSlide>
                );
              })}
          </Splide>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center">
          <Button
            _hover={{}}
            bgColor="green"
            color="white"
            mr={3}
            onClick={confirmProposal}
          >
            Ofrecer
          </Button>
          <Button
            _hover={{}}
            bgColor="red"
            color="white"
            mr={3}
            onClick={closeProposalModal}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
