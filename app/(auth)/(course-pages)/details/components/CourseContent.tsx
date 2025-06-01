"use client";

import { useState, useCallback } from "react";
import { Section, Exam } from "@prisma/client";
import Modules from "@/app/components/modules";
import { AlignRightIcon, BookOpenIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import VideoList from "./videoList";

// Dynamically import heavy components
const ExamList = dynamic(() => import("./examList"), { ssr: false });
const Popup = dynamic(() => import("@/app/components/popup"), { ssr: false });

type SectionWithUnits = Section & {
  units: {
    id: number;
    name: string;
    description: string;
    urls?: string;
    sectionId: number;
    exams: Pick<Exam, "id" | "name" | "duration" | "unitId" | "instruction">[];
  }[];
};

interface CourseContentProps {
  sections: SectionWithUnits[];
  initialSectionIndex: number;
}

export default function CourseContent({
  sections,
  initialSectionIndex,
}: CourseContentProps) {
  const [openModules, setOpenModules] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] =
    useState(initialSectionIndex);
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
  const [isExamPopupOpen, setIsExamPopupOpen] = useState(false);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const setCurrentIndex = useCallback(
    (sectionIndex: number, unitIndex: number) => {
      setCurrentSectionIndex(sectionIndex);
      setCurrentUnitIndex(unitIndex);

      // Update URL without full page reload
      if (searchParams) {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("currentSection", sectionIndex.toString());
        router.push(`?${newParams.toString()}`, { scroll: false });
      }
    },
    [router, searchParams]
  );

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
      <div className="flex-1 bg-white rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#202020] capitalize mb-2">
              {currentUnit?.name}
              <button
                className="text-[#702DFF] bg-transparent border-none outline-none text-sm ms-2"
                onClick={() => setIsVideoPopupOpen(true)}
              >
                {`(${currentUnit?.urls?.split(",").length ?? 0} Videos)`}
              </button>
            </h2>
            <div className="flex items-center">
              <BookOpenIcon className="w-4 h-4 text-[#702DFF]" />
              <p className="ml-2 text-[#7E7E7E] text-sm font-medium capitalize">
                {currentSection?.name}
              </p>
              {/* {currentUnit?.duration && (
                <div className="flex items-center ml-4">
                  <ClockIcon className="w-4 h-4 text-[#702DFF]" />
                  <span className="ml-1 text-[#7E7E7E] text-sm">
                    {currentUnit.duration} min
                  </span>
                </div>
              )} */}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-[#702DFF] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5924cc] transition-colors font-medium"
              onClick={() => setIsExamPopupOpen(true)}
            >
              Exams
            </button>
            <button
              type="button"
              className="block md:hidden bg-[rgba(112,45,255,0.2)] text-[#702DFF] px-3 py-2 rounded-lg text-sm hover:bg-[rgba(112,45,255,0.3)] transition-colors"
              onClick={() => setOpenModules(!openModules)}
              title="Modules"
            >
              <AlignRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 bg-[rgba(112,45,255,0.03)] p-5 rounded-xl">
          <h2 className="text-xl font-semibold text-[#202020] capitalize mb-3">
            Description
          </h2>
          <div
            className="text-[#5F5F5F] text-base mt-2 prose prose-sm max-w-none first-letter:capitalize"
            dangerouslySetInnerHTML={{ __html: currentUnit?.description || "" }}
          />
        </div>

        <Popup
          isOpen={isExamPopupOpen}
          setIsOpen={setIsExamPopupOpen}
          title="All Exams"
          className="max-w-md"
        >
          <ExamList exams={currentUnit?.exams ?? []} />
        </Popup>
        <Popup
          isOpen={isVideoPopupOpen}
          setIsOpen={setIsVideoPopupOpen}
          title="All Videos"
          className="max-w-3xl"
        >
          <VideoList videos={currentUnit?.urls ?? ""} />
        </Popup>
      </div>
    </>
  );
}
