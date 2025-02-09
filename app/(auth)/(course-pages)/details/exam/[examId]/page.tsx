"use client";

import Popup from "@/app/components/popup";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import ExamInstructions from "../../components/examInstructions";
import { redirect, useParams } from "next/navigation";
import useSWR from "swr";
import { useSession } from "next-auth/react";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

interface Exam {
  id: string;
  name: string;
  instruction: string;
  questions: Question[];
}

export default function ExamPage() {
  const [time, setTime] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const session = useSession();

  const params = useParams<{ examId: string }>();
  const examId = params?.examId;

  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      // Attach extra info to the error object.
      // @ts-expect-error Property 'status' does not exist on type 'Error'.
      error.status = res.status;
      throw error;
    }
    return res.json();
  };

  const {
    data: exam,
    error,
    isLoading,
  } = useSWR<Exam>(examId ? `/api/exam/${examId}` : null, fetcher);

  useEffect(() => {
    if (error) {
      console.error("Error fetching exam:", error);
      // Optionally redirect to an error page or display an error message
    }
  }, [error]);

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

  if (isLoading) {
    return <div>Loading exam...</div>;
  }

  if (error || !exam) {
    return <div>Error loading exam.</div>;
  }

  const indexToOptionLetter = (index: number) => {
    const options: { [key: string]: string } = {
      0: "a",
      1: "b",
      2: "c",
      3: "d",
      4: "e",
      5: "f",
    };
    return options[`${index}`];
  };

  const answerQuestion = async (
    questionId: string,
    answer: number,
    optionId: string
  ) => {
    await fetch("/api/submit-answer", {
      method: "POST",
      body: JSON.stringify({
        questionId,
        examId,
        studentId: session.data?.user.id,
        answerText: indexToOptionLetter(answer),
        studentAnswer: optionId,
        score: 1,
      }),
    });
  };

  return (
    <>
      <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between bg-gray-200/50 backdrop-blur-sm p-4 rounded-lg sticky top-0 z-10">
            <div>
              <h1 className="text-2xl font-semibold">
                {exam?.name || "Loading..."}
              </h1>
              <p className="text-gray-500 text-sm">
                {exam?.instruction || "Loading exam description..."}
              </p>
            </div>
            <div className="flex items-center gap-2 min-w-20">
              <Timer className="w-6 text-gray-500" />
              <p className="text-gray-500">{formatTime(time)}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {exam?.questions?.map((question: Question, index: number) => (
              <div key={question.id} className="bg-white rounded-lg p-4">
                <h2 className="text-lg font-semibold">Question {index + 1}</h2>
                <p className="text-gray-500">{question.question}</p>
                <div className="mt-4">
                  {question.options.map((option: Option, index: number) => (
                    <div className="flex items-center mb-3" key={option.id}>
                      <input
                        type="radio"
                        name={`question-${question.id}`} // Unique name for each question
                        id={`option-${option.id}`} // Unique id for each option
                        onChange={() => {
                          answerQuestion(question.id, index, option.id);
                        }}
                      />
                      <label
                        htmlFor={`option-${option.id}`}
                        className="ml-2 text-gray-500"
                      >
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Popup
        isOpen={isOpen}
        setIsOpen={closeExam}
        title="Exam Instructions"
        backdrop
      >
        <ExamInstructions onStart={startTimer} />
      </Popup>
    </>
  );
}
