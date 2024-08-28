import ClosedIncidents from "@/components/ui/ClosedIncidents";
import Incidents from "@/components/ui/Incidents";
import { getIncidents } from "@/lib/data";
import { TIncident } from "@/lib/types";

export default async function Page() {
  const data = (await getIncidents()) as TIncident[];
  
  return (
    <section className="fixed overflow-auto flex flex-col gap-20 top-0 right-0 w-[85%] h-full mt-[57px] p-10 bg-[#cfc18c33]">
      <ClosedIncidents/>
    </section>
  );
}
