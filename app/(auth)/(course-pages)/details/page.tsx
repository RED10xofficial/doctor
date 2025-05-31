import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Section, Exam } from "@prisma/client";
import { Suspense } from "react";
import LoadingState from "@/app/components/LoadingState";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import ClientWrapper from "./components/ClientWrapper";
import SessionWrapper from "../context/SessionWrapper";
import { Session } from "next-auth";

export const metadata: Metadata = {
  title: "Course Details - Medical Education Platform",
  description: "Access comprehensive course materials and exams",
};

type SectionWithUnits = Section & {
  units: {
    id: number;
    name: string;
    description: string;
    content: string;
    videoUrl: string;
    duration: number;
    sectionId: number;
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
  const currentSectionIndex = parseInt((params.currentSection as string) || "0");

  // Fetch sections with units and exams in a single query
  const sections = await prisma.section.findMany({
    where: {
      examType: session.user.examType
    },
    include: {
      units: {
        include: {
          exams: {
            select: {
              id: true,
              name: true,
              duration: true,
              unitId: true,
              instruction: true,
            },
          },
        },
      },
    },
    orderBy: {
      name: 'asc'
    }
  }) as SectionWithUnits[];

  return (
    <div className="bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 w-full min-h-screen">
      <div className="flex gap-4 max-w-screen-2xl mx-auto p-2 pt-4">
        <ErrorBoundary>
          <Suspense fallback={<LoadingState type="content" />}>
            <ClientWrapper 
              sections={sections} 
              initialSectionIndex={currentSectionIndex}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
