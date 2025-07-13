import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoadingState from "./loading";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import ClientWrapper from "./components/ClientWrapper";
import SessionWrapper from "../../context/SessionWrapper";
import { Session } from "next-auth";
import apiClient, { ErrorResponse } from "@/lib/api";
import { ErrorInjector } from "@/app/components/ErrorInjector";

export const metadata: Metadata = {
  title: "Detailed Result - Medical Education Platform",
  description: "View detailed exam results and statistics",
};

interface PageProps {
  params: Promise<{ examId: string }>;
}

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

  // Fetch detailed exam data using the session-aware API client
  let data;
  try {
    const { data: response } = await apiClient.get(
      `/auth/students/${studentId}/exams/${examId}`,
      {
        headers: {
          token: session.accessToken,
        },
      }
    );
    data = response.success ? response.data : null;

    if (!data) {
      redirect("/details");
    }
  } catch (err) {
    const e = err as ErrorResponse;
    data = e;
  }

  const { error, status } = data;

  return (
    <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-2 min-h-screen">
      <div className="space-y-6 bg-white rounded-xl p-4 shadow-sm">
        <ErrorBoundary>
          <Suspense fallback={<LoadingState />}>
            <ClientWrapper examData={data} />
          </Suspense>
          <ErrorInjector error={error} status={status} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
