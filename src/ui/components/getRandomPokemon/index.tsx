"use client";
import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import ash from "../../../../public/ash.png";
import { TypeAnimation } from "react-type-animation";
import { playSound, playTypeWriting } from "@/helpers/fx";
import { Selector } from "./selector";

type props = {
  username: string;
};

export const RandomPokemonSelector: FC<props> = ({ username }) => {
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const handleContinueClick = () => {
    playSound();
    setConfirmation(true);
  };

  useEffect(() => {
    playTypeWriting()
  } , [])

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="16px"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        w="80em"
        h="35em"
        p={6}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        position="relative"
      >
        {!confirmation ? (
          <>
            <Flex
              direction="column"
              mr="6em"
              h="40%"
              w="60%"
              alignItems="center"
              justifyContent="center"
            >
              <TypeAnimation
                sequence={[
                  `Bienvenido , ${username}. Antes de empezar, debes elegir tus primeros 3 pokemon. Mucha suerte!`,
                ]}
                speed={50}
                style={{ fontSize: "1em" }}
              />
              <Button mt="5em" w="20em" onClick={() => handleContinueClick()}>
                Vamos a ello
              </Button>
            </Flex>

            <Image
              style={{ position: "absolute", bottom: "0", right: "0" }}
              height="400"
              src={ash}
              alt="ash pokemon"
            />
          </>
        ) : (
          <Selector />
        )}
      </Flex>
    </Flex>
  );
};
