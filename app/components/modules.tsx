"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "lucide-react";

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
}

export default function Modules({ sections, setCurrentIndex }: ModulesProps) {
  return (
    <div className="sticky top-[30px] h-[calc(100vh-30px)] bg-white shadow-lg mb-8 rounded-lg">
      <div className=" p-4  max-h-full overflow-y-auto overflow-x-hidden ">
        <div className="w-[300px] space-y-2">
          <div className="text-xl font-semibold mb-4">Course Modules</div>
          {sections?.map(
            (
              section,
              index // Use sections prop
            ) => (
              <Disclosure key={index} as="div">
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex w-full justify-between rounded-lg bg-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                      <span>{section.name}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-gray-500`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="px-4 pt-2 pb-2 text-sm text-gray-500">
                      <div className="space-y-2">
                        {section.units?.map((unit, unitIndex) => (
                          <div
                            key={unitIndex}
                            className="cursor-pointer hover:bg-gray-50 p-2 rounded"
                            onClick={() => setCurrentIndex(index, unitIndex)}
                          >
                            <div className="font-medium text-gray-900">
                              {unit.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {unit.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            )
          )}
          {/* Hardcoded items removed, now using sections prop */}
        </div>
      </div>
    </div>
  );
}
