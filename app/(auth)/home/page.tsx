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
import apiClient, { ErrorResponse } from "@/lib/api";

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

  let popularUnits = [];
  let units = 0;
  let sections = 0;
  let exams = 0;

  try {
    const { data: response } = await apiClient.get(
      `/units?examType=${examType}&limit=5`
    );
    popularUnits =
      response.success && Array.isArray(response.data) ? response.data : [];
    if (!response.success) {
      error = response.message as string;
      status = response.status;
    }
  } catch (err) {
    const e = err as ErrorResponse;
    error = e.message;
    status = e.status;
  }

  try {
    const { data: response } = await apiClient.get(`/stats/${examType}`);
    const data = response.success
      ? response.data
      : { sections: 0, units: 0, exams: 0 };
    units = data.units;
    sections = data.sections;
    exams = data.exams;
  } catch (err) {
    const e = err as ErrorResponse;
    error = e.message;
    status = e.status;
  }

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
