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
    <section className="fixed overflow-auto flex flex-col gap-20 top-0 right-0 w-[85%] h-full mt-[57px] p-10 bg-[#cfc18c33]">
      <div className="grid grid-cols-3 gap-10 w-full">
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
