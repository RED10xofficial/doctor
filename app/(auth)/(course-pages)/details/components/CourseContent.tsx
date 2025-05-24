'use client';

import { useState, useCallback } from 'react';
import { Section, Exam } from '@prisma/client';
import Modules from '@/app/components/modules';
import { AlignRightIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

// Dynamically import heavy components
const ExamList = dynamic(() => import('./examList'), { ssr: false });
const Popup = dynamic(() => import('@/app/components/popup'), { ssr: false });

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

export default function CourseContent({ sections, initialSectionIndex }: CourseContentProps) {
  const [openModules, setOpenModules] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(initialSectionIndex);
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
  const [isExamPopupOpen, setIsExamPopupOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const setCurrentIndex = useCallback((sectionIndex: number, unitIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentUnitIndex(unitIndex);
    
    // Update URL without full page reload
    if (searchParams) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('currentSection', sectionIndex.toString());
      router.push(`?${newParams.toString()}`, { scroll: false });
    }
  }, [router, searchParams]);

  const currentSection = sections[currentSectionIndex];
  const currentUnit = currentSection?.units[currentUnitIndex];

  return (
    <>
      <div className="hidden md:block">
        <Modules
          sections={sections}
          setCurrentIndex={setCurrentIndex}
          currentSection={currentSectionIndex}
          currentUnit={currentUnitIndex}
        />
      </div>
      <div className="flex-1 bg-white rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-600">
              {currentUnit?.name}
            </h2>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <p className="ml-2 text-gray-500 text-sm">
                {currentSection?.name}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-sky-400 text-white px-4 py-2 ml-2 rounded-lg text-sm hover:bg-sky-500 transition-colors"
              onClick={() => setIsExamPopupOpen(true)}
            >
              Exams
            </button>
            <button
              type="button"
              className="block md:hidden bg-sky-400 text-white px-3 py-2 ml-2 rounded-lg text-sm hover:bg-sky-500 transition-colors"
              onClick={() => setOpenModules(!openModules)}
              title="Modules"
            >
              <AlignRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-600">Description</h2>
          <div 
            className="text-gray-500 text-sm mt-2 prose prose-sm max-w-none" 
            dangerouslySetInnerHTML={{ __html: currentUnit?.description || '' }}
          />
        </div>

        <Popup isOpen={isExamPopupOpen} setIsOpen={setIsExamPopupOpen} title="All Exams">
          <ExamList exams={currentUnit?.exams ?? []} />
        </Popup>
      </div>
    </>
  );
} 