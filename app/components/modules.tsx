"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ModulesProps {
  sections:
    | {
        id: number;
        name: string;
        units: {
          id: number;
          name: string;
          description: string;
          content: string;
          videoUrl: string;
          duration: number;
          sectionId: number;
        }[];
      }[]
    | undefined;
  setCurrentIndex: (sectionIndex: number, unitIndex: number) => void;
  currentSection: number;
  currentUnit: number;
}

export default function Modules({ 
  sections, 
  setCurrentIndex, 
  currentSection, 
  currentUnit 
}: ModulesProps) {
  const [openSections, setOpenSections] = useState<number[]>([]);

  useEffect(() => {
    if (currentSection !== -1 && !openSections.includes(currentSection)) {
      setOpenSections([currentSection]);
    }
  }, [currentSection]);

  const handleSectionClick = (sectionIndex: number) => {
    setOpenSections(prev => 
      prev.includes(sectionIndex) 
        ? prev.filter(id => id !== sectionIndex)
        : [...prev, sectionIndex]
    );
  };

  return (
    <div className="sticky top-[30px] h-[calc(100vh-30px)] bg-white shadow-lg mb-8 rounded-lg">
      <div className="p-4 max-h-full overflow-y-auto overflow-x-hidden">
        <div className="w-[300px] space-y-2">
          <div className="text-xl font-semibold mb-4">Course Modules</div>
          {sections?.map((section, index) => (
            <div key={index}>
              <button
                onClick={() => handleSectionClick(index)}
                className={`flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 ${
                  openSections.includes(index) ? 'bg-gray-200' : 'bg-gray-200'
                } ${
                  currentSection === index ? 'border border-blue-500' : ''
                }`}
              >
                <span>{section.name}</span>
                <ChevronUpIcon
                  className={`${
                    openSections.includes(index) ? "rotate-180 transform" : ""
                  } h-5 w-5 text-gray-500 transition-transform duration-300`}
                />
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openSections.includes(index) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 pt-2 pb-2 text-sm text-gray-500">
                  <div className="space-y-2">
                    {section.units?.map((unit, unitIndex) => (
                      <div
                        key={unitIndex}
                        className="cursor-pointer hover:bg-gray-50 p-2 rounded flex items-center gap-2"
                        onClick={() => setCurrentIndex(index, unitIndex)}
                      >
                        <div className="w-2 h-2 rounded-full flex-shrink-0">
                          {currentSection === index && currentUnit === unitIndex && (
                            <div className="w-full h-full rounded-full bg-blue-500"></div>
                          )}
                        </div>
                        <div className="font-medium text-gray-900">
                          {unit.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
