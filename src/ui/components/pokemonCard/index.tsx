import { typeColors } from "@/types/constants";
import { Ability, Type } from "@/types/models";
import { Box, Flex, Img, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import bg from "../../../../public/pokemon_bg2.jpg";

type CardProps = {
  name: string;
  image: string;
  id: number;
  level: number;
  abilities: Ability[];
  types: Type[];
};

export const PokemonCard: FC<CardProps> = ({
  name,
  image,
  id,
  level,
  abilities,
  types,
}) => {
  const cardBackgroundColor =
    types.length > 0 ? typeColors[types[0].name.toLowerCase()] : "#FFFFFF";

  const renderPokemonType = (types: Type[]) => {
    const imgs = types.map((type, index) => {
      return  <Img
      key={index}
      src={`/icons/${type.name.toLowerCase()}.svg`}
      alt={types[0].name}
      width="25px"
      height="25px"
      zIndex="2"
      filter="drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))"
    />
    })
    return (
      <Flex gap="1em">
        {imgs}  
      </Flex>
    )
   } 

  return (
    <Flex
      h="19em"
      w="12em"
      borderRadius="md"
      borderWidth="2px"
      direction="column"
      borderColor="gray.200"
      bgColor="white"
      zIndex="100"
      alignItems="start"
      justifyContent="center"
    >
      <Flex alignItems="center" w="100%" justifyContent="space-around">
        <span style={{ marginLeft: "1em" }}>{level}</span>
       {
        renderPokemonType(types)
       }
      </Flex>
      <Flex
        h="16em"
        borderTop="2px solid white"
        w="100%"
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        boxShadow="lg"
        //bgGradient="linear(to-b, #e6f7ff, #b3ecff)"
        bgGradient={cardBackgroundColor}
        p={4}
      >
        <Text fontSize="medium" fontWeight="bold" mb={2}>
          {name}
        </Text>
        <Flex
          backgroundImage={`url(${bg.src})`}
          alignItems="center"
          justifyContent="center"
          backgroundSize="cover"
          zIndex="1"
          mt="1em"
          height="10em"
        >
          <Img
            src={image}
            alt={name}
            width="80%"
            height="100%"
            zIndex="2"
            filter="drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))"
          />
        </Flex>
        <Stack mt="1em" spacing={1} align="center">
          {/* <Text fontSize="small">
          <strong>Habilidades:</strong>
        </Text> */}
          {abilities.map((a) => {
            return (
              <Text fontSize="x-small" key={a.id}>
                {a.name}
              </Text>
            );
          })}
          {/*  <Text>
          <strong>Tipos:</strong>
        </Text>
        {
          types.map((t) => {
            return <Text key={t.id}>{t.name}</Text>
          })
        }
        <Flex h="3em" w="20%" borderRadius="20px" bgColor="red" top="-5" position="absolute">
          <Text>Nivel:</Text>
        </Flex> */}
        </Stack>
      </Flex>
    </Flex>
  );
};
