"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "@/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/hooks/useAuth";

export function Providers({ children }: { children: JSX.Element }) {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Layout>{children}</Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}