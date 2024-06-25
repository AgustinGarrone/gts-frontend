import { Flex, Text } from "@chakra-ui/react"
import { FC } from "react"

type NotificationProps = {
    id: number;
    userId: number;
    message: string;
  }
  
  export const NotificationCard: FC<NotificationProps> = ({ id, userId, message }) => {
    return (
      <Flex direction="column" ml="5em" h="100%" bgColor="darkblue" p="5px" borderRadius="15px" w="15em" alignItems="center" justifyContent="center">
        <Text color="white" textAlign="center" fontSize="xx-small">{message}</Text>
      </Flex>
    );
  };