import { getOpenIncidents } from "@/lib/data";
import { ChartComponent } from "./charts/OnGoingChart";

export default async function ChartOnGoingIncidents() {
  const data = await getOpenIncidents();
  return (
    <section>
      <div className="flex w-full justify-center py-3 text-sm font-bold text-white bg-red-500/80">
        Open incidents
      </div>
      <ChartComponent data={data} />
    </section>
  );
}
