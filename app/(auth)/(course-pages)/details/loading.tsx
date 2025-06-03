import { Skeleton } from "../../components/Skeleton";

export default function DetailsLoading() {
  return (
    <div className="bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 w-full min-h-screen">
      <div className="flex gap-4 p-4">
        {/* Left sidebar skeleton */}
        <div className="w-64 bg-white rounded-xl shadow-md p-4 space-y-4">
          <Skeleton className="h-8 w-32 mb-6" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <div className="pl-4 space-y-2">
                {[1, 2].map((j) => (
                  <Skeleton key={j} className="h-4 w-3/4" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 