"use client";
import { useGetAvailableTrades } from "@/hooks/useTradeClient";
import { Trade } from "@/types/models";
import { TradeCard } from "@/ui/components/tradeCard";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const AvailableTrades = () => {
  const [availableTrades, setAvailableTrades] = useState<Trade[]>([]);
  const { data, isLoading, error, isRefetching } = useGetAvailableTrades();

  useEffect(() => {
    if (data) {
      setAvailableTrades(data);
    }
  }, [data, isLoading]);

  return (
    <Flex alignItems="center" h="100%" justifyContent="space-around" w="100%" gap="3em">
      {availableTrades &&
        availableTrades.map((t) => {
          return <TradeCard key={t.id} user1Name={t.user1.username} tradeId={t.id} pokemon1={t.pokemon1} />;
        })}
    </Flex>
  );
};
