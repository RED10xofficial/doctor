"use client";

import { Option } from "@prisma/client";
import { ReceiptText } from "lucide-react";

type OptionType = Option & { correctAnswer: boolean };

// Define the type for the exam statistics
interface ExamStatistics {
  id: number;
  name: string;
  unitId: number;
  instruction?: string;
  duration: number;
  totalPoints: number;
  maxPoints: number;
  questions: {
    [questionId: number]: {
      id: number;
      question: string;
      options: OptionType[];
    };
  };
  data: {
    [questionId: number]: {
      totalCorrect: number;
      totalInCorrect: number;
      isCorrect: boolean;
    };
  };
}

// Define the props for the QuestionResult component
interface QuestionResultProps {
  question: ExamStatistics["questions"][number];
  index: number;
  examData: ExamStatistics["data"];
}

// Create a QuestionResult component to render each question
function QuestionResult({ question, index, examData }: QuestionResultProps) {
  const totalCorrect = examData[question.id]?.totalCorrect ?? 0;
  const totalInCorrect = examData[question.id]?.totalInCorrect ?? 0;

  const totalAttempts = totalCorrect + totalInCorrect;

  const totalAttemptPercent = totalAttempts
    ? ((totalCorrect / totalAttempts) * 100).toFixed(1)
    : 0;

  return (
    <div
      key={question.id}
      className={`bg-gray-100 rounded-lg p-6 space-y-4  ${
        examData[question.id]?.isCorrect ? "" : "bg-red-50"
      }`}
    >
      <h3 className="font-medium">{`${index + 1}. ${question.question}`}</h3>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`p-3 rounded-md flex items-center gap-2 text-sm  ${
              option.correctAnswer
                ? "text-green-800 font-semibold bg-green-200"
                : "text-gray-700"
            }`}
          >
            {`Option ${option.optionKey}: ${option.text}`}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <span>Response Statistics:</span>
          <span className="font-medium">{totalAttemptPercent}% Correct</span>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-400 h-2 rounded-full"
            style={{
              width: `${totalAttemptPercent}%`,
            }}
          ></div>
        </div>
        <div className="mt-1 flex justify-between text-xs">
          <span>{totalCorrect} correct answers</span>
          <span>{totalInCorrect} incorrect answers</span>
        </div>
      </div>
    </div>
  );
}

interface ClientWrapperProps {
  examData: ExamStatistics;
}

export default function ClientWrapper({ examData }: ClientWrapperProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <ReceiptText className="text-gray-500" />
          Detailed Result
        </h1>
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-20 h-20">
            <circle
              className="text-gray-200"
              strokeWidth="5"
              stroke="currentColor"
              fill="transparent"
              r="32"
              cx="40"
              cy="40"
            />
            <circle
              className="text-green-500"
              strokeWidth="5"
              stroke="currentColor"
              fill="transparent"
              r="32"
              cx="40"
              cy="40"
              strokeDasharray={201.06} // 2 * π * r
              strokeDashoffset={
                201.06 - 201.06 * (examData.totalPoints / examData.maxPoints)
              }
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-gray-700 text-sm">
            <span className="font-semibold text-2xl">{examData.totalPoints}</span>
            <span className="text-sm">/{examData.maxPoints}</span>
          </span>
        </div>
      </div>

      {/* Render the questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {examData.questions &&
          Object.values(examData.questions).map((question, index) => (
            <QuestionResult
              key={question.id}
              question={question}
              index={index}
              examData={examData.data}
            />
          ))}
      </div>
    </>
  );
} 