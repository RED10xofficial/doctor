import { Exam } from "@prisma/client";
import Link from "next/link";

type ExamListItem = Pick<Exam, "id" | "name" | "duration" | "unitId" | "instruction">;

export default function ExamList({ exams }: { exams: ExamListItem[] }) {
  return (
    <div className="mt-2">
      {exams.map((exam) => (
        <div
          key={exam.id}
          className="flex items-center justify-between border-b py-2"
        >
          <p className="text-gray-600 text-sm">{exam.name}</p>
          <Link
            href={`/details/exam/${exam.id}`}
            className="text-[#702DFF] text-sm hover:text-sky-800 hover:bg-gray-50 px-2 py-1 rounded-md"
          >
            Start Now
          </Link>
        </div>
      ))}
    </div>
  );
}
