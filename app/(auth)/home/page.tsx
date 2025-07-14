import "../../css/embla.css";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import {
  HeroSkeleton,
  StatsSkeleton,
  PopularUnitsSkeleton,
} from "../components/Skeleton";
import { ErrorInjector } from "@/app/components/ErrorInjector";
import { unitApi, statsApi } from "@/lib/api-client";
import { safeApiCall, handleApiError } from "@/lib/api-utils";

const HeroSection = dynamic(() => import("./components/HeroSection"), {
  ssr: true,
  loading: () => <HeroSkeleton />,
});

const Stats = dynamic(() => import("./components/Stats"), {
  ssr: true,
  loading: () => <StatsSkeleton />,
});

const PopularUnits = dynamic(() => import("./components/PopularUnits"), {
  ssr: true, // Client component now
  loading: () => <PopularUnitsSkeleton />,
});

export default async function Home() {
  let error: string | null = null;
  let status = 0;
  const session = await auth();
  if (!session) redirect("/login");

  const examType = session.user.examType;

  // Use safe API calls with fallbacks
  const popularUnits = await safeApiCall(
    () => unitApi.getPopularUnits(examType, 5),
    []
  );

  const stats = await safeApiCall(
    () => statsApi.getStats(examType),
    { sections: 0, units: 0, exams: 0 }
  );

  const { units, sections, exams } = stats;

  return (
    <div className="flex flex-col items-center p-5 gap-6">
      <HeroSection />
      <Suspense fallback={<StatsSkeleton />}>
        <Stats units={units} sections={sections} exams={exams} />
      </Suspense>
      <Suspense fallback={<PopularUnitsSkeleton />}>
        <PopularUnits popularUnits={popularUnits} />
      </Suspense>
      <ErrorInjector error={error} status={status} />
    </div>
  );
}
