"use client";
import { useGetAvailableTrades } from "@/hooks/useTradeClient";
import { Trade } from "@/types/models";
import { TradeCard } from "@/ui/components/tradeCard";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { playSound } from "@/helpers/fx";

export const AvailableTrades = () => {
  const [availableTrades, setAvailableTrades] = useState<Trade[]>([]);
  const { data, isLoading, error, isRefetching } = useGetAvailableTrades();

  useEffect(() => {
    if (data) {
      setAvailableTrades(data);
    }
  }, [data, isLoading]);

  return (
    <Flex
      alignItems="center"
      h="100%"
      justifyContent="space-around"
      w="100%"
      gap="3em"
    >
      <Splide
        options={{
          perPage: 2,
          type: "slide",
          perMove: "2",
          width: "72vw",
          height: "20vh",
        }}
        onMove={() => {playSound()}}
      >
        {availableTrades &&
          availableTrades.map((t) => {
            return (
              <SplideSlide
                key={t.id}
                style={{ margin: "2em", height: "100%", padding: 0 }}
              >
                <TradeCard
                  user1Name={t.user1.username}
                  tradeId={t.id}
                  pokemon1={t.pokemon1}
                />
              </SplideSlide>
            );
          })}
      </Splide>
    </Flex>
  );
};
