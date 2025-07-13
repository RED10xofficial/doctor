// components/ErrorInjector.tsx
"use client";

import { useEffect } from "react";
import { useError } from "./ErrorContext";
import { signOut } from "next-auth/react";

export function ErrorInjector({
  error,
  status,
}: {
  error?: string | null;
  status: number;
}) {
  const { setError } = useError();

  useEffect(() => {
    if (error) {
      setError(error);
    }

    if (status === 401) {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });
    }
  }, [error, setError]);

  return null;
}
