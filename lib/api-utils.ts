/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse, ApiError } from './api-client';

// Utility function to safely extract data from API response
export function extractApiData<T>(response: ApiResponse<T>): T {
  return response.data;
}

// Utility function to handle API errors gracefully
export function handleApiError(error: unknown): ApiError {
  if (error && typeof error === 'object' && 'message' in error && 'status' in error) {
    return error as ApiError;
  }
  
  return {
    message: error instanceof Error ? error.message : 'An unknown error occurred',
    status: 500,
  };
}

// Utility function to extract error message from API response for snackbars
export function getErrorMessage(response: ApiResponse<any>): string {
  if (response.success) {
    return response.message || 'Operation completed successfully';
  }
  
  if (response.error) {
    return response.error.message;
  }
  
  return response.message || 'An error occurred';
}

// Utility function to create a safe API call wrapper
export async function safeApiCall<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  fallback: T
): Promise<T> {
  const response = await apiCall();
  if (response.success) {
    return response.data;
  } else {
    console.error('API call failed:', response.message);
    return fallback;
  }
}

// Utility function to validate API response
export function isValidApiResponse<T>(response: any): response is ApiResponse<T> {
  return response && typeof response === 'object' && 'success' in response;
}

// Utility function to create retry logic for specific operations
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }
  
  throw lastError || new Error('Operation failed after all retries');
} 