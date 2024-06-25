"use client";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Notifications } from "./notifications";
import { Pokedex } from "./pokedex";
import { IoNotificationsCircle } from "react-icons/io5";
import { playSound } from "@/helpers/fx";
import { useEffect, useState } from "react";
import { DeleteModal } from "@/ui/components/deleteModal";
import { useAuth } from "@/hooks/useAuth";
import { DecodeTokenData } from "@/types/auth";
import { Pokemon } from "@/types/models";
import { useGetUserPokemons } from "@/hooks/usePokemonClient";

export const ProfileRight = () => {
  const { getUserInfo } = useAuth();
  const [userPokemons, setUserPokemons] = useState<Pokemon[] | undefined>([]);
  const userInfo = getUserInfo() as DecodeTokenData;
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, refetch, isRefetching } = useGetUserPokemons(
    userInfo.id
  );

  const closeDeleteModal = () => {
    setIsOpen(false);
  };

  const openDeleteModal = () => {
    playSound();
    setIsOpen(true);
  };

  useEffect(() => {
    if (userInfo) {
      setUserPokemons(data);
    }
  }, [data, isLoading, isRefetching, userInfo]);

  return (
    <Flex
      w="75%"
      h="95%"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      gap="1em"
      marginLeft="3em"
    >
      <Flex
        w="100%"
        borderRadius="15px"
        h="70%"
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(2px)"
        alignItems="center"
        justifyContent="center"
        direction="column"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.18)"
      >
        <Flex
          alignItems="center"
          h="4em"
          justifyContent="space-between"
          bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
          w="100%"
        >
          <Text ml="3em">Tus pokémons</Text>
          <Button
            mr="4em"
            color="white"
            backgroundColor="red"
            cursor="pointer"
            width="7%"
            onClick={() => openDeleteModal()}
            fontSize="10px"
            _hover={{}}
          >
            Eliminar
          </Button>
        </Flex>
        {userPokemons && <Pokedex userPokemons={userPokemons} />}
      </Flex>
      <Flex
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(2px)"
        borderRadius="15px"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        direction="column"
        h="30%"
        w="100%"
        alignItems="center"
        justifyContent="flex-start"
        gap="1em"
      >
        <Flex
          alignItems="center"
          h="3em"
          bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
          w="100%"
        >
          <Text ml="3em">Tus notificaciones</Text>
          <IoNotificationsCircle color="black" size="40px" />
        </Flex>
        <Notifications />
      </Flex>
      {isOpen && userPokemons && (
        <DeleteModal
          refetch={refetch}
          closeDeleteModal={closeDeleteModal}
          userPokemons={userPokemons}
          isOpen={isOpen}
        />
      )}
    </Flex>
  );
};
