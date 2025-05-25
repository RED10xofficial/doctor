import Link from "next/link";

export default function MyLearningPage() {
  return (
    <div className=" min-h-screen">
      <div className="max-w-7xl py-8 mx-auto">
        <div className="bg-white rounded-lg p-4 flex items-center justify-between flex-wrap">
          <h1 className="text-2xl font-semibold">My Learning</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-transparent"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4 bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold">Course 1</h2>
            <p className="text-gray-500 text-sm">
              Learn the basics of web development with HTML, CSS, and
              JavaScript.
            </p>
            <div className="flex justify-end">
              <Link
                href="/exam-result"
                className="text-sm mt-2 hover:font-medium"
              >
                View Result
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold">Course 1</h2>
            <p className="text-gray-500 text-sm">
              Learn the basics of web development with HTML, CSS, and
              JavaScript.
            </p>
            <div className="flex justify-end">
              <Link
                href="/exam-result"
                className="text-sm mt-2 hover:font-medium"
              >
                View Result
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold">Course 1</h2>
            <p className="text-gray-500 text-sm">
              Learn the basics of web development with HTML, CSS, and
              JavaScript.
            </p>
            <div className="flex justify-end">
              <Link
                href="/exam-result"
                className="text-sm mt-2 hover:font-medium"
              >
                View Result
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold">Course 1</h2>
            <p className="text-gray-500 text-sm">
              Learn the basics of web development with HTML, CSS, and
              JavaScript.
            </p>
            <div className="flex justify-end">
              <Link
                href="/exam-result"
                className="text-sm mt-2 hover:font-medium"
              >
                View Result
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold">Course 1</h2>
            <p className="text-gray-500 text-sm">
              Learn the basics of web development with HTML, CSS, and
              JavaScript.
            </p>
            <div className="flex justify-end">
              <Link
                href="/exam-result"
                className="text-sm mt-2 hover:font-medium"
              >
                View Result
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
