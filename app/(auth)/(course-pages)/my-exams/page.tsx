import prisma from "@/lib/prisma";
import SessionWrapper from "../context/SessionWrapper";
import { Session } from "next-auth";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import { ExamScore } from "@prisma/client";

// Dynamically import the client wrapper with loading state
const ClientWrapper = dynamic(() => import("./components/ClientWrapper"), {
  ssr: true,
  loading: () => (
    <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-2 min-h-screen">
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 grid grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 w-24 bg-gray-200 animate-pulse rounded"
              />
            ))}
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="px-6 py-4 border-b border-gray-100 grid grid-cols-4 items-center"
            >
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
          examScores: {
            where: {
              studentId,
              submitted: true,
            }
          }
        },
      },
    },
    distinct: ["examId"],
  });

  return examScores.map((score) => {
    const totalPoints = score.exam.examScores
      .filter((examScore: ExamScore) => examScore.isCorrect)
      .reduce((sum: number, examScore: ExamScore) => sum + examScore.score, 0);
    return {
      id: score.exam.id.toString(),
      examName: score.exam.name,
      unitName: score.exam.unit.name,
      sectionName: score.exam.unit.section.name,
      marksScored: totalPoints,
      totalMarks: score.exam._count.questions,
    }
  });
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
  if (attendedExams.length === 0) {
    return (
      <div className="flex-1 relative bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-2 min-h-[calc(100vh-6rem)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="text-center text-2xl">No exams attended yet</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-2 min-h-screen">
      <div className="p-4 space-y-6">
        <ErrorBoundary>
          <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
            <ClientWrapper exams={attendedExams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
