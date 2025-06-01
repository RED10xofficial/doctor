import Link from "next/link";
import prisma from "@/lib/prisma";
import { Unit, Exam, Section } from "@prisma/client";

type UnitWithExams = Unit & {
  exams: Exam[];
  section: Section;
};

interface PopularUnitsProps {
  examType: string;
}

export default async function PopularUnits({ examType }: PopularUnitsProps) {
  const popularUnits = await prisma.unit.findMany({
    where: {
      section: {
        examType,
      },
    },
    take: 5,
    orderBy: {
      exams: {
        _count: "desc",
      },
    },
    include: {
      exams: true,
      section: true,
    },
  }) as UnitWithExams[];

  return (
    <div className="w-full mt-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-medium text-gray-800">Popular Units</h2>
        <Link href="/units" className="text-[#702DFF] text-xs">
          See All
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 grid grid-cols-3">
          <div className="text-xs font-semibold text-gray-600 uppercase">
            Unit Name
          </div>
          <div className="text-xs font-semibold text-gray-600 uppercase">
            Section Name
          </div>
          <div className="text-xs font-semibold text-gray-600 uppercase text-right">
            Actions
          </div>
        </div>

        {popularUnits.map((unit, index) => (
          <div
            key={`unit-${index}`}
            className="px-6 py-4 border-b border-gray-100 grid grid-cols-3 items-center"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-800">{unit.name}</h3>
              <p className="text-xs text-gray-500">Exams: {unit.exams.length}</p>
            </div>
            <div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs">
                {unit.section.name}
              </span>
            </div>
            <div className="text-right">
              <Link
                href={`/units/${unit.id}`}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs"
              >
                SHOW DETAILS
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 