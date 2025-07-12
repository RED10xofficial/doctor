// API Client with robust error handling and retry logic
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  error?: ApiError;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

class ApiClient {
  private config: ApiConfig;
  private defaultHeaders: Record<string, string>;

  constructor(config: ApiConfig) {
    this.config = {
      timeout: 10000,
      retries: 3,
      retryDelay: 1000,
      ...config,
    };
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.config.timeout,
      retries = this.config.retries || 3,
    } = options;

    const url = `${this.config.baseURL}${endpoint}`;
    const requestHeaders = { ...this.defaultHeaders, ...headers };

    let lastError: ApiError | null = null;

    for (let attempt = 0; attempt <= (retries || 3); attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          method,
          headers: requestHeaders,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const apiError = {
            message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
            status: response.status,
            code: errorData.code,
          } as ApiError;
          
          // Return error response instead of throwing
          return {
            data: undefined as any,
            success: false,
            message: apiError.message,
            error: apiError,
          };
        }

        const data = await response.json();
        return {
          ...data,
          message: data.message,
        };
      } catch (error) {
        lastError = error as ApiError;
        
        // Don't retry on client errors (4xx) except for 429 (rate limit)
        if (lastError.status >= 400 && lastError.status < 500 && lastError.status !== 429) {
          return {
            data: undefined as any,
            success: false,
            message: lastError.message,
            error: lastError,
          };
        }

        // Don't retry on server errors (5xx) if it's the last attempt
        if (attempt === (retries || 3)) {
          return {
            data: undefined as any,
            success: false,
            message: lastError.message,
            error: lastError,
          };
        }

        // Wait before retrying
        await this.delay((this.config.retryDelay || 1000) * Math.pow(2, attempt));
      }
    }

    // If we get here, all retries failed
    const finalError = lastError || { message: 'Unknown error occurred', status: 500 };
    return {
      data: undefined as any,
      success: false,
      message: finalError.message,
      error: finalError,
    };
  }

  // Generic request methods
  async get<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'DELETE' });
  }

  async patch<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  // Helper method to add auth token
  withAuth(token: string): ApiClient {
    const client = new ApiClient(this.config);
    client.defaultHeaders = { ...this.defaultHeaders, token };
    return client;
  }
}

// Create default API client instance
export const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_REST_URL || '',
});

// Type-safe API methods for specific endpoints
export class ExamApi {
  private client: ApiClient;

  constructor(client: ApiClient = apiClient) {
    this.client = client;
  }

  async getUserExams(userId: string, token?: string, limit: number = 3) {
    const client = token ? this.client.withAuth(token) : this.client;
    return client.get(`/auth/students/${userId}/exams?limit=${limit}`);
  }

  async getExam(examId: number) {
    return this.client.get(`/questions/${examId}`);
  }

  async submitExam(data: any, token: string) {
    return this.client.withAuth(token).post('/auth/exams/submit', data);
  }
}

export class SectionApi {
  private client: ApiClient;

  constructor(client: ApiClient = apiClient) {
    this.client = client;
  }

  async getSections(examType: string) {
    return this.client.get(`/sections?examType=${examType}`);
  }

  async getSection(sectionId: string) {
    return this.client.get(`/section/${sectionId}`);
  }
}

export class StatsApi {
  private client: ApiClient;

  constructor(client: ApiClient = apiClient) {
    this.client = client;
  }

  async getStats(examType: string) {
    return this.client.get(`/stats/${examType}`);
  }
}

export class UnitApi {
  private client: ApiClient;

  constructor(client: ApiClient = apiClient) {
    this.client = client;
  }

  async getPopularUnits(examType: string, limit: number = 5) {
    return this.client.get(`/units?examType=${examType}&limit=${limit}`);
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  student: {
    id: string;
    name: string;
    email: string;
    examType: string;
  };
  token: string;
}

export class UserApi {
  private client: ApiClient;

  constructor(client: ApiClient = apiClient) {
    this.client = client;
  }

  async createUser(userData: any) {
    return this.client.post('/students', userData);
  }

  async loginUser(credentials: LoginCredentials) {
    return this.client.post<LoginResponse>('/students/login', credentials);
  }
}

// Export API instances
export const examApi = new ExamApi();
export const sectionApi = new SectionApi();
export const statsApi = new StatsApi();
export const unitApi = new UnitApi();
export const userApi = new UserApi(); 