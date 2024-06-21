import { Flex } from "@chakra-ui/react"
import bgImage from "../../../public/login_back5.jpg"
import { Navbar } from "@/ui/components/navbar"
import { RandomPokemonSelector } from "@/ui/components/getRandomPokemon"

export const HomePage = () => {

    return (
        <Flex direction="column" h="100vh" w="100vw" alignItems="center" justifyContent='flex-start' backgroundImage={`url(${bgImage.src})`}>
            <Navbar/>
            <RandomPokemonSelector username="Tormund"/>
        </Flex>
    )
}