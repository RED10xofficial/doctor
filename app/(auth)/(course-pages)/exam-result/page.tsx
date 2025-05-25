import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ExamResultPage() {
  // Example data - replace with actual data
  const examData = {
    totalQuestions: 50,
    correctAnswers: 42,
    totalScore: 84,
    isPassed: true,
    percentage: 84,
  };

  return (
    <>
      <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-2 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-xl p-6 shadow-sm">
          {/* Header */}
          <div className="bg-gray-50 rounded-lg p-6 border-gray-100  border">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Exam Result</h1>
              <div
                className={`px-4 py-2 rounded-full ${
                  examData.isPassed
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {examData.isPassed ? "Passed" : "Failed"}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Questions Card */}
            <div className="bg-gray-50 rounded-lg p-6 border-gray-100  border">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Questions</p>
                  <p className="text-2xl font-bold">
                    {examData.totalQuestions}
                  </p>
                </div>
              </div>
            </div>

            {/* Correct Answers Card */}
            <div className="bg-gray-50 rounded-lg p-6 border-gray-100  border">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Correct Answers</p>
                  <p className="text-2xl font-bold">
                    {examData.correctAnswers}
                  </p>
                </div>
              </div>
            </div>

            {/* Score Percentage Card */}
            <div className="bg-gray-50 rounded-lg p-6 border-gray-100  border">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Score Percentage</p>
                  <p className="text-2xl font-bold">{examData.percentage}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-gray-50 rounded-lg p-6 border-gray-100  border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Performance Summary</h2>

              <Link
                href="/detailed-result"
                className="text-sky-600 text-sm flex items-center gap-1 group"
              >
                View Detailed Summary
                <ArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
            <p className="text-gray-600">
              {examData.isPassed
                ? `Congratulations! You have successfully passed the exam with ${examData.percentage}% score. You answered ${examData.correctAnswers} questions correctly out of ${examData.totalQuestions} questions.`
                : `You have scored ${examData.percentage}% in the exam. You need to improve as you answered only ${examData.correctAnswers} questions correctly out of ${examData.totalQuestions} questions.`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
