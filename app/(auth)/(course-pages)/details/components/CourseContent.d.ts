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

interface CourseContentProps {
  sections: SectionWithUnits[];
  initialSectionIndex: number;
}

declare const CourseContent: React.FC<CourseContentProps>;
export default CourseContent; 