"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC, SetStateAction, useEffect, useState } from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Pokemon } from "@/types/models";
import { useGetUserPokemons } from "@/hooks/usePokemonClient";
import { playSound } from "@/helpers/fx";
import { PokemonCard } from "@/ui/components/pokemonCard";

type CreateTradeModalProps = {
  onCreate: (pokemonId: number) => Promise<void>;
  createTradeModal: boolean;
  userId: number;
  onClose: () => void;
};

export const CreateTradeModal: FC<CreateTradeModalProps> = ({
  onCreate,
  createTradeModal,
  userId,
  onClose,
}) => {
  const [userPokemons, setUserPokemons] = useState<Pokemon[]>();
  const [activePokemon, setActivePokemon] = useState<Pokemon>();

  const { data, isLoading, refetch, isRefetching } = useGetUserPokemons(userId);

  const handleActiveSlide = (splide) => {
    const activeIndex = splide.index;
    const pokemon = userPokemons![activeIndex];
    setActivePokemon(pokemon);
  };

  const handleOnCreate = () => {
    if (activePokemon) {
      onCreate(activePokemon.id);
    }
  };

  useEffect(() => {
    if (data) {
      setUserPokemons(data);
    }
  }, [data, isLoading, isRefetching]);

  return (
    <Modal isOpen={createTradeModal} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bgGradient="linear(to-b, #e6f7ff, #b3ecff)">
        <ModalHeader textAlign="center">
          ¿Qué pokémon deseas intercambiar?
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
            onMove={() => {
              playSound();
            }}
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
            onClick={() => handleOnCreate()}
          >
            Intercambiar
          </Button>
          <Button
            _hover={{}}
            bgColor="red"
            color="white"
            mr={3}
            onClick={onClose}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
