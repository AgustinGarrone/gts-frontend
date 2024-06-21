import { Flex } from "@chakra-ui/react"
import bgImage from "../../../public/login_back5.jpg"

export const HomePage = () => {

    return (
        <Flex h="100vh" w="100vw" display="column" alignItems="center" justifyContent='center' backgroundImage={`url(${bgImage.src})`}>

        </Flex>
    )
}