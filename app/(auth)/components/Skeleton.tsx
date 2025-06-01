import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200",
        className
      )}
    />
  );
}

export function StatsSkeleton() {
  return (
    <div className="w-full grid grid-cols-3 gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-md flex flex-row items-center justify-between h-[88px]">
          <div className="flex-grow">
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function PopularUnitsSkeleton() {
  return (
    <div className="w-full mt-5">
      <div className="flex justify-between items-center mb-5 h-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 grid grid-cols-3 h-[56px]">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-4 w-24" />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="px-6 py-4 border-b border-gray-100 grid grid-cols-3 items-center h-[72px]">
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-6 w-24" />
            <div className="text-right">
              <Skeleton className="h-6 w-24 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full bg-[#702DFF] rounded-[20px] relative overflow-hidden p-5 h-[300px]">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-center">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-48 mb-6" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton({ isCollapsed = false }: { isCollapsed?: boolean }) {
  if (isCollapsed) {
    return (
      <div className="w-16 h-screen bg-white border-l border-gray-200 fixed right-0 top-0">
        <div className="p-4">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-[280px] h-screen bg-white border-l border-gray-200 fixed right-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-grow">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 