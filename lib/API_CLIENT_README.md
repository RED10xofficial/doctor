# Robust API Client System

This document describes the new modular and robust API client system that replaces scattered fetch calls throughout the application.

## Overview

The API client system provides:
- **Centralized error handling** with retry logic
- **Type-safe API calls** with proper TypeScript support
- **Modular design** with domain-specific API classes
- **Robust error recovery** with exponential backoff
- **Consistent response handling** across all API calls

## Architecture

### Core Components

1. **ApiClient** (`api-client.ts`)
   - Base HTTP client with retry logic
   - Automatic timeout handling
   - Exponential backoff for retries
   - Proper error classification (4xx vs 5xx)

2. **Domain-Specific APIs**
   - `ExamApi` - Exam-related operations
   - `SectionApi` - Section-related operations
   - `StatsApi` - Statistics operations
   - `UnitApi` - Unit-related operations
   - `UserApi` - User management operations

3. **Utility Functions** (`api-utils.ts`)
   - `safeApiCall()` - Wrapper for safe API calls
   - `handleApiError()` - Standardized error handling
   - `withRetry()` - Custom retry logic
   - `extractApiData()` - Safe data extraction

## Usage Examples

### Basic API Call

```typescript
import { examApi } from '@/lib/api-client';
import { safeApiCall } from '@/lib/api-utils';

// Simple API call with fallback
const userExams = await safeApiCall(
  () => examApi.getUserExams(userId, token),
  []
);
```

### Error Handling

```typescript
import { examApi } from '@/lib/api-client';
import { handleApiError } from '@/lib/api-utils';

try {
  const response = await examApi.getUserExams(userId, token);
  return response.data;
} catch (error) {
  const apiError = handleApiError(error);
  console.error('API Error:', apiError.message);
  return [];
}
```

### Custom Retry Logic

```typescript
import { withRetry } from '@/lib/api-utils';

const result = await withRetry(
  () => examApi.submitExam(examData, token),
  5, // max retries
  2000 // initial delay
);
```

## Configuration

### Default Settings

```typescript
const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_REST_URL,
  timeout: 10000,        // 10 seconds
  retries: 3,           // 3 retry attempts
  retryDelay: 1000,     // 1 second initial delay
});
```

### Custom Configuration

```typescript
const customClient = new ApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  retries: 5,
  retryDelay: 500,
});
```

## Error Handling Strategy

### Automatic Retry Logic

- **4xx Errors**: No retry (except 429 rate limit)
- **5xx Errors**: Retry with exponential backoff
- **Network Errors**: Retry with exponential backoff
- **Timeout Errors**: Retry with exponential backoff

### Error Classification

```typescript
interface ApiError {
  message: string;
  status: number;
  code?: string;
}
```

## Migration Guide

### Before (Old Pattern)

```typescript
// Scattered fetch calls
const res = await fetch(`${process.env.NEXT_PUBLIC_REST_URL}/auth/students/${userId}/exams?limit=3`, {
  headers: { token: token as string }
});
if (res.ok) {
  const { data } = await res.json();
  return data;
}
return [];
```

### After (New Pattern)

```typescript
// Centralized, robust API call
import { examApi } from '@/lib/api-client';
import { safeApiCall } from '@/lib/api-utils';

const userExams = await safeApiCall(
  () => examApi.getUserExams(userId, token, 3),
  []
);
```

## Benefits

1. **Reliability**: Automatic retry with exponential backoff
2. **Maintainability**: Centralized error handling and logging
3. **Type Safety**: Full TypeScript support with proper types
4. **Consistency**: Uniform API response format
5. **Modularity**: Domain-specific API classes
6. **Testability**: Easy to mock and test individual components

## Best Practices

1. **Always use `safeApiCall()`** for critical operations
2. **Provide meaningful fallbacks** for failed API calls
3. **Use domain-specific APIs** instead of generic fetch calls
4. **Handle errors gracefully** with proper user feedback
5. **Log errors appropriately** for debugging

## Testing

```typescript
// Mock API client for testing
const mockApiClient = new ApiClient({
  baseURL: 'http://localhost:3000',
});

// Test with mock responses
jest.mock('@/lib/api-client', () => ({
  examApi: {
    getUserExams: jest.fn().mockResolvedValue({
      data: mockExams,
      success: true,
    }),
  },
}));
```

## Future Enhancements

1. **Request/Response Interceptors** for logging and monitoring
2. **Caching Layer** for frequently accessed data
3. **Request Queuing** for rate limiting
4. **Real-time Error Reporting** integration
5. **Performance Monitoring** and metrics collection 