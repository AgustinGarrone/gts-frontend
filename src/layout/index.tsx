"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { LoginPage } from "@/screen/login";

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      if (isAuthenticated()) {
        setAuthState(true);
        if (pathname === "/login") {
          router.push("/");
        }
      } else {
        router.push("/login");
        setAuthState(false);
      }
    };

    checkAuthAndRedirect();
  }, [isAuthenticated, router]);

  return authState ? <div>{children}</div> : <LoginPage />;
};