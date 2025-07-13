"use server";
import apiClient from "@/lib/api";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createCustomExam(
  examName: string,
  difficulty: string,
  questionCount: number
) {
  try {
    const session = await auth();

    const { data: response } = await apiClient.post(
      `/auth/exams/build`,
      { difficulty, noOfQuestions: questionCount, examName },
      { headers: { token: session?.accessToken } }
    );

    if (response.success) {
      revalidatePath("/build-exam");
      return response.data;
    }
    return response;
  } catch (error) {
    return error;
  }
}
