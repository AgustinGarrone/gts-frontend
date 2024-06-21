import { typeColors } from "@/types/constants";
import { Ability, Type } from "@/types/models";
import { Flex, Img, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";

type CardProps = {
  name: string;
  image: string;
  id: number;
  abilities: Ability[];
  types: Type[];
};

export const PokemonCard: FC<CardProps> = ({
  name,
  image,
  id,
  abilities,
  types,
}) => {
  const cardBackgroundColor = types.length > 0 ? typeColors[types[0].name.toLowerCase()] : '#FFFFFF';

  return (
    <Flex
      h="20em"
      w="15em"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      boxShadow="lg"
      borderRadius="md"
      borderWidth="2px"
      borderColor="gray.200"
      //bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
      position="relative"
      bg={cardBackgroundColor}
      p={4}
    >
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {name}
      </Text>
      <Img src={image} alt={name} width="80%" height="auto" />
      <Stack mt={4} spacing={1} align="center">
        <Text>
          <strong>Habilidades:</strong>
        </Text>
        <Text>
          <strong>Tipos:</strong>
        </Text>
        <Flex h="3em" w="20%" borderRadius="20px" bgColor="red" top="-5" position="absolute">
          <Text>Nivel:</Text>
        </Flex>
      </Stack>
    </Flex>
  );
};
