import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { studentId, examId } = req.body;

      // Find the exam scores for the student and exam
      const examScores = await prisma.examScore.findMany({
        where: {
          studentId,
          examId,
        },
      });

      if (!examScores || examScores.length === 0) {
        return res.status(404).json({ error: 'Exam scores not found for the student and exam' });
      }

      // Update the submitted field for each exam score
      await prisma.examScore.updateMany({
        where: {
          studentId,
          examId,
        },
        data: {
          submitted: true,
        },
      });

      res.status(200).json({ message: 'Exam submission updated successfully' });
    } catch (error) {
      console.error('Error updating exam submission:', error);
      res.status(500).json({ error: 'Failed to update exam submission' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}