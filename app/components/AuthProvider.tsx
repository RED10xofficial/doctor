"use client";

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "./Snackbar";
import { SessionHandlerSetup } from "./SessionHandlerSetup";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SnackbarProvider>
        <SessionHandlerSetup />
        {children}
      </SnackbarProvider>
    </SessionProvider>
  );
}
