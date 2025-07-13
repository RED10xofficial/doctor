import { useEffect } from 'react';
import { useSnackbar } from '@/app/components/Snackbar';
import { sessionHandler } from './session-handler';

// Hook to set up session handler with snackbar
export const useSessionHandler = () => {
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    // Set the snackbar callback for the session handler
    sessionHandler.setSnackbarCallback(showSnackbar);
  }, [showSnackbar]);

  return sessionHandler;
}; 