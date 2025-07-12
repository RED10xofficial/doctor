"use client";
import { ChevronUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ModulesProps {
  sections:
    | {
        id: string;
        name: string;
        units: {
          id: string;
          name: string;
          description: string;
          sectionId: string;
          urls?: string;
          exams?: any[];
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
  currentUnit,
}: ModulesProps) {
  const [openSections, setOpenSections] = useState<number[]>([]);

  useEffect(() => {
    if (currentSection !== -1 && !openSections.includes(currentSection)) {
      setOpenSections([currentSection]);
    }
  }, [currentSection, openSections]);

  const handleSectionClick = (sectionIndex: number) => {
    setOpenSections((prev) =>
      prev.includes(sectionIndex)
        ? prev.filter((id) => id !== sectionIndex)
        : [...prev, sectionIndex]
    );
  };

  return (
    <div className="sticky top-[30px] h-[calc(100vh-30px)] bg-white shadow-lg mb-8 rounded-lg overflow-hidden">
      <div className="p-4 max-h-full overflow-y-auto overflow-x-hidden">
        <div className="w-[250px] space-y-3">
          <div className="text-xl font-semibold mb-5 text-[#202020] capitalize border-b border-gray-100 pb-2">
            Course Modules
          </div>
          {sections?.map((section, index) => (
            <div key={index} className="mb-3">
              <button
                onClick={() => handleSectionClick(index)}
                className={`flex w-full justify-between rounded-lg px-4 py-2.5 text-left text-sm font-medium focus:outline-none focus-visible:ring ${
                  openSections.includes(index)
                    ? "bg-[rgba(112,45,255,0.1)] text-[#702DFF]"
                    : "bg-gray-50 text-[#202020] hover:bg-gray-100"
                } ${
                  currentSection === index ? "border-l-4 border-[#702DFF]" : ""
                } transition-all duration-200`}
              >
                <span className="capitalize">{section.name}</span>
                <ChevronUpIcon
                  className={`${
                    openSections.includes(index) ? "rotate-180 transform" : ""
                  } h-5 w-5 transition-transform duration-300 ${
                    openSections.includes(index)
                      ? "text-[#702DFF]"
                      : "text-gray-500"
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openSections.includes(index)
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-2 pt-2 pb-2 text-sm">
                  <div className="space-y-1">
                    {section.units?.map((unit, unitIndex) => (
                      <div
                        key={unitIndex}
                        className={`cursor-pointer p-2.5 rounded-lg flex items-center gap-3 transition-colors ${
                          currentSection === index && currentUnit === unitIndex
                            ? "bg-[rgba(112,45,255,0.1)] text-[#702DFF]"
                            : "hover:bg-gray-50 text-[#7E7E7E]"
                        }`}
                        onClick={() => setCurrentIndex(index, unitIndex)}
                      >
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            currentSection === index &&
                            currentUnit === unitIndex
                              ? "bg-[#702DFF]"
                              : "border border-gray-300"
                          }`}
                        ></div>
                        <div
                          className={`font-medium capitalize ${
                            currentSection === index &&
                            currentUnit === unitIndex
                              ? "text-[#702DFF]"
                              : "text-[#202020]"
                          }`}
                        >
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
