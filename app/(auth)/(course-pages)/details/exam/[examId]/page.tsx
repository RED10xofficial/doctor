import { Suspense } from "react";
import ExamClient from "./ExamClient";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import prisma from "@/lib/prisma";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import SessionWrapper from "../../../context/SessionWrapper";
import { Session } from "next-auth";

async function getExamData(examId: string) {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: parseInt(examId) },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });
    
    if (!exam) {
      throw new Error("Exam not found");
    }
    
    return exam;
  } catch {
    throw new Error("Failed to load exam");
  }
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  
  return (
    <SessionWrapper>
      {(session: Session) => (
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <ExamContent examId={examId} userId={session.user.id} />
          </Suspense>
        </ErrorBoundary>
      )}
    </SessionWrapper>
  );
}

async function ExamContent({ examId, userId }: { examId: string; userId: string }) {
  const exam = await getExamData(examId);
  return <ExamClient exam={exam} userId={userId} />;
}
