"use client";
import { Trade } from "@/types/models";
import { TradeCard } from "@/ui/components/tradeCard";
import { Flex } from "@chakra-ui/react";
import { FC } from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { playSound } from "@/helpers/fx";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

type AvailableTradesProps = {
  availableTrades: Trade[];
  refetchAvailableTrades: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Trade[], unknown>>;
  refetchUserTrades: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Trade[], unknown>>;
};

export const AvailableTrades: FC<AvailableTradesProps> = ({
  availableTrades,
  refetchAvailableTrades,
  refetchUserTrades,
}) => {
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
          arrows: false,
        }}
        onMove={() => {
          playSound();
        }}
      >
        {availableTrades &&
          availableTrades.map((t) => {
            return (
              <SplideSlide
                key={t.id}
                style={{ marginTop: "1em", height: "100%", padding: 0 }}
              >
                <TradeCard
                  refetchUserTrades={refetchUserTrades}
                  refetchAvailableTrades={refetchAvailableTrades}
                  tradeState={t.state}
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
