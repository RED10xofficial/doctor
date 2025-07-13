// lib/api/axios.ts
import axios, { AxiosError } from "axios";

// Create the base Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_URL, // e.g., 'https://api.example.com'
  timeout: 10000,
});

// Response interceptor: handle common errors like 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const { signOut } = await import("next-auth/react");
        signOut({ callbackUrl: "/login" });
      }
    }

    return Promise.reject({
      status: error.response?.status,
      ...(error.response?.data && typeof error.response.data === "object"
        ? error.response.data
        : {}),
    });
  }
);

export default apiClient;

export interface ErrorResponse {
  status: number;
  message: string;
}
