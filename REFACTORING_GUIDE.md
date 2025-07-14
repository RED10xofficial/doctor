# API Client Refactoring Guide

## Overview

This guide outlines the refactoring of the current apiClient usage to a more robust, modular system with better error handling, retry logic, and type safety.

## Current Issues

### 1. Inconsistent Error Handling
**Before:**
```typescript
try {
  const { data: response } = await apiClient.get('/units');
  if (response.success) {
    return response.data;
  } else {
    error = response.message;
    status = response.status;
  }
} catch (err) {
  const e = err as ErrorResponse;
  error = e.message;
  status = e.status;
}
```

**After:**
```typescript
const units = await safeApiCall(
  () => unitApi.getPopularUnits(examType, 5),
  []
);
```

### 2. No Retry Logic
**Before:** Failed requests fail immediately
**After:** Automatic retry with exponential backoff for 5xx errors

### 3. Repetitive Code
**Before:** Similar patterns repeated across 15+ files
**After:** Centralized domain-specific APIs

### 4. Mixed Server/Client Usage
**Before:** Same client used everywhere
**After:** Domain-specific APIs with proper typing

## New Architecture

### 1. Domain-Specific APIs

```typescript
// Instead of generic apiClient calls
const { data: response } = await apiClient.get('/auth/students/${userId}/exams');

// Use domain-specific APIs
const { data: response } = await examApi.getUserExams(userId, token);
```

### 2. Safe API Calls

```typescript
// Use safeApiCall for critical operations
const userExams = await safeApiCall(
  () => examApi.getUserExams(userId, token),
  [] // fallback
);
```

### 3. Standardized Error Handling

```typescript
// Use handleApiError for consistent error handling
try {
  const response = await examApi.submitExam(data, token);
  return response.data;
} catch (error) {
  const apiError = handleApiError(error);
  console.error('API Error:', apiError.message);
  return [];
}
```

## Migration Steps

### Step 1: Update Imports

**Before:**
```typescript
import apiClient, { ErrorResponse } from "@/lib/api";
```

**After:**
```typescript
import { examApi, unitApi, statsApi } from "@/lib/api-client";
import { safeApiCall, handleApiError } from "@/lib/api-utils";
```

### Step 2: Replace API Calls

**Before:**
```typescript
const { data: response } = await apiClient.get(
  `/auth/students/${studentId}/exams`,
  { headers: { token: session?.accessToken } }
);
```

**After:**
```typescript
const { data: response } = await examApi.getUserExams(
  studentId, 
  session?.accessToken as string
);
```

### Step 3: Use Safe API Calls

**Before:**
```typescript
try {
  const { data: response } = await apiClient.get('/units');
  return response.success ? response.data : [];
} catch (err) {
  return [];
}
```

**After:**
```typescript
const units = await safeApiCall(
  () => unitApi.getPopularUnits(examType, 5),
  []
);
```

### Step 4: Standardize Error Handling

**Before:**
```typescript
} catch (err) {
  const e = err as ErrorResponse;
  error = e.message;
  status = e.status;
}
```

**After:**
```typescript
} catch (err) {
  const apiError = handleApiError(err);
  error = apiError.message;
  status = apiError.status;
}
```

## Files to Refactor

### High Priority (Critical Path)
1. `app/(auth)/home/page.tsx` ✅
2. `app/components/LoginForm.tsx` ✅
3. `app/components/SignupForm.tsx`
4. `app/(auth)/(course-pages)/my-exams/page.tsx` ✅
5. `app/(auth)/(course-pages)/details/exam/actions.ts` ✅

### Medium Priority
6. `app/(auth)/(course-pages)/details/page.tsx`
7. `app/(auth)/(course-pages)/details/exam/[examId]/page.tsx`
8. `app/(auth)/(course-pages)/exam-result/[examId]/page.tsx`
9. `app/(auth)/(course-pages)/detailed-result/[examId]/page.tsx`
10. `app/(auth)/(course-pages)/build-exam/actions.ts`

### Low Priority
11. `app/components/profile.tsx`
12. `app/(unauth)/signup/page.tsx`
13. `pages/api/auth/[...nextauth].ts`

## Benefits of Refactoring

### 1. Reliability
- Automatic retry with exponential backoff
- Better error classification (4xx vs 5xx)
- Graceful degradation with fallbacks

### 2. Maintainability
- Centralized error handling
- Domain-specific APIs
- Consistent patterns across codebase

### 3. Type Safety
- Proper TypeScript interfaces
- Type guards for API responses
- Better IntelliSense support

### 4. Performance
- Reduced code duplication
- Optimized retry logic
- Better error recovery

### 5. Developer Experience
- Clear API boundaries
- Consistent error messages
- Easy testing and mocking

## Testing Strategy

### 1. Unit Tests
```typescript
// Mock domain-specific APIs
jest.mock('@/lib/api-client', () => ({
  examApi: {
    getUserExams: jest.fn().mockResolvedValue({
      data: { success: true, data: mockExams }
    }),
  },
}));
```

### 2. Integration Tests
```typescript
// Test safe API calls
const result = await safeApiCall(
  () => examApi.getUserExams(userId, token),
  []
);
expect(result).toEqual(mockExams);
```

### 3. Error Handling Tests
```typescript
// Test error scenarios
const error = handleApiError(mockError);
expect(error.status).toBe(500);
expect(error.message).toBe('An unexpected error occurred');
```

## Migration Checklist

- [ ] Update all imports to use new API client
- [ ] Replace generic apiClient calls with domain-specific APIs
- [ ] Implement safeApiCall for critical operations
- [ ] Standardize error handling with handleApiError
- [ ] Add proper TypeScript types
- [ ] Update tests to use new APIs
- [ ] Remove old apiClient usage
- [ ] Update documentation

## Rollback Plan

If issues arise during migration:

1. Keep old `lib/api.ts` as backup
2. Migrate files incrementally
3. Test each domain API separately
4. Maintain backward compatibility during transition
5. Use feature flags if needed

## Future Enhancements

1. **Request/Response Interceptors** for logging
2. **Caching Layer** for frequently accessed data
3. **Request Queuing** for rate limiting
4. **Real-time Error Reporting** integration
5. **Performance Monitoring** and metrics collection 