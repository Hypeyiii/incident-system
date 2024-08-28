import SingleIncident from "@/components/ui/SingleIncident";
import { getIncidentById } from "@/lib/data";
import { TIncident } from "@/lib/types";

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const incident = await getIncidentById(id) as any;
  const incidentData: TIncident = incident[0];
  return (
    <section className="fixed overflow-auto flex flex-col gap-20 top-0 right-0 w-[85%] h-full mt-[57px] p-10 bg-[#cfc18c33]">
      <SingleIncident id={id} incident={incidentData} />
    </section>
  );
}
