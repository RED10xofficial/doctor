import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { studentId, examId, questionId, studentAnswer, score, answerText } =
      JSON.parse(req.body);

    if (
      studentId === undefined ||
      examId === undefined ||
      questionId === undefined ||
      studentAnswer === undefined ||
      score === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const question = await prisma.question.findUnique({
        where: { id: parseInt(questionId, 10) },
      });

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      try {
        await prisma.examScore.upsert({
          where: {
            studentId_examId_questionId: {
              studentId: parseInt(studentId, 10),
              examId: parseInt(examId, 10),
              questionId: parseInt(questionId, 10),
            },
          },
          update: {
            studentAnswer: parseInt(studentAnswer, 10),
            isCorrect:
              question.answer.toLowerCase() ===
              String(answerText).toLowerCase(),
            score: parseFloat(score),
          },
          create: {
            studentId: parseInt(studentId, 10),
            examId: parseInt(examId, 10),
            questionId: parseInt(questionId, 10),
            studentAnswer: parseInt(studentAnswer, 10),
            isCorrect:
              question.answer.toLowerCase() ===
              String(answerText).toLowerCase(),
            score: parseFloat(score),
          },
        });

        res.status(200).json({ message: "Exam score submitted successfully" });
      } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ error: "Failed to submit exam score" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch question" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
