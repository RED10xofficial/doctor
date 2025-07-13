"use client";

import { useSessionHandler } from '@/lib/use-session-handler';

// Component to set up session handler with snackbar
export const SessionHandlerSetup = () => {
  useSessionHandler();
  
  // This component doesn't render anything, it just sets up the session handler
  return null;
}; 