import "../../css/embla.css";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroSkeleton, StatsSkeleton, PopularUnitsSkeleton } from "../components/Skeleton";

// Hero section as a client component for better hydration
const HeroSection = dynamic(() => import("./components/HeroSection"), {
  ssr: true,
  loading: () => <HeroSkeleton />,
});

// Stats component with parallel data fetching
const Stats = dynamic(() => import("./components/Stats"), {
  ssr: true,
  loading: () => <StatsSkeleton />,
});

// Popular Units component with optimized data fetching
const PopularUnits = dynamic(() => import("./components/PopularUnits"), {
  ssr: true,
  loading: () => <PopularUnitsSkeleton />,
});

// Main page component (server component)
export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const examType = session.user.examType;

  return (
    <div className="flex flex-col items-center p-5 gap-6">
      {/* Hero section with priority loading */}
      <HeroSection />

      {/* Stats section with parallel data fetching */}
      <Suspense fallback={<StatsSkeleton />}>
        <Stats examType={examType} />
      </Suspense>

      {/* Popular Units section with lazy loading */}
      <Suspense fallback={<PopularUnitsSkeleton />}>
        <PopularUnits examType={examType} />
      </Suspense>
    </div>
  );
}
