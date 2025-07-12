import { Suspense } from "react";
import ExamClient from "./ExamClient";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import SessionWrapper from "../../../context/SessionWrapper";
import ExamAttemptedMessage from "@/app/components/ExamAttemptedMessage";
import { Session } from "next-auth";
import { sessionApiClient } from "@/lib/session-api-client";
import { getErrorMessage } from "@/lib/api-utils";

async function checkExamAttempt(examId: string, studentId: string) {
  try {
    const response = await sessionApiClient.getExamResult(studentId, examId);
    if (response.success && response.data) {
      throw new Error('You have already attempted this exam.');
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('already attempted')) {
      throw error;
    }
    // If it's not an "already attempted" error, we can proceed with the exam
  }
}

async function getExamData(examId: string) {
  try {
    const response = await sessionApiClient.getExam(examId);
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error("Exam not found");
    }
  } catch (error) {
    console.error('Error fetching exam data:', error);
    throw new Error("Exam not found");
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
            <ExamContent examId={examId} userId={session.user.id} session={session} />
          </Suspense>
        </ErrorBoundary>
      )}
    </SessionWrapper>
  );
}

async function ExamContent({ examId, userId, session }: { examId: string; userId: string, session: Session }) {
  try {
    await checkExamAttempt(examId, userId);
    const exam = await getExamData(examId);
    return <ExamClient exam={exam} userId={userId}/>;
  } catch (error) {
    return (
      <ExamAttemptedMessage 
        message={error instanceof Error ? error.message : 'You have already attempted this exam.'} 
      />
    );
  }
}
