import { Button, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"
import egg from "../../../../public/pokemonEgg.png"
import { useState } from "react"

export const Selector = () => {

    const [pokemonsSelected , setPokemonsSelected] = useState<boolean>(false)

    return (
        <Flex w="80%" alignItems="center" justifyContent="center" gap="4em" direction="column">
            <Text>Elige tus pokemon</Text>
           <Flex w="100%" alignItems="center" justifyContent="space-around">
           <Image style={{cursor:"pointer" }}  height={200} src={egg} alt="pokemon egg"/>
            <Image style={{cursor:"pointer" }}  height={200} src={egg} alt="pokemon egg"/>
            <Image style={{cursor:"pointer" }}  height={200} src={egg} alt="pokemon egg"/>
           </Flex>
           <Button isDisabled={!pokemonsSelected}>Ingresar</Button>
        </Flex>
    )
}