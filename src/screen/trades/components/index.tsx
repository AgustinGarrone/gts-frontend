import { Flex, Text } from "@chakra-ui/react";
import { AvailableTrades } from "./availableTrades";
import { MyProposals } from "./myProposals";

export const TradesRight = () => {
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
        h="50%"
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(2px)"
        alignItems="center"
        justifyContent="flex-start"
        direction="column"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.18)"
      >
        <Flex
          alignItems="center"
          h="3em"
          bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
          w="100%"
        >
          <Text ml="3em">Trades disponibles</Text>
        </Flex>
        <AvailableTrades />
      </Flex>
      <Flex
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(2px)"
        borderRadius="15px"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        direction="column"
        h="50%"
        w="100%"
        alignItems="center"
        justifyContent="flex-start"
        gap="1em"
      >
        <Flex
          alignItems="center"
          h="3em"
          bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
          w="100%"
        >
          <Text ml="3em">Tus propuestas</Text>
        </Flex>
        <MyProposals />
      </Flex>
    </Flex>
  );
};
