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
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { playSound, playSuccess } from "@/helpers/fx";
import { PokemonCard } from "../pokemonCard";
import { useDeletePokemon } from "@/hooks/usePokemonClient";
import { errorAlert, successAlert } from "@/helpers/alerts";

type ProposalModalProps = {
  closeDeleteModal: () => void;
  isOpen: boolean;
  userPokemons: Pokemon[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Pokemon[], unknown>>;
};

export const DeleteModal: FC<ProposalModalProps> = ({
  closeDeleteModal,
  isOpen,
  userPokemons,
  refetch,
}) => {
  const [activePokemon, setActivePokemon] = useState<Pokemon>();
  const deleteMutation = useDeletePokemon();

  const handleActiveSlide = (splide : any) => {
    const activeIndex = splide.index;
    const pokemon = userPokemons![activeIndex];
    setActivePokemon(pokemon);
  };

  const deletePokemon = async () => {
    if (activePokemon) {
      await deleteMutation.mutateAsync(activePokemon.id, {
        async onSuccess(data) {
          closeDeleteModal();
          await refetch();
          successAlert("Pokémon eliminado con éxito");
          playSuccess();
        },
        onError(error) {
          closeDeleteModal();
          errorAlert(error.message);
        },
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeDeleteModal} size="xl">
      <ModalOverlay />
      <ModalContent bgGradient="linear(to-b, #e6f7ff, #b3ecff)">
        <ModalHeader textAlign="center">
          ¿Qué pokémon deseas eliminar?
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
            onActive={(e: any) => handleActiveSlide(e)}
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
            onClick={deletePokemon}
          >
            Eliminar
          </Button>
          <Button
            _hover={{}}
            bgColor="red"
            color="white"
            mr={3}
            onClick={closeDeleteModal}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
