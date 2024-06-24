import tradeClient from "@/clients/tradeClient";
import { CreateTradeDto, ProposeTradeDto, ResponseProposalDto } from "@/types/trade.dto";
import { Trade, TradeResponse } from "@/types/models";
import { ApiResponse } from "@/types/responses";
import { useMutation, useQuery } from "react-query";

export const useCreateTrade = () => {
  return useMutation<ApiResponse<Trade>, Error, CreateTradeDto>(
    async (createTradeData: CreateTradeDto) => {
      const response = await tradeClient.createTrade(createTradeData);
      return response;
    }
  );
};

export const useProposeTrade = () => {
  return useMutation<ApiResponse<boolean>, Error, ProposeTradeDto>(
    async (proposalData: ProposeTradeDto) => {
      const response = await tradeClient.proposeTrade(proposalData);
      return response;
    }
  );
};

export const useGetAvailableTrades = () => {
  return useQuery(["getAvailableTrades"], async () => {
    const response = await tradeClient.getAvailableTrades();
    return response.data;
  });
};

export const useResponseProposal = () => {
    return useMutation<ApiResponse<TradeResponse[]>, Error, ResponseProposalDto>(
      async (responseData) => {
        const response = await tradeClient.responseProposal(responseData);
        return response;
      }
    );
  };