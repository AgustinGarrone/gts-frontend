"use client";
import { checkLocalStorage } from "@/helpers/localStorage";
import axios, { AxiosInstance } from "axios";

export async function getAuthFromCache(): Promise<string | null> {
  if (checkLocalStorage()) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      return token;
    }
  }

  return null;
}

export default class RESTClient {
  protected axios: AxiosInstance;
  protected baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/";
    this.axios = axios.create({ baseURL: this.baseUrl });

    this.axios.interceptors.request.use(
      async (config) => {
        if (!config.headers) {
          throw new Error("Config is not defined");
        }

        const jwt = await getAuthFromCache();
        const allowedDomain = "http://localhost:4000/";
        if (jwt) config.headers["Authorization"] = `Bearer ${jwt}`;
        config.headers["X-Frame-Options"] = "SAMEORIGIN";
        config.headers["X-XSS-Protection"] = "1; mode=block";
        config.headers["X-Content-Type-Options"] = "nosniff";
        config.headers["Strict-Transport-Security"] =
          "max-age=31536000; includeSubDomains";
        config.headers[
          "Content-Security-Policy"
        ] = `default-src 'self' ${allowedDomain}`;

        return config;
      },
      (error) => {
        throw error;
      }
    );
  }
}
