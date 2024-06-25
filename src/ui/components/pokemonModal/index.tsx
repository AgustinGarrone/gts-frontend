import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { PokemonCard } from "../pokemonCard";
import { FC } from "react";
import { Pokemon } from "@/types/models";

type ModalProps = {
  selectedPokemon: Pokemon;
  isOpen: boolean;
  closePokemonDetail: () => void;
};

export const PokemonModal: FC<ModalProps> = ({
  selectedPokemon,
  isOpen,
  closePokemonDetail,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closePokemonDetail} size="xs">
      <ModalOverlay />
      <ModalContent bgGradient="linear(to-b, #e6f7ff, #b3ecff)">
        <ModalHeader textAlign="center">
          Detalles de {selectedPokemon.name}
        </ModalHeader>
        <ModalBody
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          {selectedPokemon && (
            <PokemonCard
              name={selectedPokemon.name}
              level={selectedPokemon.level}
              image={selectedPokemon.image}
              abilities={selectedPokemon.abilities!}
              id={selectedPokemon.id}
              types={selectedPokemon.types!}
            />
          )}
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center">
          <Button _hover={{}} bgColor="black" color="white" mr={3} onClick={closePokemonDetail}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
