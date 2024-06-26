"use client";
import { Button, Flex, Img, Text } from "@chakra-ui/react";
import trainerPicture from "../../../../public/pokeball.png";
import Image from "next/image";
import { playSound } from "@/helpers/fx";
import { useAuth } from "@/hooks/useAuth";
import { DecodeTokenData } from "@/types/auth";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

enum Routes {
  TRADES = "TRADES",
  PERFIL = "PERFIL",
}

export const Navbar = () => {
  const { getUserInfo, logout } = useAuth();
  const router = useRouter();
  const userInfo = getUserInfo() as DecodeTokenData;
  const currentPath = usePathname();
  const [activePath, setActivePath] = useState(Routes.PERFIL);

  const handleNavigation = (page: Routes) => {
    if (page === Routes.PERFIL) {
      playSound();
      router.push("/");
    } else if (page === Routes.TRADES) {
      playSound();
      router.push("/trades");
    }
  };

  const checkActiveButton = (buttonRoute: Routes) => {
    if (activePath === buttonRoute) {
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    playSound();
    logout();
  };

  useEffect(() => {
    if (currentPath === "/") {
      setActivePath(Routes.PERFIL);
    } else if (currentPath === "/trades") {
      setActivePath(Routes.TRADES);
    }
  }, [currentPath]);

  return (
    <Flex
      w="20%"
      h="100%"
      bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      backdropFilter="blur(2px)"
      border="1px solid rgba(255, 255, 255, 0.18)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
    >
      <Flex
        direction="column"
        mt="4em"
        gap={"1em"}
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Image
          src={trainerPicture}
          alt="ash"
          height={"150"}
          style={{ borderRadius: "30px", cursor: "pointer" }}
        />
        {userInfo && <Text>{userInfo.username}</Text>}
      </Flex>
      <Flex
        direction="column"
        w="100%"
        mt="4em"
        gap={"1em"}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          color="deepskyblue"
          backgroundColor="HighlightText"
          cursor="pointer"
          width="70%"
          isActive={checkActiveButton(Routes.PERFIL)}
          onClick={() => handleNavigation(Routes.PERFIL)}
        >
          Perfil
        </Button>
        <Button
          color="deepskyblue"
          backgroundColor="HighlightText"
          cursor="pointer"
          width="70%"
          onClick={() => handleNavigation(Routes.TRADES)}
          isActive={checkActiveButton(Routes.TRADES)}
        >
          Trades
        </Button>
      </Flex>
      <Button
        color="white"
        backgroundColor="ThreeDDarkShadow"
        width="70%"
        cursor="pointer"
        position="absolute"
        bottom="100"
        fontSize="small"
        onClick={() => handleLogout()}
        _hover={{}}
      >
        Cerrar sesión
      </Button>
    </Flex>
  );
};
