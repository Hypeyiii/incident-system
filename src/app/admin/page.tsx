import {
  ChartSkeleton,
  IncidentsSkeleton,
} from "@/components/skeletons/skeletons";
import ChartIncidents from "@/components/ui/ChartIncidents";
import ChartClosedIncidents from "@/components/ui/ChartClosedIncidents";
import ChartOnGoingIncidents from "@/components/ui/ChartOnGoingIncidents";
import Incidents from "@/components/ui/Incidents";
import { Suspense } from "react";
import GeneralIncidents from "@/components/ui/GeneralIncidents";

export default function Page() {
  return (
    <section className="flex w-full h-full flex-col gap-12">
      <div className="grid grid-cols-3 gap-x-10 w-full">
        <Suspense fallback={<ChartSkeleton />}>
          <ChartIncidents />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ChartClosedIncidents />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ChartOnGoingIncidents />
        </Suspense>
      </div>
      <Suspense fallback={<IncidentsSkeleton />}>
        <GeneralIncidents />
      </Suspense>
    </section>
  );
}
