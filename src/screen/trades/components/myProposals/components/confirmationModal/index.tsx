import React, { Dispatch, FC, SetStateAction } from "react";
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { TradeResponse } from "@/types/models";

type ConfirmationModalProps = {
  message: string;
  onResponse: (tradeResponse: TradeResponse) => Promise<void>;
  onClose: Dispatch<SetStateAction<boolean>>;
  tradeResponse: TradeResponse;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  message,
  onResponse,
  onClose,
  tradeResponse,
}) => {
  return (
    <Modal isOpen={true} onClose={() => onClose(false)} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmación</ModalHeader>
        <ModalBody>
          <Flex justify="center">
            <p>{message}</p>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => onResponse(tradeResponse)}
          >
            Confirmar
          </Button>
          <Button variant="ghost" onClick={() => onClose(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
