import "../../css/embla.css";
import Link from "next/link";
import { Section, Unit, Exam } from "@prisma/client";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

// Define extended Unit type with exams
type UnitWithExams = Unit & {
  exams: Exam[];
  section: Section;
};

// Main page component (server component)
export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const examType = session.user.examType;

  // Get counts for dashboard stats
  const sectionsCount = await prisma.section.count({
    where: {
      examType: examType,
    },
  });

  const unitsCount = await prisma.unit.count({
    where: {
      section: {
        examType: examType,
      },
    },
  });

  const examsCount = await prisma.exam.count({
    where: {
      unit: {
        section: {
          examType: examType,
        },
      },
    },
  });

  // Fetch popular units
  const popularUnits = (await prisma.unit.findMany({
    where: {
      section: {
        examType: examType,
      },
    },
    take: 5,
    orderBy: {
      exams: {
        _count: "desc",
      },
    },
    include: {
      exams: true,
      section: true,
    },
  })) as UnitWithExams[];

  return (
    <div className="flex flex-col items-center p-5 gap-6">
      {/* Container with purple background and stars */}
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

      {/* Stats cards row */}
      <div className="w-full grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-md flex flex-row items-center justify-between">
          <div className="flex-grow">
            <div className="text-3xl font-normal text-gray-700">
              {sectionsCount}
            </div>
            <div className="text-sm text-gray-600">Sections</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md flex flex-row items-center justify-between">
          <div className="flex-grow">
            <div className="text-3xl font-normal text-gray-700">
              {unitsCount}
            </div>
            <div className="text-sm text-gray-600">Units</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md flex flex-row items-center justify-between">
          <div className="flex-grow">
            <div className="text-3xl font-normal text-gray-700">
              {examsCount}
            </div>
            <div className="text-sm text-gray-600">Exams</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      {/* <div className="w-full mt-5">
        <h2 className="text-xl font-medium text-gray-800 mb-5">
          Continue Learning
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sections.slice(0, 3).map((section, index) => (
            <div
              key={`continue-${index}`}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-md"
            >
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs uppercase mb-3">
                {section.examType || "Frontend"}
              </div>
              <h3 className="text-sm font-medium text-gray-800 leading-tight mb-2">
                Beginner&apos;s Guide to becoming a professional {section.name}{" "}
                developer
              </h3>
            </div>
          ))}
        </div>
      </div> */}

      {/* Popular Units Table */}
      <div className="w-full mt-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-medium text-gray-800">Popular Units</h2>
          <Link href="/units" className="text-blue-600 text-xs">
            See All
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 grid grid-cols-3">
            <div className="text-xs font-semibold text-gray-600 uppercase">
              Unit Name
            </div>
            <div className="text-xs font-semibold text-gray-600 uppercase">
              Section Name
            </div>
            <div className="text-xs font-semibold text-gray-600 uppercase text-right">
              Actions
            </div>
          </div>

          {popularUnits.map((unit, index) => (
            <div
              key={`unit-${index}`}
              className="px-6 py-4 border-b border-gray-100 grid grid-cols-3 items-center"
            >
              <div>
                <h3 className="text-sm font-medium text-gray-800">
                  {unit.name}
                </h3>
                <p className="text-xs text-gray-500">
                  Exams: {unit.exams.length}
                </p>
              </div>
              <div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs">
                  {unit.section.name}
                </span>
              </div>
              <div className="text-right">
                <Link
                  href={`/units/${unit.id}`}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs"
                >
                  SHOW DETAILS
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
