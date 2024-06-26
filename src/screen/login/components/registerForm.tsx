import { useAuthClient } from "@/hooks/useAuthClient";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Link,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FormMode } from "..";
import { registerSchema } from "./form.schemas";
import { z } from "zod";
import { errorAlert } from "@/helpers/alerts";
import { playSound } from "@/helpers/fx";
import { checkLocalStorage } from "@/helpers/localStorage";

type RegisterFormProps = {
  changeMode: Dispatch<SetStateAction<FormMode>>;
};

export const RegisterForm: FC<RegisterFormProps> = ({ changeMode }) => {
  const { registerMutation } = useAuthClient();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    playSound();

    try {
      const formData = { username, email, password };
      registerSchema.parse(formData);
      setError(null);

      await registerMutation.mutateAsync(formData, {
        onSuccess: (data) => {
          if (checkLocalStorage()) {
            localStorage.setItem("accessToken", data.user.token);
            localStorage.setItem(
              "initialPokemons",
              data.user.initialPokemons ? "true" : "false"
            );
          }
          window.location.href = "/getInitial";
        },
        onError: (error) => {
          console.error("Error al registrar usuario:", error);
          errorAlert(`error al registrar`);
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        console.error("Error al registrar:", error);
      }
    }
  };

  return (
    <Flex
      w="30%"
      h="95%"
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
        ¡Regístrate!
      </Text>
      {error && (
        <Alert height="4em" status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl width="80%" id="username" mt={4}>
          <FormLabel>Nombre de usuario</FormLabel>
          <Input
            type="text"
            variant="filled"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl width="80%" id="email" mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText>Nunca compartiremos tu email.</FormHelperText>
        </FormControl>
        <FormControl width="80%" id="password" mt={4}>
          <FormLabel>Contraseña</FormLabel>
          <Input
            variant="filled"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" mt={6} colorScheme="blue">
          Registrarse
        </Button>
      </form>
      <Flex
        mt={8}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text mt={4}>¿Ya tienes una cuenta? </Text>
        <Link onClick={() => changeMode(FormMode.LOGIN)} color="blue">
          Iniciar sesión
        </Link>
      </Flex>
    </Flex>
  );
};
