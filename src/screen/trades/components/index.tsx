"use client";
import { Button, Flex, Text } from "@chakra-ui/react";
import { AvailableTrades } from "./availableTrades";
import { MyProposals } from "./myProposals";
import { playSound, playSuccess } from "@/helpers/fx";
import { useEffect, useState } from "react";
import { Trade } from "@/types/models";
import {
  useCreateTrade,
  useGetAvailableTrades,
  useGetUserTrades,
} from "@/hooks/useTradeClient";
import { useAuth } from "@/hooks/useAuth";
import { DecodeTokenData } from "@/types/auth";
import { CreateTradeModal } from "./myProposals/components/createTradeModal";
import { errorAlert, successAlert } from "@/helpers/alerts";

export const TradesRight = () => {
  const { getUserInfo } = useAuth();
  const userInfo = getUserInfo() as DecodeTokenData;
  const [userTrades, setUserTrades] = useState<Trade[]>([]);
  const [createTradeModal, setCreateTradeModal] = useState(false);
  const {
    data: userTradesQuery,
    isLoading,
    refetch: refetchUserTrades,
    isRefetching,
  } = useGetUserTrades();
  const createTradeMutation = useCreateTrade();

  const [availableTrades, setAvailableTrades] = useState<Trade[]>([]);
  const {
    data: availableTradesQuery,
    isLoading: loadingAvailable,
    refetch: refetchAvailableTrades,
    isRefetching: refetchingAvailable,
  } = useGetAvailableTrades();

  const handleCreateTrade = () => {
    playSound();
    if (createTradeModal) {
      setCreateTradeModal(false);
    } else {
      setCreateTradeModal(true);
    }
  };

  const createTrade = async (pokemonId: number) => {
    if (pokemonId) {
      await createTradeMutation.mutateAsync(
        { userId: userInfo.id, pokemonId },
        {
          async onSuccess(data) {
            playSuccess();
            await refetchUserTrades();
            await refetchAvailableTrades();
            handleCreateTrade();
            successAlert("Intercambio creado.");
          },
          onError(error) {
            handleCreateTrade();
            errorAlert(error.message);
          },
        }
      );
    } else {
      errorAlert("Elige un pokemon a eliminar");
    }
  };

  useEffect(() => {
    if (availableTradesQuery) {
      setAvailableTrades(availableTradesQuery);
    }
  }, [availableTradesQuery, loadingAvailable, refetchingAvailable]);

  useEffect(() => {
    if (userTradesQuery) {
      setUserTrades(userTradesQuery);
    }
  }, [userTradesQuery, isLoading, isRefetching]);

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
        h="50%"
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(2px)"
        alignItems="center"
        justifyContent="flex-start"
        direction="column"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.18)"
      >
        <Flex
          alignItems="center"
          h="4em"
          bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
          w="100%"
        >
          <Text ml="3em">Intercambios disponibles</Text>
        </Flex>
        <AvailableTrades
          refetchAvailableTrades={refetchAvailableTrades}
          refetchUserTrades={refetchUserTrades}
          availableTrades={availableTrades}
        />
      </Flex>
      <Flex
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(2px)"
        borderRadius="15px"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        direction="column"
        h="50%"
        w="100%"
        alignItems="center"
        justifyContent="flex-start"
        gap="1em"
      >
        <Flex
          alignItems="center"
          h="4em"
          justifyContent="space-between"
          bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
          w="100%"
        >
          <Text ml="3em">Tus propuestas</Text>
          <Button
            mr="4em"
            color="white"
            backgroundColor="green"
            cursor="pointer"
            width="7%"
            onClick={() => handleCreateTrade()}
            fontSize="10px"
            _hover={{}}
          >
            Crear
          </Button>
        </Flex>
        <MyProposals
          refetchUserTrades={refetchUserTrades}
          userTrades={userTrades}
        />
        {createTradeModal && (
          <CreateTradeModal
            userId={userInfo.id}
            onCreate={createTrade}
            createTradeModal={createTradeModal}
            onClose={handleCreateTrade}
          />
        )}
      </Flex>
    </Flex>
  );
};
