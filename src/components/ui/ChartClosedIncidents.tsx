'use client'

import { useEffect, useState } from "react";
import { TIncident } from "@/lib/types";
import ResolvedIncidents from "./charts/ResolvedIncidents";

export default function ChartIncidents() {
  const [data, setData] = useState<TIncident[]>([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/incidents");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("fetchIncidents error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <section className="border h-[350px]">
      <div className="flex w-full justify-center py-3 text-sm font-bold text-white bg-green-500">
        Incidents resolved
      </div>
      <ResolvedIncidents data={data} />
    </section>
  );
}
