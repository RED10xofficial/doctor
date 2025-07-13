'use client';

import dynamic from 'next/dynamic';
import LoadingState from '@/app/components/LoadingState';
import { Section, Exam } from '@prisma/client';

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

const CourseContent = dynamic(() => import('./CourseContent'), {
  ssr: false,
  loading: () => <LoadingState type="content" />
});

interface ClientWrapperProps {
  sections: SectionWithUnits[];
  initialSectionId?: string;
  initialUnitId?: string;
}

export default function ClientWrapper({ sections, initialSectionId, initialUnitId }: ClientWrapperProps) {
  return (
    <CourseContent 
      sections={sections} 
      initialSectionId={initialSectionId}
      initialUnitId={initialUnitId}
    />
  );
} 