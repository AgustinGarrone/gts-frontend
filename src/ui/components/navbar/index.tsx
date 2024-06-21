import { Flex } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <Flex
      w="100%"
      h="10%"
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(2px)"
      border="1px solid rgba(255, 255, 255, 0.18)"
      borderBottomLeftRadius="50px"
      borderBottomRightRadius="50px"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
    ></Flex>
  );
};
