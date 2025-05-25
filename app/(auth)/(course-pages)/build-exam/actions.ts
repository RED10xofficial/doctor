"use server";

import prisma from "@/lib/prisma";
import { Difficulty } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createCustomExam(examName: string, difficulty: string, questionCount: number) {
  try {
    // Convert difficulty string to enum
    const difficultyEnum = difficulty.toUpperCase() as Difficulty;

    // Get random questions of specified difficulty
    const questions = await prisma.question.findMany({
      where: {
        difficulty: difficultyEnum,
      },
      include: {
        options: true,
      },
      take: questionCount,
    });

    if (questions.length < questionCount) {
      throw new Error(`Not enough ${difficulty} questions available. Only ${questions.length} found.`);
    }

    // Create a new exam
    const exam = await prisma.exam.create({
      data: {
        name: examName,
        unitId: 1, // You might want to make this dynamic based on your needs
        duration: 60, // Default duration in minutes
        questions: {
          create: questions.map(question => ({
            questionId: question.id
          }))
        }
      },
      include: {
        questions: {
          include: {
            question: {
              include: {
                options: true
              }
            }
          }
        }
      }
    });

    revalidatePath("/build-exam");
    return exam;
  } catch (error) {
    console.error("Error creating custom exam:", error);
    throw error;
  }
} 