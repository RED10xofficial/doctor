import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { studentId, examId, questionId, studentAnswer, score, answerText } = JSON.parse(req.body);
      
      const question = await prisma.question.findUnique({where:{ id: parseInt(questionId, 10)}});

      const examScore = await prisma.examScore.create({
        data: {
          studentId: parseInt(studentId, 10),
          examId: parseInt(examId, 10),
          questionId: parseInt(questionId, 10),
          studentAnswer: parseInt(studentAnswer, 10),
          isCorrect: question?.answer === answerText,
          score,
        },
      });

      console.log(examScore)

      res.status(200).json({ message: 'Exam score submitted successfully', examScore });
    } catch (error) {
      console.error('Error submitting exam score:', error);
      res.status(500).json({ error: 'Failed to submit exam score' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}