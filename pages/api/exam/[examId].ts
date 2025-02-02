import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "../middleware";

// Define constants for status codes and messages
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_METHOD_NOT_ALLOWED = 405;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const MESSAGE_METHOD_NOT_ALLOWED = "Method not allowed";
const MESSAGE_EXAM_ID_REQUIRED = "Exam ID is required";
const MESSAGE_INVALID_EXAM_ID = "Invalid Exam ID";
const MESSAGE_EXAM_NOT_FOUND = "Exam not found";
const MESSAGE_ERROR_FETCHING_EXAM = "Error fetching exam";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(HTTP_STATUS_METHOD_NOT_ALLOWED)
      .json({ message: MESSAGE_METHOD_NOT_ALLOWED });
  }

  await authMiddleware(req, res);

  const examId = req.query.examId as string;

  if (!examId) {
    return res
      .status(HTTP_STATUS_BAD_REQUEST)
      .json({ message: MESSAGE_EXAM_ID_REQUIRED });
  }

  const parsedExamId = parseInt(examId, 10);

  if (isNaN(parsedExamId)) {
    return res
      .status(HTTP_STATUS_BAD_REQUEST)
      .json({ message: MESSAGE_INVALID_EXAM_ID });
  }

  try {
    const exam = await prisma.exam.findUnique({
      where: {
        id: parsedExamId,
      },
      select: { // Use select to control fields and exclude answer
        id: true,
        name: true,
        instruction: true,
        unit: {
          select: {
            id: true,
            name: true,
          },
        },
        questions: {
          select: {
            id: true,
            question: true,
            options: {
              select: {
                id: true,
                text: true,
              },
            },
          },
        },
      },
    });

    if (!exam) {
      return res
        .status(HTTP_STATUS_NOT_FOUND)
        .json({ message: MESSAGE_EXAM_NOT_FOUND });
    }

    res.status(HTTP_STATUS_OK).json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    res
      .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGE_ERROR_FETCHING_EXAM });
  }
}