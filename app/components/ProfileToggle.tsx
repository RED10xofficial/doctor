"use client";

import React from "react";
import { Plus, X, User } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import { useProfile } from "./ProfileContext";
import Image from "next/image";

// Type for the exam objects
interface Exam {
  id: number;
  name: string;
  score: string;
}

// Props for the component
interface ProfileToggleProps {
  session: Session | null;
  userExams: Exam[];
}

const ProfileToggle = ({ session, userExams }: ProfileToggleProps) => {
  const { isProfileExpanded, setIsProfileExpanded } = useProfile();

  const toggleProfile = () => {
    setIsProfileExpanded(!isProfileExpanded);
  };

  // Collapsed profile button
  if (!isProfileExpanded) {
    return (
      <div className="fixed top-20 right-0 z-50">
        <button
          onClick={toggleProfile}
          className="bg-white w-14 h-14 rounded-l-full shadow-lg flex items-center justify-center transition-all hover:bg-gray-50 border-l border-t border-b border-gray-100"
          aria-label="Open profile"
        >
          <div className="relative">
            <User className="text-[#702DFF] w-6 h-6" />
            {/* Purple notification dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#702DFF] rounded-full border-2 border-white"></div>
          </div>
        </button>
      </div>
    );
  }

  // Expanded profile sidebar
  return (
    <div className="w-[280px] fixed top-0 right-0 z-50 h-screen bg-white rounded-l-[20px] shadow-lg p-8 flex flex-col gap-9 transition-all duration-300 ease-in-out">
      {/* Header with close button */}
      <div className="flex justify-between items-center">
        <h2 className="text-[#202020] font-medium text-base">Your Profile</h2>
        <button
          onClick={toggleProfile}
          className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          aria-label="Close profile"
        >
          <X className="w-4 h-4 text-[#9E9E9E]" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center gap-4 px-5">
        {/* Profile Picture */}
        <div className="relative">
          <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-gray-300/30 to-gray-300/30 border-4 border-[#702DFF]">
            <div className="w-[72px] h-[72px] rounded-full bg-gray-300 absolute top-[14px] left-[14px] overflow-hidden shadow-lg">
              <Image
                src="/profile.webp"
                alt="Profile"
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>

        {/* Greeting Text */}
        <div className="text-center">
          <h3 className="text-[#202020] font-light text-base mb-1.5">
            Good Morning,
            <br />
            <span className="font-semibold">{session?.user?.name}</span>
          </h3>
          <p className="text-[#7E7E7E] font-medium text-xs">
            Continue your journey and achieve Your Target
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6">
          <div className="relative group">
            <button className="w-10 h-10 rounded-full border border-[#9E9E9E] flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              </svg>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Exams
            </div>
          </div>

          <div className="relative group">
            <button className="w-10 h-10 rounded-full border border-[#9E9E9E] flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
                <path d="M8 7h6m-6 5h8m-8 5h4" />
              </svg>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Learning
            </div>
          </div>

          <div className="relative group">
            <button className="w-10 h-10 rounded-full border border-[#9E9E9E] flex items-center justify-center cursor-not-allowed opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM18 18a3 3 0 1 0-6 0 3 3 0 0 0 6 0z" />
                <path d="M8.59 13.51 15.42 17.49M15.41 6.51 8.59 10.49" />
              </svg>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Coming Soon
            </div>
          </div>
        </div>
      </div>

      {/* Your Exams Section */}
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex justify-between items-center w-full">
          <h3 className="text-[#202020] font-medium text-base">Your Exams</h3>
          <button className="w-6 h-6 rounded-full border border-[#9E9E9E] flex items-center justify-center p-1.5">
            <Plus className="w-3 h-3 text-[#9E9E9E]" />
          </button>
        </div>

        {/* Exam Cards Container */}
        <div className="bg-white rounded-[20px] py-4 flex flex-col gap-4">
          {userExams.length > 0 ? (
            userExams.map((exam, index) => (
              <React.Fragment key={exam.id}>
                <div className="flex flex-col gap-2 w-full px-4">
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/detailed-result/${exam.id}`}
                      className="text-[#202020] font-medium text-[12px] hover:text-[#702DFF] hover:underline"
                    >
                      {exam.name}
                    </Link>
                    <span className="text-[#702DFF] font-bold text-[12px]">
                      {exam.score}
                    </span>
                  </div>
                </div>

                {/* Divider (except for last item) */}
                {index < userExams.length - 1 && (
                  <hr className="border-[#D8D8D8] border-[0.5px]" />
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="text-center py-2">
              <p className="text-[#5F5F5F] text-[12px]">No exams taken yet</p>
            </div>
          )}
        </div>

        {/* See All Button */}
        <div className="flex justify-center">
          <Link
            href="/my-exams"
            className="w-[226px] bg-[rgba(112,45,255,0.2)] rounded-[40px] py-2 px-3 flex items-center justify-center"
          >
            <span className="text-[#702DFF] font-medium text-xs">See All</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileToggle;
