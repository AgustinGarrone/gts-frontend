"use client";
import {
  AuthResponses,
  LoginMutationData,
  RegisterMutationData,
} from "../types/auth";
import { useMutation } from "react-query";
import AuthClient from "../clients/authClient";

const useLoginMutation = () => {
  return useMutation<AuthResponses, Error, LoginMutationData>(
    async (data: LoginMutationData) => {
      const response = await AuthClient.login(data );
      return response;
    },
  );
};

const useRegisterMutation = () => {
  return useMutation<AuthResponses, Error, RegisterMutationData>(
    async (data: RegisterMutationData) => {
      const response = await AuthClient.register(data);
      return response;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.user.token);
      },
      onError: (error) => {
        console.error("Error al iniciar sesión:", error);
        throw new Error(error.message);
      },
    }
  );
};

export const useAuthClient = () => {
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  return {
    loginMutation,
    registerMutation,
  };
};