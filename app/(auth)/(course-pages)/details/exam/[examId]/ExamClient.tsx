"use client";

import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import Popup from "@/app/components/popup";
import ExamInstructions from "../../components/examInstructions";
import { useSnackbar } from "@/app/components/Snackbar";
import { Option } from '@prisma/client';
import { submitAnswer, submitExam } from "../actions";

interface Question {
  id: number;
  question: string;
  questionSlug: string;
  difficulty: string | null;
  options: Option[];
}

interface Exam {
  id: number;
  name: string;
  instruction: string | null;
  duration: number;
  questions: {
    question: Question;
  }[];
}

interface ExamClientProps {
  exam: Exam;
  userId: string;
}

export default function ExamClient({ exam, userId }: ExamClientProps) {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
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

  const closeExam = async () => {
    await handleSubmitExam();
    setIsOpen(false);
    router.push("/details");
  };

  const handleAnswerQuestion = async (
    questionId: number,
    answer: string,
    optionId: number
  ) => {
    try {
      await submitAnswer({
        questionId,
        examId: exam.id,
        studentId: userId,
        answerText: answer,
        studentAnswer: optionId,
        score: 1,
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
      showSnackbar("Failed to submit answer", "error");
    }
  };

  const handleSubmitExam = async () => {
    try {
      await submitExam({
        studentId: userId,
        examId: exam.id,
      });
      showSnackbar("Your answers have been submitted", "success");
      router.push(`/detailed-result/${exam.id}`);
    } catch {
      showSnackbar("Failed to submit exam", "error");
    }
  };

  return (
    <>
      <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between bg-gray-200/50 backdrop-blur-sm p-4 rounded-lg sticky top-0 z-10">
            <div>
              <h1 className="text-2xl font-semibold">{exam.name}</h1>
              <p className="text-gray-500 text-sm">{exam.instruction}</p>
            </div>
            <div className="flex items-center gap-2 min-w-20">
              <Timer className="w-6 text-gray-500" />
              <p className="text-gray-500">{formatTime(time)}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {exam.questions.map((questionExam, index: number) => {
              const question = questionExam.question;
              return (
                <div key={question.id} className="bg-white rounded-lg p-4">
                  <h2 className="text-lg font-semibold">Question {index + 1}</h2>
                  <p className="text-gray-500">{question.question}</p>
                  <div className="mt-4">
                    {question.options.map((option: Option) => (
                      <div className="flex items-center mb-3" key={option.id}>
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          id={`option-${option.id}`}
                          onChange={() => {
                            handleAnswerQuestion(question.id, option.optionKey, option.id);
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
              );
            })}
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="bg-sky-400 text-white py-2 px-4 rounded-lg hover:bg-sky-500 transition-colors duration-300"
              onClick={handleSubmitExam}
            >
              Submit
            </button>
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