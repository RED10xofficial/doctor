"use client";

import Modules from "@/app/components/modules";
import Popup from "@/app/components/popup";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { AlignRightIcon } from "lucide-react";
import { Fragment, useState, useCallback, useEffect } from "react";
import ExamList from "./components/examList";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Exam, Section } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface SectionWithUnits extends Section {
  units: UnitWithExams[];
}

interface UnitWithExams {
  id: number;
  name: string;
  description: string;
  content: string;
  videoUrl: string;
  duration: number;
  sectionId: number;
  exams: Exam[];
}

interface CourseDetailsProps {
  sections: SectionWithUnits[] | undefined;
  setOpenModules: (openModules: boolean) => void;
  openModules: boolean;
  currentSectionIndex: number;
  currentUnitIndex: number;
}

export default function DetailsPage() {
  const [openModules, setOpenModules] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial section from query params
  useEffect(() => {
    const sectionParam = searchParams?.get("currentSection");
    if (sectionParam) {
      setCurrentSectionIndex(parseInt(sectionParam));
    }
  }, [searchParams]);

  // Use useCallback to memoize the setCurrentIndex function
  const setCurrentIndex = useCallback(
    (sectionIndex: number, unitIndex: number) => {
      setCurrentSectionIndex(sectionIndex);
      setCurrentUnitIndex(unitIndex);
      // Update the URL with the new section index
      if (searchParams) {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("currentSection", sectionIndex.toString());
        router.push(`?${newParams.toString()}`);
      }
    },
    [router, searchParams]
  );

  const { data: sections, error, isLoading } = useSWR<SectionWithUnits[]>(
    "/api/sections",
    fetcher
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Failed to load sections</div>;
  }

  return (
    <div className="bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 w-full min-h-screen">
      <div className="flex gap-4 max-w-7xl mx-auto p-2 pt-4">
        <div className="hidden md:block">
          {sections && (
            <Modules 
            sections={sections} 
            setCurrentIndex={setCurrentIndex} 
            currentSection={currentSectionIndex}
            currentUnit={currentUnitIndex}
          />
          )}
        </div>
        <div className="flex-1 bg-white rounded-lg p-4">
          {sections && (
            <CourseDetails
              sections={sections}
              setOpenModules={setOpenModules}
              openModules={openModules}
              currentSectionIndex={currentSectionIndex}
              currentUnitIndex={currentUnitIndex}
            />
          )}
        </div>
      </div>
      <Transition appear show={openModules} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenModules(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  ></DialogTitle>
                  <div className="mt-2">
                    {sections && (
                      <Modules
                        sections={sections}
                        setCurrentIndex={setCurrentIndex}
                        currentSection={currentSectionIndex}
                        currentUnit={currentUnitIndex}
                      />
                    )}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                      onClick={() => setOpenModules(false)}
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

// Extracted CourseDetails component
const CourseDetails = (props: CourseDetailsProps) => {
  const { sections, setOpenModules, openModules, currentSectionIndex, currentUnitIndex } = props;
  const [isOpen, setIsOpen] = useState(false);

  // Directly use the props for currentSectionIndex and currentUnitIndex
  // No need to use useRef as these are already managed by the parent component's state
  const currentSection = sections?.[currentSectionIndex];
  const currentUnit = currentSection?.units?.[currentUnitIndex];

  // Safely access exams using optional chaining
  const exams = currentUnit?.exams;

  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-600">
            {currentUnit?.name}
          </h2>
          <div>
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
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-sky-400 text-white px-4 py-2 ml-2 rounded-lg text-sm"
            onClick={() => setIsOpen(true)}
          >
            Exams
          </button>
          <button
            type="button"
            className="block md:hidden bg-sky-400 text-white px-3 py-2 ml-2 rounded-lg text-sm"
            onClick={() => setOpenModules(!openModules)}
            title="Modules"
          >
            <AlignRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-4 border-b pb-4"></p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-600">Description</h2>
        <div className="text-gray-500 text-sm mt-2" dangerouslySetInnerHTML={{ __html: currentUnit?.description || '' }}>
        </div>
      </div>
      <Popup isOpen={isOpen} setIsOpen={setIsOpen} title="All Exams">
        <ExamList exams={exams ?? []} />
      </Popup>
    </>
  );
};
