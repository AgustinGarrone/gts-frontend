import { Flex } from "@chakra-ui/react";
import { Notifications } from "./notifications";
import { Pokedex } from "./pokedex";

export const HomeRight = () => {
  return (
    <Flex
      w="75%"
      h="95%"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      gap="1em"
      marginLeft="3em"
    >
      <Flex
        w="100%"
        borderRadius="15px"
        h="75%"
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(2px)"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.18)"
      >
        <Pokedex />
      </Flex>
      <Notifications />
    </Flex>
  );
};
