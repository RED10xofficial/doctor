"use server";

import { examApi } from "@/lib/api-client";
import { handleApiError } from "@/lib/api-utils";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

interface SubmitExamParams {
  studentId: string;
  examId: string;
  answers: Record<string, { option: string; optionId: string }>;
}

export async function submitExam(params: SubmitExamParams) {
  try {
    const session = await auth();
    const { data: response } = await examApi.submitExam(
      params,
      session?.accessToken as string
    );

    if (response.success) {
      revalidatePath(`/details/exam/${params.examId}`);
      return { success: true };
    } else {
      throw new Error(response.message || "Failed to submit exam");
    }
  } catch (err) {
    const apiError = handleApiError(err);
    return { 
      success: false,
      error: apiError.message,
      status: apiError.status
    };
  }
}
