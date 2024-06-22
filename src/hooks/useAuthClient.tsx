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
    }
  );
};

const useSetInitialMutation = () => {
  return useMutation<boolean , Error> (
    async () => {
      const response = await AuthClient.setInitialPokemonsTrue()
      return response
    }
  )
}

export const useAuthClient = () => {
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const setInitialMutation = useSetInitialMutation()

  return {
    loginMutation,
    registerMutation,
    setInitialMutation
  };
};