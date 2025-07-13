import { Suspense } from "react";
import ExamClient from "./ExamClient";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import SessionWrapper from "../../../context/SessionWrapper";
import ExamAttemptedMessage from "@/app/components/ExamAttemptedMessage";
import { Session } from "next-auth";
import apiClient, { ErrorResponse } from "@/lib/api";
import { ErrorInjector } from "@/app/components/ErrorInjector";
import { auth } from "@/lib/auth";

async function checkExamAttempt(examId: string, studentId: string) {
  try {
    const session = await auth();
    const { data: response } = await apiClient.get(
      `/students/${studentId}/exams/${examId}`,
      {
        headers: {
          token: session?.accessToken,
        },
      }
    );
    if (response.success && response.data) {
      throw new Error("You have already attempted this exam.");
    }
  } catch (err) {
    const e = err as ErrorResponse;
    return {...e}
  }
}

async function getExamData(examId: string) {
  try {
    const { data: response } = await apiClient.get(`/questions/${examId}`);
    if (response.success && response.data) {
      return response.data;
    } else {
      return { error: response.message, status: response.status };
    }
  } catch (err) {
    const e = err as ErrorResponse;
    return { ...e };
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

async function ExamContent({
  examId,
  userId,
}: {
  examId: string;
  userId: string;
}) {
  try {
    await checkExamAttempt(examId, userId);
    const exam = await getExamData(examId);
    const { error, status } = exam;
    return (
      <>
        <ExamClient exam={exam} userId={userId} />;
        <ErrorInjector error={error} status={status} />
      </>
    );
  } catch (error) {
    return (
      <ExamAttemptedMessage
        message={
          error instanceof Error
            ? error.message
            : "You have already attempted this exam."
        }
      />
    );
  }
}
