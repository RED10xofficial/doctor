import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "./middleware";

/**
 * @route GET /api/sections
 * @description Get all sections with their units and exams
 * @security Authenticated
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" }); // Method Not Allowed
  }

  try {
    await authMiddleware(req, res); // Authentication

    const query: Record<string, string> =  {};

    const { examType } = req.query;

    if(examType){
      query.examType = examType as string;
    }

    const sections = await prisma.section.findMany({
      where: {...query},
      include: {
        units: {
          include: {
            exams: true, // Include exams for each unit
          },
        },
      },
    });

    res.status(200).json(sections); // OK
  } catch (error) {
    console.error("Error fetching sections with units and exams:", error);
    res.status(500).json({ message: "Failed to fetch sections" }); // Internal Server Error
  }
}