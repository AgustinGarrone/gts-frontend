import { Flex, Text } from "@chakra-ui/react";

export const Notifications = () => {
  return (
    <Flex
      w="100%"
      h="25%"
      borderRadius="15px"
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(2px)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      border="1px solid rgba(255, 255, 255, 0.18)"
    >
      <Text m="1em 0 0 3em">últimas notificaciones</Text>
    </Flex>
  );
};
