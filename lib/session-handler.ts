import { signOut } from "next-auth/react";

// Client-side session handler for 401 errors
export class SessionHandler {
  private static instance: SessionHandler;
  private snackbarCallback?: (message: string, type: "success" | "error") => void;

  private constructor() {}

  static getInstance(): SessionHandler {
    if (!SessionHandler.instance) {
      SessionHandler.instance = new SessionHandler();
    }
    return SessionHandler.instance;
  }

  // Set the snackbar callback (should be called from a React component)
  setSnackbarCallback(callback: (message: string, type: "success" | "error") => void) {
    this.snackbarCallback = callback;
  }

  // Handle 401 errors
  async handleUnauthorized() {
    // Show snackbar message if callback is available
    if (this.snackbarCallback) {
      this.snackbarCallback("Session expired. Please login again.", "error");
    }

    // Clear session and redirect to login
    try {
      await signOut({ 
        callbackUrl: '/login',
        redirect: true 
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  // Check if an error is a 401 error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isUnauthorizedError(error: any): boolean {
    return error?.response?.status === 401 || error?.status === 401;
  }
}

export const sessionHandler = SessionHandler.getInstance(); 