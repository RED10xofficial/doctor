import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Section, Exam } from "@prisma/client";
import { Suspense } from "react";
import LoadingState from "@/app/components/LoadingState";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import ClientWrapper from "./components/ClientWrapper";

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

export default async function DetailsPage({
  searchParams,
}: {
  searchParams: { currentSection?: string };
}) {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  // Await searchParams before accessing its properties
  const params = await Promise.resolve(searchParams);
  const currentSectionIndex = parseInt(params.currentSection || "0");

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
      <div className="flex gap-4 max-w-7xl mx-auto p-2 pt-4">
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
