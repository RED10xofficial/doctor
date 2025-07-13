"use server";

import apiClient, { ErrorResponse } from "@/lib/api";
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
    const { data: response } = await apiClient.post(
      `/auth/exams/submit`,
      params,
      { headers: { token: session?.accessToken } }
    );

    if (response.success) {
      revalidatePath(`/details/exam/${params.examId}`);
    } else {
      throw new Error("Failed to submit exam");
    }
  } catch (err) {
    const e = err as ErrorResponse;
    return { ...e }
  }
}
