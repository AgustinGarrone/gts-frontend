import { useAuthClient } from "@/hooks/useAuthClient";
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Alert,
  AlertIcon,
  Link,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FormMode } from "..";
import { z } from "zod";
import { loginSchema } from "./form.schemas";
import { errorAlert } from "@/helpers/alerts";
import { playSound } from "@/helpers/fx";

type LoginFormProps = {
  changeMode: Dispatch<SetStateAction<FormMode>>;
};

export const LoginForm: FC<LoginFormProps> = ({ changeMode }) => {
  const { loginMutation } = useAuthClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    playSound()
    try {
      const formData = { email, password };
      loginSchema.parse(formData);
      setError(null);

      await loginMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          localStorage.setItem("accessToken", data.user.token);
          window.location.href = "/";
        },
        onError: (error) => {
          console.error("Error al iniciar sesión:", error);
          errorAlert(`error al registrar`);
          throw new Error(error.message);
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        console.error("Error al iniciar sesión:", error);
      }
    }
  };

  return (
    <Flex
      w="30%"
      h="50em"
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(2px)"
      border="1px solid rgba(255, 255, 255, 0.18)"
      borderRadius="16px"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
    >
      <Text fontSize="2rem" fontWeight="bold">
        GTS Pokémon
      </Text>
      {error && (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
        <FormControl id="email" mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            borderRadius="md"
            variant="filled"
            _hover={{ borderColor: "blue.500" }}
          />
          <FormHelperText>Nunca compartiremos tu email.</FormHelperText>
        </FormControl>
        <FormControl id="password" mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            borderRadius="md"
            variant="filled"
            _hover={{ borderColor: "blue.500" }}
          />
        </FormControl>
        <Button
          type="submit"
          mt={6}
          colorScheme="blue"
          borderRadius="md"
        >
          Iniciar sesión
        </Button>
      </form>
      <Flex
        mt={8}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text mt={2}>¿No tienes una cuenta? </Text>
        <Link
          onClick={() => changeMode(FormMode.REGISTER)}
          color="blue"
          cursor="pointer"
        >
          Crear cuenta
        </Link>
      </Flex>
    </Flex>
  );
};
