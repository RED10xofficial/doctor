import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Base API Client with retry logic
export class ApiClient {
  private client: AxiosInstance;
  private retries: number;
  private retryDelay: number;

  constructor(config: {
    baseURL: string;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
  }) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
    });

    this.retries = config.retries || 3;
    this.retryDelay = config.retryDelay || 1000;

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            const { signOut } = await import("next-auth/react");
            signOut({ callbackUrl: "/login" });
          }
        }

        const errorData = error.response?.data && typeof error.response.data === "object"
          ? error.response.data
          : { message: error.message };
          
        return Promise.reject({
          status: error.response?.status,
          message: (error.response?.data as any)?.message || error.message,
          ...errorData,
        });
      }
    );
  }

  private async withRetry<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    retryCount = 0
  ): Promise<AxiosResponse<T>> {
    try {
      return await requestFn();
    } catch (error: any) {
      const shouldRetry = this.shouldRetry(error, retryCount);
      
      if (shouldRetry) {
        const delay = this.retryDelay * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.withRetry(requestFn, retryCount + 1);
      }
      
      throw error;
    }
  }

  private shouldRetry(error: any, retryCount: number): boolean {
    if (retryCount >= this.retries) return false;
    
    // Don't retry 4xx errors (except 429)
    if (error.status >= 400 && error.status < 500 && error.status !== 429) {
      return false;
    }
    
    return true;
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.withRetry(() => this.client.get<T>(url, config));
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.withRetry(() => this.client.post<T>(url, data, config));
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.withRetry(() => this.client.put<T>(url, data, config));
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.withRetry(() => this.client.delete<T>(url, config));
  }
}

// Domain-specific API classes
export class ExamApi {
  constructor(private client: ApiClient) {}

  async getUserExams(userId: string, token: string, limit?: number) {
    const params = limit ? `?limit=${limit}` : '';
    return this.client.get(`/auth/students/${userId}/exams${params}`, {
      headers: { token }
    });
  }

  async getExamDetails(examId: string, token: string) {
    return this.client.get(`/auth/exams/${examId}`, {
      headers: { token }
    });
  }

  async getQuestions(examId: string) {
    return this.client.get(`/questions/${examId}`);
  }

  async submitExam(data: {
    studentId: string;
    examId: string;
    answers: Record<string, { option: string; optionId: string }>;
  }, token: string) {
    return this.client.post('/auth/exams/submit', data, {
      headers: { token }
    });
  }

  async getExamResult(examId: string, token: string) {
    return this.client.get(`/auth/exams/${examId}/result`, {
      headers: { token }
    });
  }

  async getDetailedResult(examId: string, token: string) {
    return this.client.get(`/auth/exams/${examId}/detailed-result`, {
      headers: { token }
    });
  }
}

export class UnitApi {
  constructor(private client: ApiClient) {}

  async getPopularUnits(examType: string, limit = 5) {
    return this.client.get(`/units?examType=${examType}&limit=${limit}`);
  }

  async getUnitDetails(unitId: string) {
    return this.client.get(`/units/${unitId}`);
  }
}

export class StatsApi {
  constructor(private client: ApiClient) {}

  async getStats(examType: string) {
    return this.client.get(`/stats/${examType}`);
  }
}

export class UserApi {
  constructor(private client: ApiClient) {}

  async login(credentials: { email: string; password: string }) {
    return this.client.post('/students/login', credentials);
  }

  async signup(userData: any) {
    return this.client.post('/students', userData);
  }

  async getProfile(token: string) {
    return this.client.get('/auth/students/me', {
      headers: { token }
    });
  }
}

export class ExamTypeApi {
  constructor(private client: ApiClient) {}

  async getExamTypes() {
    return this.client.get('/examtypes');
  }
}

// Create instances
const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_REST_URL!,
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
});

export const examApi = new ExamApi(apiClient);
export const unitApi = new UnitApi(apiClient);
export const statsApi = new StatsApi(apiClient);
export const userApi = new UserApi(apiClient);
export const examTypeApi = new ExamTypeApi(apiClient);

export default apiClient; 