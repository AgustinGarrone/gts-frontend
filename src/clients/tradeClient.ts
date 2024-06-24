import { ApiResponse } from "@/types/responses";
import RESTClient from "./RESTClient";
import { Trade, TradeResponse } from "@/types/models";
import {
  CreateTradeDto,
  ProposeTradeDto,
  ResponseProposalDto,
} from "@/types/trade.dto";

class TradeClient extends RESTClient {
  private allowedDomain: string | undefined;

  constructor() {
    super();
    this.allowedDomain = "http://localhost:4000/";
  }

  async getAvailableTrades(): Promise<ApiResponse<Trade[]>> {
    const response = await this.axios.get(`trades`);
    return {
      data: response.data.data,
      statusCode: response.status,
      message: response.statusText,
    };
  }

  async createTrade(
    createTradeData: CreateTradeDto
  ): Promise<ApiResponse<Trade>> {
    const { userId, pokemonId } = createTradeData;
    const response = await this.axios.post(`trades`, { userId, pokemonId });
    return {
      data: response.data.data,
      statusCode: response.status,
      message: response.statusText,
    };
  }

  async proposeTrade(
    proposalData: ProposeTradeDto
  ): Promise<ApiResponse<boolean>> {
    const { tradeId, pokemonId } = proposalData;
    const response = await this.axios.post(`trades/${tradeId}/propose`, {
      pokemonId,
    });
    return {
      data: response.data.data,
      statusCode: response.status,
      message: response.statusText,
    };
  }

  async responseProposal(
    responseData: ResponseProposalDto
  ): Promise<ApiResponse<TradeResponse[]>> {
    const { tradeId, tradeResponse } = responseData;
    const response = await this.axios.post(
      `trades/${tradeId}/responseProposal`,
      { tradeResponse }
    );
    return {
      data: response.data.data,
      statusCode: response.status,
      message: response.statusText,
    };
  }
}

const tradeClient = new TradeClient();

export default tradeClient;
