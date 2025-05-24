"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface SessionContextType {
  session: Session | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  isLoading: true,
});

export function SessionProvider({ 
  children,
  initialSession 
}: { 
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [isLoading, setIsLoading] = useState(!initialSession);
  const router = useRouter();

  useEffect(() => {
    if (initialSession) {
      setSession(initialSession);
      setIsLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        
        if (!data.user) {
          router.push("/login");
          return;
        }
        
        setSession(data);
      } catch (error) {
        console.error("Error fetching session:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [router, initialSession]);

  return (
    <SessionContext.Provider value={{ session, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
} 