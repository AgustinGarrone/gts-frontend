import notificationClient from "@/clients/notificationClient";
import { useQuery } from "react-query";

export const useGetUserNotifications = () => {
  return useQuery(["getUserPokemons"], async () => {
    const response = await notificationClient.getUserNotifications();
    return response.data;
  });
};
