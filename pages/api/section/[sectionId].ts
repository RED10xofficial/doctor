import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sectionId = req.query.sectionId as string;

  if (!sectionId) {
    return res.status(400).json({ error: 'Section ID is required' });
  }

  try {
    const section = await prisma.section.findUnique({
      where: {
        id: parseInt(sectionId, 10),
      },
      include: {
        units: {
          include: {
            exams: true,
          },
        },
      },
    });

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    return res.status(200).json({
      ...section,
      units: section.units.map(unit => ({
        ...unit,
        exams: unit.exams,
      })),
    });
  } catch (error) {
    console.error('Error fetching section data:', error);
    return res.status(500).json({ error: 'Failed to fetch section data' });
  }
}