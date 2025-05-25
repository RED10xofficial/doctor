import { Metadata } from "next";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import LoadingState from "@/app/components/LoadingState";
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
  const examId = parseInt(resolvedParams.examId);
  const studentId = parseInt(session.user.id);

  // Fetch exam with questions, options, and statistics
  const exam = (await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      questions: {
        include: {
          question: {
            include: {
              options: true,
              examScores: {
                where: {
                  studentId,
                  examId
                },
              },
            },
          },
        },
      },
      examScores: {
        where: {
          studentId,
          examId
        },
      },
    },
  })) as ExamWithRelations | null;

  if (!exam) {
    redirect("/details");
  }

  // Calculate statistics
  const questions: ExamStatistics["questions"] = exam.questions.reduce(
    (acc: ExamStatistics["questions"], questionExam) => {
      const question = questionExam.question;
      acc[question.id] = {
        id: question.id,
        question: question.question,
        options: question.options.map((option: Option) => ({
          ...option,
          correctAnswer: option.optionKey === question.answer,
        })),
      };

      return acc;
    },
    {} as ExamStatistics["questions"]
  );

  const data: ExamStatistics["data"] = exam.questions.reduce(
    (acc: ExamStatistics["data"], questionExam) => {
      const question = questionExam.question;
      const correctAnswers = question.examScores.filter(
        (score: ExamScore) => score.isCorrect
      ).length;
      const incorrectAnswers = question.examScores.filter(
        (score: ExamScore) => !score.isCorrect
      ).length;
      const isCorrect = question.examScores.some(
        (score: ExamScore) => score.isCorrect
      );

      acc[question.id] = {
        totalCorrect: correctAnswers,
        totalInCorrect: incorrectAnswers,
        isCorrect,
      };

      return acc;
    },
    {} as ExamStatistics["data"]
  );

  const totalPoints = exam.examScores
    .filter((score: ExamScore) => score.isCorrect)
    .reduce((sum: number, score: ExamScore) => sum + score.score, 0);
  const maxPoints = exam.questions.length;

  const examData: ExamStatistics = {
    id: exam.id,
    name: exam.name,
    unitId: exam.unitId,
    instruction: exam.instruction || undefined,
    duration: exam.duration,
    totalPoints,
    maxPoints,
    questions,
    data,
  };

  return (
    <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-2 min-h-screen">
      <div className="max-w-screen-2xl mx-auto space-y-6 bg-white rounded-xl p-6 shadow-sm">
        <ErrorBoundary>
          <Suspense fallback={<LoadingState type="content" />}>
            <ClientWrapper examData={examData} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
