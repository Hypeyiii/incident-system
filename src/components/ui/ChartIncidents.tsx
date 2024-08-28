import { getIncidentData } from "@/lib/data";
import { ChartComponent } from "./charts/Chart";

export default async function ChartIncidents() {
  const initialData = await getIncidentData();

  return (
    <section>
      <div className="flex w-full justify-center py-3 text-sm font-bold text-white bg-yellow-500">
        Incidents registered
      </div>
      <ChartComponent data={initialData} />
    </section>
  );
}
