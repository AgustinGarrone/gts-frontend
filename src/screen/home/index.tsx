import { Flex } from "@chakra-ui/react"
import bgImage from "../../../public/login_back5.jpg"
import { Navbar } from "@/ui/components/navbar"
import { HomeRight } from "./components"

export const HomePage = () => {

    return (
        <Flex h="100vh" w="100vw" alignItems="center" justifyContent='flex-start' backgroundImage={`url(${bgImage.src})`}>
            <Navbar/>
            <HomeRight/>
        </Flex>
    )
}