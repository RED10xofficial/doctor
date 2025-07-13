/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import { apiClient } from "./api-client";
import { sessionHandler } from "./session-handler";

// Session-aware API client that automatically gets token from session
export class SessionApiClient {
  private client: any;

  constructor(client: any = apiClient) {
    this.client = client;
  }

  // Get session and token
  private async getSession() {
    return await auth();
  }

  // Create authenticated client with token from session
  private async getAuthenticatedClient() {
    const session = await this.getSession();
    const token = session?.accessToken;
    
    if (token) {
      return this.client.withAuth(token);
    }
    
    return this.client;
  }

  // Handle 401 errors by clearing session and redirecting
  private async handleUnauthorized() {
    await sessionHandler.handleUnauthorized();
  }

  // Generic method to make authenticated API calls
  private async makeAuthenticatedCall<T>(
    apiCall: (client: any) => Promise<T>
  ): Promise<T> {
    try {
      const authenticatedClient = await this.getAuthenticatedClient();
      const response = await apiCall(authenticatedClient);
      return response;
    } catch (error: any) {
      // Check if it's a 401 error
      if (sessionHandler.isUnauthorizedError(error)) {
        // Clear session and redirect to login
        await this.handleUnauthorized();
        throw new Error('Session expired. Please login again.');
      }
      throw error;
    }
  }

  // Exam API methods
  async getUserExams(userId: string, limit: number = 3) {
    return this.makeAuthenticatedCall(async (client) => {
      return client.get(`/auth/students/${userId}/exams?limit=${limit}`);
    });
  }

  async getExam(examId: string) {
    return this.makeAuthenticatedCall(async (client) => {
      return client.get(`/questions/${examId}`);
    });
  }

  async submitExam(data: any) {
    return this.makeAuthenticatedCall(async (client) => {
      return client.post('/auth/exams/submit', data);
    });
  }

  async buildExam(data: any) {
    return this.makeAuthenticatedCall(async (client) => {
      return client.post('/auth/exams/build', data);
    });
  }

  async getExamResult(studentId: string, examId: string) {
    return this.makeAuthenticatedCall(async (client) => {
      return client.get(`/auth/students/${studentId}/result/${examId}`);
    });
  }

  async getDetailedExamData(studentId: string, examId: string) {
    return this.makeAuthenticatedCall(async (client) => {
      return client.get(`/auth/students/${studentId}/exams/${examId}`);
    });
  }

  // Section API methods
  async getSections(examType: string) {
    return this.makeAuthenticatedCall(async (client) => {
      return client.get(`/sections?examType=${examType}`);
    });
  }

  async getSection(sectionId: string) {
    return this.makeAuthenticatedCall(async (client) => {
      return client.get(`/section/${sectionId}`);
    });
  }

  // Stats API methods
  async getStats(examType: string) {
    return this.makeAuthenticatedCall(async (client) => {
      return client.get(`/stats/${examType}`);
    });
  }

  // Unit API methods
  async getPopularUnits(examType: string, limit: number = 5) {
    return this.makeAuthenticatedCall(async (client) => {
      return client.get(`/units?examType=${examType}&limit=${limit}`);
    });
  }

  // User API methods (these don't need authentication)
  async createUser(userData: any) {
    return this.client.post('/students', userData);
  }

  async loginUser(credentials: any) {
    return this.client.post('/students/login', credentials);
  }
}

// Create and export the session-aware API client instance
export const sessionApiClient = new SessionApiClient(); 