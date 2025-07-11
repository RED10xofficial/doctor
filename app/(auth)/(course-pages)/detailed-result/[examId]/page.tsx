import { Metadata } from "next";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import LoadingState from "./loading";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import ClientWrapper from "./components/ClientWrapper";
import { Option, Exam, Question, ExamScore } from "@prisma/client";
import SessionWrapper from "../../context/SessionWrapper";
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: "Detailed Result - Medical Education Platform",
  description: "View detailed exam results and statistics",
};

interface PageProps {
  params: Promise<{ examId: string }>;
}

interface ExamStatistics {
  id: number;
  name: string;
  unitId: number;
  instruction?: string;
  duration: number;
  totalPoints: number;
  maxPoints: number;
  questions: {
    [questionId: number]: {
      id: number;
      question: string;
      options: OptionType[];
    };
  };
  data: {
    [questionId: number]: {
      totalCorrect: number;
      totalInCorrect: number;
      isCorrect: boolean;
    };
  };
}

type OptionType = Option & {
  correctAnswer: boolean;
};

type QuestionWithRelations = Question & {
  options: Option[];
  examScores: ExamScore[];
};

type ExamWithRelations = Exam & {
  questions: {
    question: QuestionWithRelations;
  }[];
  examScores: ExamScore[];
};

export default function DetailedResultPage({ params }: PageProps) {
  return (
    <SessionWrapper>
      {(session) => <DetailedResultContent session={session} params={params} />}
    </SessionWrapper>
  );
}

async function DetailedResultContent({
  session,
  params,
}: {
  session: Session;
  params: Promise<{ examId: string }>;
}) {
  const resolvedParams = await params;
  const examId = resolvedParams.examId;
  const studentId = session.user.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REST_URL}/auth/students/${studentId}/exams/${examId}`,
    { headers: { token: session.accessToken as string } }
  );

  const {data} = await res.json()

  if (!data) {
    redirect("/details");
  }

  return (
    <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-2 min-h-screen">
      <div className="space-y-6 bg-white rounded-xl p-4 shadow-sm">
        <ErrorBoundary>
          <Suspense fallback={<LoadingState />}>
            <ClientWrapper examData={data} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
