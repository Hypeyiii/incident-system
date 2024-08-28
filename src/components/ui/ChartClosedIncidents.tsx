import { getResolvedIncidentData } from "@/lib/data";
import { ChartComponent } from "./charts/ClosedChart";

export default async function ChartClosedIncidents() {
  const data = await getResolvedIncidentData();

  return (
    <section>
      <div className="flex w-full justify-center py-3 text-sm font-bold text-white bg-green-500">
        Incidents Closed
      </div>
      <ChartComponent data={data} />
    </section>
  );
}
