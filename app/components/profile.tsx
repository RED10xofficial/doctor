import React from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Exam, Question } from "@prisma/client";
import ProfileToggle from "./ProfileToggle";

// Define types for exam with questions
type ExamWithQuestions = Exam & {
  questions: Question[];
};

// Function to get user's attended exams
async function getUserExams(userId: string) {
  try {
    // Get the latest 3 distinct exams this student has taken
    const examScores = await prisma.examScore.findMany({
      where: {
        studentId: parseInt(userId),
        submitted: true,
      },
      include: {
        exam: {
          include: {
            questions: true,
          },
        },
      },
      distinct: ["examId"],
      take: 3, // Only get 3 exams for the sidebar
      orderBy: {
        id: "desc", // Get the most recent exams
      },
    });

    // Group by examId to create a list of unique exams
    const uniqueExams = examScores.reduce((acc, score) => {
      if (!acc.some((item) => item.examId === score.examId)) {
        acc.push({
          examId: score.examId,
          exam: score.exam as ExamWithQuestions,
        });
      }
      return acc;
    }, [] as { examId: number; exam: ExamWithQuestions }[]);

    // For each unique exam, get all scores for this student
    const examResults = await Promise.all(
      uniqueExams.map(async ({ examId, exam }) => {
        // Get all answers for this exam by this student
        const allAnswers = await prisma.examScore.findMany({
          where: {
            examId,
            studentId: parseInt(userId),
            submitted: true,
          },
        });

        // Count correct answers
        const correctAnswers = allAnswers.filter(
          (answer) => answer.isCorrect
        ).length;
        const totalQuestions = exam.questions.length;

        return {
          id: examId,
          name: exam.name,
          score: `${correctAnswers}/${totalQuestions}`,
        };
      })
    );

    return examResults;
  } catch (error) {
    console.error("Error fetching user exams:", error);
    return [];
  }
}

const ProfileSidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  // Get user's exams if logged in
  const userExams = userId ? await getUserExams(userId) : [];

  // Return the profile toggle component with profile content
  return <ProfileToggle session={session} userExams={userExams} />;
};

export default ProfileSidebar;
