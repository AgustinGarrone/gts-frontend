import { Button, Flex, Img, Text } from "@chakra-ui/react";
import trainerPicture from "../../../../public/pokeball.png"
import Image from "next/image";
import pokedex from "../../../../public/pokedex_icon.png"

export const Navbar = () => {
  return (
    <Flex
      w="20%"
      h="100%"
      //bg="rgba(255, 255, 255, 0.1)"
      bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      backdropFilter="blur(2px)"
      border="1px solid rgba(255, 255, 255, 0.18)"
      borderBottomLeftRadius="50px"
      borderBottomRightRadius="50px"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
    >
     <Flex direction="column" mt="4em" gap={"1em"} alignItems="center" justifyContent="center">
     <Image src={trainerPicture} alt="ash" height={"150"} style={{borderRadius:"30px" , cursor:"pointer"}}/>
     <Text>Perfil</Text>
     </Flex>
     <Flex direction="column" mt="4em" gap={"1em"} alignItems="center" justifyContent="center">
      <Button color="deepskyblue" backgroundColor="HighlightText" width="20em" cursor="pointer"><Image src={pokedex} height={30} style={{marginRight:"2em"}} alt="pokedex"/>Perfil</Button>
      <Button color="deepskyblue" backgroundColor="HighlightText" width="20em" cursor="pointer">Trades</Button>
      </Flex>
    </Flex>
  );
};
