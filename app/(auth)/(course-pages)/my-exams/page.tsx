import prisma from "@/lib/prisma";
import SessionWrapper from "../context/SessionWrapper";
import { Session } from "next-auth";
import { ExamScore } from "@prisma/client";
import { Suspense } from "react";
import LoadingState from "@/app/components/LoadingState";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import ClientWrapper from "./components/ClientWrapper";

async function getAttendedExams(studentId: number) {
  const examScores = await prisma.examScore.findMany({
    where: {
      studentId,
      submitted: true,
    },
    include: {
      exam: {
        include: {
          unit: {
            include: {
              section: true,
            },
          },
          questions: true,
          examScores: {
            where: {
              studentId,
            },
          },
        },
      },
    },
    distinct: ["examId"],
  });

  return examScores.map((score) => {
    // Calculate total points for correct answers
    const totalPoints = score.exam.examScores
      .filter((examScore: ExamScore) => examScore.isCorrect)
      .reduce((sum: number, examScore: ExamScore) => sum + examScore.score, 0);

    return {
      id: score.exam.id.toString(),
      examName: score.exam.name,
      unitName: score.exam.unit.name,
      sectionName: score.exam.unit.section.name,
      marksScored: totalPoints,
      totalMarks: score.exam.questions.length,
    };
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

  return (
    <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-2 min-h-screen">
      <div className="max-w-screen-2xl mx-auto space-y-6 rounded-xl shadow-sm">
        <ErrorBoundary>
          <Suspense fallback={<LoadingState type="content" />}>
            <ClientWrapper exams={attendedExams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
