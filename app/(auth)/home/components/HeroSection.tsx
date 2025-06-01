'use client';

import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="w-full bg-[#702DFF] rounded-[20px] relative overflow-hidden p-5">
      {/* Star decorations */}
      <div className="absolute top-[45px] right-[80px] w-[80px] h-[80px] opacity-25">
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 0L48.9 30.3L80 40L48.9 49.7L40 80L31.1 49.7L0 40L31.1 30.3L40 0Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="absolute top-[93px] right-[10px] w-[80px] h-[80px] opacity-10">
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 0L48.9 30.3L80 40L48.9 49.7L40 80L31.1 49.7L0 40L31.1 30.3L40 0Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="absolute top-[122px] right-[150px] w-[118px] h-[118px] opacity-10">
        <svg
          viewBox="0 0 118 118"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M59 0L72.1 46.6L118 59L72.1 71.4L59 118L45.9 71.4L0 59L45.9 46.6L59 0Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="absolute top-[-59px] right-[10px] w-[61px] h-[118px] opacity-10">
        <svg
          viewBox="0 0 61 118"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.5 0L37.2 23.3L59 30.5L37.2 37.7L30.5 61L23.8 37.7L2 30.5L23.8 23.3L30.5 0Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="absolute top-[20px] right-[140px] w-[61px] h-[60px] opacity-10">
        <svg
          viewBox="0 0 61 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.5 0L37.2 23.3L59 30.5L37.2 37.7L30.5 61L23.8 37.7L2 30.5L23.8 23.3L30.5 0Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="px-6 py-5 max-w-md">
        <div className="text-white text-xs uppercase mb-2">ONLINE COURSE</div>
        <h1 className="text-2xl font-semibold text-white mb-4">
          Advance Your Medical Career
          <br />
          With Expert-Led Courses
        </h1>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-3 mt-6">
          <Link
            href="/details"
            className="px-4 py-2 bg-white text-purple-700 rounded-lg text-sm font-medium border border-white hover:bg-transparent hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Explore Courses
          </Link>
          <Link
            href="/my-exams"
            className="px-4 py-2 bg-transparent text-white rounded-lg text-sm font-medium border border-white hover:bg-white hover:text-purple-700 transition-all duration-300 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            View My Exams
          </Link>
        </div>
      </div>
    </div>
  );
} 