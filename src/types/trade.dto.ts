import { TradeResponse } from "./models";

export type CreateTradeDto = {
  userId: number;
  pokemonId: number;
};

export type ProposeTradeDto = {
  tradeId: number;
  pokemonId: number;
};

export type ResponseProposalDto = {
  tradeId: number;
  tradeResponse: TradeResponse;
};
