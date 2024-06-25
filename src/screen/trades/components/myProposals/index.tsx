"use client";
import { useGetUserTrades } from "@/hooks/useTradeClient";
import { Trade } from "@/types/models";
import { TradeCard } from "@/ui/components/tradeCard";
import { Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { playSound } from "@/helpers/fx";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

type MyProposalsProps = {
  userTrades: Trade[];
  refetchUserTrades: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Trade[], unknown>>;
};

export const MyProposals: FC<MyProposalsProps> = ({
  userTrades,
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
          perMove: "1",
          width: "72vw",
          height: "25vh",
          arrows: false,
          gap: "3em",
        }}
        onMove={() => {
          playSound();
        }}
      >
        {userTrades &&
          userTrades.map((t) => {
            return (
              <SplideSlide
                key={t.id}
                style={{ marginTop: "1em", height: "100%", padding: 0 }}
              >
                <TradeCard
                  refetchUserTrades={refetchUserTrades}
                  tradeState={t.state}
                  user1Name={t.user1.username}
                  tradeId={t.id}
                  pokemon1={t.pokemon1}
                  user2Name={t.user2?.username}
                  pokemon2={t.pokemon2}
                />
              </SplideSlide>
            );
          })}
      </Splide>
    </Flex>
  );
};
