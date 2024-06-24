import { Navbar } from "@/ui/components/navbar";
import { Flex } from "@chakra-ui/react";
import { TradesRight } from "./components";
import bgImage from "../../../public/login_back5.jpg";

export const TradesPage = () => {
  return (
    <Flex>
      <Flex
        h="100vh"
        w="100vw"
        alignItems="center"
        justifyContent="flex-start"
        backgroundImage={`url(${bgImage.src})`}
      >
        <Navbar />
        <TradesRight />
      </Flex>
    </Flex>
  );
};
