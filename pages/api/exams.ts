import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "./middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await authMiddleware(req, res);

  try {
    const exams = await prisma.exam.findMany({
      include: {
        unit: true,
        questions: true,
      },
    });
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ message: "Error fetching exams" });
  }
}