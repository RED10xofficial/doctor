"use server";

import { revalidatePath } from "next/cache";
import { sessionApiClient } from "@/lib/session-api-client";

interface SubmitExamParams {
  studentId: string;
  examId: string;
  answers: Record<string, {option: string, optionId: string}>
}

export async function submitExam(params: SubmitExamParams) {
  try {
    const response = await sessionApiClient.submitExam(params);
    
    if (response.success) {
      revalidatePath(`/details/exam/${params.examId}`);
    } else {
      throw new Error('Failed to submit exam');
    }
  } catch (error) {
    console.error('Error submitting exam:', error);
    throw error;
  }
} 