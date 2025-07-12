"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Difficulty } from "@prisma/client";
import { sessionApiClient } from "@/lib/session-api-client";

interface SubmitAnswerParams {
  questionId: number;
  examId: number;
  studentId: string;
  answerText: string;
  studentAnswer: number;
  score: number;
}

interface SubmitExamParams {
  studentId: string;
  examId: string;
  answers: Record<string, {option: string, optionId: string}>
}

export async function submitAnswer(params: SubmitAnswerParams) {
  try {
    const question = await prisma.question.findUnique({
      where: { id: params.questionId },
    });

    if (!question) {
      throw new Error("Question not found");
    }

    const isCorrect = question.answer.toLowerCase() === params.answerText.toLowerCase();
    const score = isCorrect ? 1.0 : 0.0;

    await prisma.examScore.upsert({
      where: {
        studentId_examId_questionId: {
          studentId: parseInt(params.studentId),
          examId: params.examId,
          questionId: params.questionId,
        },
      },
      update: {
        studentAnswer: params.studentAnswer,
        isCorrect,
        score,
      },
      create: {
        studentId: parseInt(params.studentId),
        examId: params.examId,
        questionId: params.questionId,
        studentAnswer: params.studentAnswer,
        isCorrect,
        score,
      },
    });

    const stats = await prisma.examScore.aggregate({
      where: { 
        questionId: params.questionId,
        submitted: true,
      },
      _count: {
        _all: true,
        isCorrect: true,
      },
    });

    const totalAttempts = stats._count._all;
    const correctAttempts = stats._count.isCorrect || 0;
    const percentage = (correctAttempts / totalAttempts) * 100;

    let difficulty: Difficulty = "MEDIUM";
    if (percentage <= 30) {
      difficulty = "HARD";
    } else if (percentage >= 80) {
      difficulty = "EASY";
    }

    await prisma.question.update({
      where: {
        id: params.questionId,
      },
      data: {
        difficulty,
      },
    });

    revalidatePath(`/details/exam/${params.examId}`);
  } catch (error) {
    throw error;
  }
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