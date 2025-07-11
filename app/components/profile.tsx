import React from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Exam, Question } from "@prisma/client";
import ProfileToggle from "./ProfileToggle";

// Define types for exam with questions
type ExamWithQuestions = Exam & {
  questions: {
    question: Question;
  }[];
};

// Function to get user's attended exams
async function getUserExams(userId: string, token?: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REST_URL}/auth/students/${userId}/exams?limit=3`, { headers: { token: token as string }})
    const {data} = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user exams:", error);
    return [];
  }
}

const ProfileSidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  console.log(userId, 'user')

  // Get user's exams if logged in
  const userExams = userId ? await getUserExams(userId, session?.accessToken) : [];

  // Return the profile toggle component with profile content
  return <ProfileToggle session={session} userExams={userExams} />;
};

export default ProfileSidebar;
