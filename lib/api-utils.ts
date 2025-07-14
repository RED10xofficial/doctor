import { AxiosResponse } from 'axios';

export interface ApiError {
  status: number;
  message: string;
  [key: string]: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

// Safe API call wrapper with fallback
export async function safeApiCall<T>(
  apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>,
  fallback: T
): Promise<T> {
  try {
    const response = await apiCall();
    return response.data.success ? response.data.data : fallback;
  } catch (error) {
    console.error('API Error:', error);
    return fallback;
  }
}

// Standardized error handling
export function handleApiError(error: any): ApiError {
  if (error?.status && error?.message) {
    return {
      status: error.status,
      message: error.message,
      ...error,
    };
  }
  
  return {
    status: 500,
    message: 'An unexpected error occurred',
    originalError: error,
  };
}

// Custom retry logic
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Don't retry 4xx errors (except 429)
      if ((error as any)?.status >= 400 && (error as any)?.status < 500 && (error as any)?.status !== 429) {
        throw error;
      }
      
      const delay = initialDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

// Safe data extraction
export function extractApiData<T>(response: any, fallback: T): T {
  if (response?.success && response?.data !== undefined) {
    return response.data;
  }
  return fallback;
}

// Type guard for API responses
export function isApiResponse(obj: any): obj is ApiResponse {
  return obj && typeof obj.success === 'boolean' && 'data' in obj;
}

// Type guard for API errors
export function isApiError(obj: any): obj is ApiError {
  return obj && typeof obj.status === 'number' && typeof obj.message === 'string';
} 