"use server";

import prisma from "@/lib/prisma";
import { sessionApiClient } from "@/lib/session-api-client";
import { Difficulty } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createCustomExam(
  examName: string,
  difficulty: string,
  questionCount: number
) {
  try {
  
    const response = await sessionApiClient.buildExam({difficulty, questionCount, examName});
    
    if (response.success) {
      revalidatePath("/build-exam");
    } else {
      throw new Error('Failed to build exam');
    }
    
    return response.data;
  } catch (error) {
    console.error("Error creating custom exam:", error);
    throw error;
  }
}
