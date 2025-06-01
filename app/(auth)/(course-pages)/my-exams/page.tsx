import prisma from "@/lib/prisma";
import SessionWrapper from "../context/SessionWrapper";
import { Session } from "next-auth";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/app/components/ErrorBoundary";

// Dynamically import the client wrapper with loading state
const ClientWrapper = dynamic(() => import("./components/ClientWrapper"), {
  ssr: true,
  loading: () => (
    <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-2 min-h-screen">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 grid grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-6 py-4 border-b border-gray-100 grid grid-cols-4 items-center">
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
              <div className="h-8 w-24 ml-auto bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
});

type ExamData = {
  id: string;
  examName: string;
  unitName: string;
  sectionName: string;
  marksScored: number;
  totalMarks: number;
};

async function getAttendedExams(studentId: number): Promise<ExamData[]> {
  const examScores = await prisma.examScore.findMany({
    where: {
      studentId,
      submitted: true,
    },
    select: {
      examId: true,
      score: true,
      exam: {
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              questions: true,
            },
          },
          unit: {
            select: {
              name: true,
              section: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    distinct: ["examId"],
  });

  return examScores.map((score) => ({
    id: score.exam.id.toString(),
    examName: score.exam.name,
    unitName: score.exam.unit.name,
    sectionName: score.exam.unit.section.name,
    marksScored: score.score,
    totalMarks: score.exam._count.questions,
  }));
}

export default function MyExamsPage() {
  return (
    <SessionWrapper>
      {(session) => <MyExamsContent session={session} />}
    </SessionWrapper>
  );
}

async function MyExamsContent({ session }: { session: Session }) {
  const attendedExams = await getAttendedExams(parseInt(session.user.id));

  return (
    <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-2 min-h-screen">
      <div className="max-w-screen-2xl mx-auto space-y-6">
        <ErrorBoundary>
          <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
            <ClientWrapper exams={attendedExams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
