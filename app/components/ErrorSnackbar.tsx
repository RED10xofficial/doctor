// components/ErrorSnackbar.tsx
"use client";

import { useEffect } from "react";
import { useError } from "./ErrorContext";
import { useSnackbar } from "./Snackbar";

export function ErrorSnackbar() {
  const { error, clearError } = useError();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
      clearError();
    }
  }, [error, clearError]);

  return null;
}
