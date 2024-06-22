import { Flex } from "@chakra-ui/react"
import { Notifications } from "./notifications"
import { Pokedex } from "./pokedex"



export const HomeRight = () => {

    return (
        <Flex
        w="75%"
        h="90%"
        bg="rgba(255, 255, 255, 0.1)"
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        backdropFilter="blur(2px)"
        border="1px solid rgba(255, 255, 255, 0.18)"
        borderRadius="15px"
        marginLeft="3em"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      >
        <Pokedex/>
        <Notifications/>
        </Flex>
    )
}