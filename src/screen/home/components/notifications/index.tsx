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
      h="25%"
      borderRadius="15px"
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(2px)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      border="1px solid rgba(255, 255, 255, 0.18)"
      alignItems="center"
    >
      <Flex
        bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
        h="100%"
        alignItems="center"
        justifyContent="flex-start"
      >
        <IoNotificationsCircle color="black" size="40px" />
      </Flex>

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
            ))}{" "}
            *
          </Splide>
        ) : (
          <Text mt="1em">No hay notificaciones disponibles.</Text>
        )}
      </Flex>
    </Flex>
  );
};
