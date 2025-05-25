import Link from "next/link";

interface Exam {
  id: string;
  examName: string;
  unitName: string;
  sectionName: string;
  marksScored: number;
  totalMarks: number;
}

interface ClientWrapperProps {
  exams: Exam[];
}

export default function ClientWrapper({ exams }: ClientWrapperProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map((exam) => {
        // Calculate percentage for display
        const percentage = Math.round(
          (exam.marksScored / exam.totalMarks) * 100
        );
        // Determine color based on score percentage
        let scoreColor = "text-red-600";
        let progressColor = "bg-red-500";

        if (percentage >= 70) {
          scoreColor = "text-[#702DFF]";
          progressColor = "bg-[#702DFF]";
        } else if (percentage >= 50) {
          scoreColor = "text-yellow-600";
          progressColor = "bg-yellow-500";
        }

        return (
          <div
            key={exam.id}
            className="bg-white rounded-[20px] shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="p-6">
              <h2 className="text-[#202020] font-semibold text-lg mb-4">
                {exam.examName}
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[rgba(112,45,255,0.1)] flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#702DFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
                      <path d="M8 7h6m-6 5h8m-8 5h4" />
                    </svg>
                  </div>
                  <p className="text-[#7E7E7E] font-medium">{exam.unitName}</p>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[rgba(112,45,255,0.1)] flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#702DFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                  </div>
                  <p className="text-[#7E7E7E] font-medium">
                    {exam.sectionName}
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-[rgba(112,45,255,0.05)] p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-[#202020]">Score</span>
                  <div className="flex items-center">
                    <span className={`text-xl font-bold ${scoreColor}`}>
                      {exam.marksScored}
                    </span>
                    <span className="text-gray-500 mx-1">/</span>
                    <span className="text-[#7E7E7E]">{exam.totalMarks}</span>
                    <span className={`ml-2 text-sm font-medium ${scoreColor}`}>
                      ({percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${progressColor} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              <Link
                href={`/detailed-result/${exam.id}`}
                className="mt-5 w-full bg-[rgba(112,45,255,0.2)] rounded-[40px] py-2.5 px-3 flex items-center justify-center text-[#702DFF] font-medium text-sm hover:bg-[rgba(112,45,255,0.3)] transition-colors duration-300"
              >
                View Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
