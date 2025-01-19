"use client"
import { createContext, useContext, useEffect, useState } from "react";

type SnackbarProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const bgColors = {
  success: "bg-green-200",
  error: "bg-red-200",
};

const textColors = {
  success: "text-green-800",
  error: "text-red-800",
};

interface SnackbarContextType {
  showSnackbar: (message: string, type: "success" | "error") => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

interface SnackbarContextProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarContextProviderProps> = ({
  children,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"error" | "success">("success");

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        message={message}
        type={severity}
        onClose={() => setSnackbarOpen(!snackbarOpen)}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export default function Snackbar({ message, type, onClose }: SnackbarProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-2 z-50">
      <div
        className={`${bgColors[type]} ${textColors[type]} px-6 py-3 rounded-lg shadow-lg
                animate-[slideUp_0.3s_ease-in-out]`}
      >
        {message}
      </div>
    </div>
  );
}
