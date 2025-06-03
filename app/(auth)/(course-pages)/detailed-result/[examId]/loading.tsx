import { Skeleton } from "@/app/(auth)/components/Skeleton";

export default function DetailedResultLoading() {
  return (
    <div className="flex-1 bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 rounded-lg p-4 pt-2 min-h-screen">
      <div className="space-y-6 bg-white rounded-xl p-4 shadow-sm">
        {/* Header */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
              <div className="space-y-2 pl-8">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 