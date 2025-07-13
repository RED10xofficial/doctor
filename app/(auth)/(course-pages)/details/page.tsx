import { Metadata } from "next";
import { Section, Exam } from "@prisma/client";
import { Suspense } from "react";
import LoadingState from "@/app/components/LoadingState";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import ClientWrapper from "./components/ClientWrapper";
import SessionWrapper from "../context/SessionWrapper";
import { Session } from "next-auth";
import { sessionApiClient } from "@/lib/session-api-client";
import { getErrorMessage } from "@/lib/api-utils";

export const metadata: Metadata = {
  title: "Course Details - Medical Education Platform",
  description: "Access comprehensive course materials and exams",
};

type SectionWithUnits = Section & {
  units: {
    id: string;
    name: string;
    description: string;
    urls?: string;
    sectionId: string;
    exams: Pick<Exam, 'id' | 'name' | 'duration' | 'unitId' | 'instruction'>[];
  }[];
};

export default function DetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <SessionWrapper>
      {(session) => <DetailsContent session={session} searchParams={searchParams} />}
    </SessionWrapper>
  );
}

async function DetailsContent({
  session,
  searchParams,
}: {
  session: Session;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams before accessing its properties
  const params = await searchParams;
  const currentSectionId = params.sectionId as string;
  const currentUnitId = params.unitId as string;

  // Fetch sections using the session-aware API client
  try {
    const response = await sessionApiClient.getSections(session.user.examType);
    const data = response.success ? response.data : [];
    
    return (
      <div className="bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 w-full min-h-screen">
        <div className="flex gap-4 p-4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingState type="content" />}>
              <ClientWrapper 
                sections={data} 
                initialSectionId={currentSectionId}
                initialUnitId={currentUnitId}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching sections:', error);
    return (
      <div className="bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 w-full min-h-screen">
        <div className="flex gap-4 p-4">
          <div className="w-full text-center py-8">
            <div className="text-gray-500">
              Unable to load course sections. Please try again later.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
