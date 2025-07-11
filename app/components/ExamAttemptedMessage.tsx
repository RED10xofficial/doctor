"use client";

import { useRouter } from "next/navigation";

export default function ExamAttemptedMessage({ message }: { message: string }) {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full p-6 bg-white rounded-lg text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Exam Attempted
        </h2>
        <p className="text-gray-600 mb-6 text-center">{message}</p>
        <button
          onClick={() => router.back()}
          className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
