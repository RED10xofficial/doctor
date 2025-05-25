import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { authMiddleware } from "../../middleware";
import { ExamScore, Question, Option } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await authMiddleware(req, res);

  const { examId } = req.query;

  const studentId = session?.user.id;

  if (!studentId || typeof studentId !== "string") {
    return res.status(400).json({ error: "Invalid studentId" });
  }

  if (!examId || typeof examId !== "string") {
    return res.status(400).json({ error: "Invalid examId" });
  }

  try {
    // Implement statistics logic here
    const statistics = await getExamStatistics(examId, parseInt(studentId));

    res.status(200).json(statistics);
  } catch (error) {
    if (error instanceof Error) {
      const e = JSON.parse(error.message);
      res.status(e.errorCode).json({ ...e });
    }
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve exam statistics" });
  }
}

async function getExamStatistics(examId: string, studentId: number) {
  const exam = await prisma.exam.findUnique({
    where: {
      id: parseInt(examId),
    },
    select: {
      questions: {
        include: {
          question: {
            include: {
              options: true,
            },
          },
        },
      },
      examScores: {
        where: {
          studentId,
          submitted: true,
        },
      },
    },
  });

  if (!exam) {
    throw new Error(
      JSON.stringify({
        errorCode: 404,
        message: "Exam not found",
      })
    );
  }

  const examAttended = exam.examScores.length > 0;

  if (!examAttended) {
    throw new Error(
      JSON.stringify({
        errorCode: 403,
        message:
          "Please submit the exam, Detailed analysis is available only after attending the exam",
      })
    );
  }

  let totalPoints = 0;
  const maxPoints = exam.questions.length;

  const questions = exam.questions.reduce(
    (
      acc: { [key: string]: Question & { options: Option[] } },
      questionExam: { question: Question & { options: Option[] } }
    ) => {
      const question = questionExam.question;
      acc[question.id] = {
        ...question,
        options: question.options.map((option: Option) => ({
          ...option,
          correctAnswer:
            option.optionKey.toLowerCase() === question.answer.toLowerCase(),
        })),
      };
      return acc;
    },
    {}
  );

  const data = exam.examScores.reduce(
    (
      acc: {
        [key: string]: {
          isCorrect: boolean;
          totalCorrect: number;
          totalIncorrect: number;
        };
      },
      examScore: ExamScore
    ) => {
      if (!acc[examScore.questionId]) {
        acc[examScore.questionId] = {
          isCorrect: false,
          totalCorrect: 0,
          totalIncorrect: 0,
        };
      }

      if (examScore.studentId === studentId) {
        acc[examScore.questionId].isCorrect = examScore.isCorrect ?? false;
        if (examScore.isCorrect) {
          totalPoints += examScore.score;
        }
      }

      if (examScore.isCorrect) {
        acc[examScore.questionId].totalCorrect += 1;
      } else {
        acc[examScore.questionId].totalIncorrect += 1;
      }

      return acc;
    },
    {}
  );

  return {
    totalPoints,
    maxPoints,
    questions,
    data,
  };
}
