"use client";
import { useGetUserNotifications } from "@/hooks/useNotificationClient";
import { Notification } from "@/types/models";
import { NotificationCard } from "@/ui/components/notificationCard";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { IoNotificationsCircle } from "react-icons/io5";

export const Notifications = () => {
  const [notifications, setNotifications] = useState<
    Notification[] | undefined
  >([]);
  const { data, isLoading, error, isRefetching } = useGetUserNotifications();

  useEffect(() => {
    console.log(data);
    setNotifications(data);
  }, [data]);

  return (
    <Flex
      w="100%"
      marginTop={{
        base: 0,
        "2xl": "1em",
      }}
      h="100%"
      direction="column"
    >
      <Flex cursor="pointer">
        {isLoading ? (
          <Text mt="1em">Cargando...</Text>
        ) : notifications && notifications.length > 0 ? (
          <Splide
            options={{
              perPage: 3,
              perMove: 1,
              gap: "3em",
              arrows: false,
              width: "70vw", // Ajusta la altura según tus necesidades
              type: "slide",
              height: "15vh",
            }}
          >
            {notifications.map((notification) => (
              <SplideSlide key={notification.id}>
                <NotificationCard
                  id={notification.id}
                  message={notification.message}
                  userId={notification.userId}
                />
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <Text mt="1em">No hay notificaciones disponibles.</Text>
        )}
      </Flex>
    </Flex>
  );
};
