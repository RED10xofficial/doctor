export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#702DFF] border-r-transparent"></div>
          <div className="absolute inset-0 animate-pulse rounded-full bg-[#702DFF]/20"></div>
        </div>
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
} 