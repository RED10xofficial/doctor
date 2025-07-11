import prisma from "@/lib/prisma";

interface StatsProps {
  examType: string;
}

export default async function Stats({ examType }: StatsProps) {
  // Fetch all stats in parallel
  const res = await fetch(`${process.env.NEXT_PUBLIC_REST_URL}/stats/${examType}`);
  const { data } = await res.json();


  return (
    <div className="w-full grid grid-cols-3 gap-3">
      <div className="bg-white rounded-xl p-4 shadow-md flex flex-row items-center justify-between relative">
        <div className="flex-grow">
          <div className="text-3xl font-normal text-gray-700">
            {data.sections}
          </div>
          <div className="text-sm text-gray-600">Sections</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center absolute right-2 top-2 md:relative md:top-0 md:translate-y-0">
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

      <div className="bg-white rounded-xl p-4 shadow-md flex flex-row items-center justify-between relative">
        <div className="flex-grow">
          <div className="text-3xl font-normal text-gray-700">{data.units}</div>
          <div className="text-sm text-gray-600">Units</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center absolute right-2 top-2 md:relative md:top-0 md:translate-y-0">
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

      <div className="bg-white rounded-xl p-4 shadow-md flex flex-row items-center justify-between relative">
        <div className="flex-grow">
          <div className="text-3xl font-normal text-gray-700">{data.exams}</div>
          <div className="text-sm text-gray-600">Exams</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center absolute right-2 top-2 md:relative md:top-0 md:translate-y-0">
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
  );
}
