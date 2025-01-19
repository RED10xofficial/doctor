"use client";

import Popup from "@/app/components/popup";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import ExamInstructions from "../components/examInstructions";
import { redirect } from "next/navigation";

export default function ExamPage() {
  const [time, setTime] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setIsOpen(false);
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setIntervalId(interval);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const closeExam = () => {
    setIsOpen(false);
    redirect("/details");
  };
  return (
    <>
      <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between bg-gray-200/50 backdrop-blur-sm p-4 rounded-lg sticky top-0 z-10">
            <div>
              <h1 className="text-2xl font-semibold">Angular Best Practices</h1>
              <p className="text-gray-500 text-sm">
                This is the optional caption for the exam.
              </p>
            </div>
            <div className="flex items-center gap-2 min-w-20">
              <Timer className="w-6 text-gray-500" />
              <p className="text-gray-500">{formatTime(time)}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg font-semibold">Question 1</h2>
              <p className="text-gray-500">
                What is the best practice for handling errors in Angular?
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 1
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 2
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 3
                  </label>
                </div>
                <div className="flex items-center mb-3">
                  <input type="radio" name="question1" id="question1" />
                  <label htmlFor="question1" className="ml-2 text-gray-500">
                    Option 4
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup isOpen={isOpen} setIsOpen={closeExam} title="Exam Instructions" backdrop>
        <ExamInstructions onStart={startTimer} />
      </Popup>
    </>
  );
}
