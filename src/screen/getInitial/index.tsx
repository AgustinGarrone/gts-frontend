import { RandomPokemonSelector } from "@/ui/components/getRandomPokemon"
import { MusicPlayerButton } from "@/ui/components/musicPlayer"
import { Flex } from "@chakra-ui/react"
import bgImage from "../../../public/login_back5.jpg"

export const GetInitialPokemonsPage = () => {

    return (
        <Flex direction="column" h="100vh" w="100vw" alignItems="center" justifyContent='flex-start' backgroundImage={`url(${bgImage.src})`}>
            <RandomPokemonSelector username="Tormund"/>
            <MusicPlayerButton/>
        </Flex>
    )
}