import { ApiResponse } from "@/types/responses";
import RESTClient from "./RESTClient";
import { Trade, TradeResponse } from "@/types/models";
import {
  CreateTradeDto,
  ProposeTradeDto,
  ResponseProposalDto,
} from "@/types/trade.dto";
import axios from "axios";

class TradeClient extends RESTClient {
  private allowedDomain: string | undefined;

  constructor() {
    super();
    this.allowedDomain = "http://localhost:4000/";
  }

  async getAvailableTrades(): Promise<ApiResponse<Trade[]>> {
    try {
      const response = await this.axios.get(`trades`);
      return {
        data: response.data.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: error.response?.status || 500,
          message: error.response?.data.message,
        };
        throw apiResponse;
      } else {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: 500,
          message: "Error al obtener intercambios",
        };
        throw apiResponse;
      }
    }
  }

  async getUserTrades(): Promise<ApiResponse<Trade[]>> {
    try {
      const response = await this.axios.get("trades/user");
      return {
        data: response.data.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: error.response?.status || 500,
          message: error.response?.data.message,
        };
        throw apiResponse;
      } else {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: 500,
          message: "Error al obtener intercambios",
        };
        throw apiResponse;
      }
    }
  }

  async createTrade(
    createTradeData: CreateTradeDto
  ): Promise<ApiResponse<Trade>> {
    try {
      const { userId, pokemonId } = createTradeData;
      const response = await this.axios.post(`trades`, { userId, pokemonId });
      return {
        data: response.data.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: error.response?.status || 500,
          message: error.response?.data.message,
        };
        throw apiResponse;
      } else {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: 500,
          message: "Error al crear intercambios",
        };
        throw apiResponse;
      }
    }
  }

  async proposeTrade(
    proposalData: ProposeTradeDto
  ): Promise<ApiResponse<boolean>> {
    try {
      const { tradeId, pokemonId } = proposalData;
      const response = await this.axios.post(`trades/${tradeId}/propose`, {
        pokemonId,
      });
      return {
        data: response.data.data,
        statusCode: response.status,
        message: response.statusText,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: error.response?.status || 500,
          message: error.response?.data.message,
        };
        throw apiResponse;
      } else {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: 500,
          message: "Error al proponer intercambio",
        };
        throw apiResponse;
      }
    }
  }

  async responseProposal(
    responseData: ResponseProposalDto
  ): Promise<ApiResponse<TradeResponse[]>> {
    try {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: error.response?.status || 500,
          message: error.response?.data.message,
        };
        throw apiResponse;
      } else {
        const apiResponse: ApiResponse<{}> = {
          data: {},
          statusCode: 500,
          message: "Error al responder intercambio",
        };
        throw apiResponse;
      }
    }
  }
}

const tradeClient = new TradeClient();

export default tradeClient;
