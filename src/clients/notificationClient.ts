"use client";
import { ApiResponse } from "@/types/responses";
import RESTClient from "./RESTClient";
import { Notification } from "@/types/models";

class NotificationClient extends RESTClient {
  private allowedDomain: string | undefined;

  constructor() {
    super();
    this.allowedDomain = "http://localhost:4000/";
  }

  async getUserNotifications(): Promise<ApiResponse<Notification[]>> {
    const response = await this.axios.get(`notification`);
    return {
      data: response.data.data,
      statusCode: response.status,
      message: response.statusText,
    };
  }
}

const notificationClient = new NotificationClient();

export default notificationClient;
