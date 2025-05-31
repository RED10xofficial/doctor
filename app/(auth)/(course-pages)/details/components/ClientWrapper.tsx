'use client';

import dynamic from 'next/dynamic';
import LoadingState from '@/app/components/LoadingState';
import { Section, Exam } from '@prisma/client';

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

const CourseContent = dynamic(() => import('./CourseContent'), {
  ssr: false,
  loading: () => <LoadingState type="content" />
});

interface ClientWrapperProps {
  sections: SectionWithUnits[];
  initialSectionIndex: number;
}

export default function ClientWrapper({ sections, initialSectionIndex }: ClientWrapperProps) {
  return (
    <CourseContent 
      sections={sections} 
      initialSectionIndex={initialSectionIndex}
    />
  );
} 