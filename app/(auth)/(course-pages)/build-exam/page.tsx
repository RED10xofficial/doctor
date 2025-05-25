"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomExam } from "./actions";
import { useSnackbar } from "@/app/components/Snackbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const examSchema = z.object({
  examName: z.string().min(1, "Exam name is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  questionCount: z.number().min(1).max(50),
});

type ExamFormData = z.infer<typeof examSchema>;

export default function ExamConfig() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      examName: "Your Exam Name",
      difficulty: "medium",
      questionCount: 10,
    },
  });

  const onSubmit = async (data: ExamFormData) => {
    setIsLoading(true);

    try {
      const exam = await createCustomExam(data.examName, data.difficulty, data.questionCount);
      router.push(`/details/exam/${exam.id}`);
    } catch (error) {
      if (error instanceof Error) {
        showSnackbar(error.message, "error");
      } else {
        showSnackbar("Failed to create exam", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Configure Your Exam
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="examName"
              className="block text-sm font-medium text-gray-700"
            >
              Exam Name
            </label>
            <input
              type="text"
              id="examName"
              {...register("examName")}
              placeholder="Enter exam name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.examName && (
              <p className="mt-1 text-sm text-red-600">{errors.examName.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-gray-700"
            >
              Exam Difficulty
            </label>
            <select
              id="difficulty"
              {...register("difficulty")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.difficulty && (
              <p className="mt-1 text-sm text-red-600">{errors.difficulty.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="questionCount"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Questions
            </label>
            <input
              type="number"
              id="questionCount"
              {...register("questionCount", { valueAsNumber: true })}
              min="1"
              max="50"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.questionCount && (
              <p className="mt-1 text-sm text-red-600">{errors.questionCount.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Building Exam..." : "Start Exam"}
          </button>
        </form>
      </div>
    </div>
  );
}
