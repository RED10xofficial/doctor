"use client";

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "./Snackbar";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </SessionProvider>
  );
}
