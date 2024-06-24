import { Flex } from "@chakra-ui/react"
import bgImage from "../../../public/login_back5.jpg"
import { Navbar } from "@/ui/components/navbar"
import { ProfileRight } from "./components"

export const ProfilePage = () => {

    return (
        <Flex h="100vh" w="100vw" alignItems="center" justifyContent='flex-start' backgroundImage={`url(${bgImage.src})`}>
            <Navbar/>
            <ProfileRight/>
        </Flex>
    )
}