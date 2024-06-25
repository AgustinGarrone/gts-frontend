import { useAuth } from "@/hooks/useAuth";
import { useGetUserPokemons } from "@/hooks/usePokemonClient";
import { DecodeTokenData } from "@/types/auth";
import { Pokemon } from "@/types/models";
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
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useProposeTrade } from "@/hooks/useTradeClient";
import { errorAlert, successAlert } from "@/helpers/alerts";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";
import { AxiosError } from "axios";
import { playSound } from "@/helpers/fx";

type ProposalModalProps = {
  closeProposalModal: () => void;
  isOpen: boolean;
  wantedPokemonName: string;
  tradeId: number
  userPokemons: Pokemon[]
  refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<Pokemon[], unknown>>
};

export const ProposalModal: FC<ProposalModalProps> = ({
  closeProposalModal,
  isOpen,
  wantedPokemonName,
  tradeId,
  userPokemons,
  refetch
}) => {
  const proposeMutation = useProposeTrade()
  const [activePokemon, setActivePokemon] = useState<Pokemon>();

  //TODO: fix

  const handleActiveSlide = (splide) => {
    const activeIndex = splide.index;
    const pokemon = userPokemons![activeIndex];
    console.log(pokemon);
    setActivePokemon(pokemon);
  };

  const confirmProposal = async () => {
    if (activePokemon) {
      await proposeMutation.mutateAsync({
        tradeId: tradeId , pokemonId: activePokemon.id
      }, {
        onSuccess: (data) => {
          closeProposalModal()
          successAlert("Intercambio ofrecido con éxito")
          refetch()
        },
        onError: (error) => {
          console.error("Error al agregar pokemons:", error);
          closeProposalModal()
          errorAlert(error.response ? error.response.data.message : "Error al ofrecer pokémon");
        },
      });
    } else {
      errorAlert("Debes elegir un pokémon antes")
    }
  }



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
              gap: "3em",
              width: "15em",
              height: "43vh",
            }}
            onMove={() => {playSound()}}
            onActive={(e) => handleActiveSlide(e)}
          >
            {userPokemons &&
              userPokemons.map((p) => {
                return (
                  <SplideSlide
                    key={p.id}
                    style={{ margin: "2em", height: "90%", padding: 0 }}
                  >
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
