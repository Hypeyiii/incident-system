import SingleIncident from "@/components/ui/SingleIncident";
import { getIncidentById } from "@/lib/data";
import { TIncident } from "@/lib/types";

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const incident = (await getIncidentById(id)) as any;
  const incidentData: TIncident = incident[0];
  return <SingleIncident id={id} incident={incidentData} />;
}