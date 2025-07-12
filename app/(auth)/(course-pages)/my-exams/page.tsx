import SessionWrapper from "../context/SessionWrapper";
import { Session } from "next-auth";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import { sessionApiClient } from "@/lib/session-api-client";
import { getErrorMessage } from "@/lib/api-utils";

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
  name: string;
  unitName: string;
  sectionName: string;
  marksScored: number;
  totalMarks: number;
};

async function getAttendedExams(studentId: string): Promise<ExamData[]> {
  try {
    const response = await sessionApiClient.getUserExams(studentId);
    if (response.success) {
      return Array.isArray(response.data) ? response.data : [];
    } else {
      console.error('Failed to fetch user exams:', getErrorMessage(response));
      return [];
    }
  } catch (error) {
    console.error("Error fetching user exams:", error);
    return [];
  }
}

export default function MyExamsPage() {
  return (
    <SessionWrapper>
      {(session) => <MyExamsContent session={session} />}
    </SessionWrapper>
  );
}

async function MyExamsContent({ session }: { session: Session }) {
  const attendedExams = await getAttendedExams(session?.user?.id as string);
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
