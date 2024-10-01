"use client";

import { useEffect, useState } from "react";
import { TIncident } from "@/lib/types";
import ActiveIncidents from "./charts/ActiveIncidents";

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

  if(data.length === 0) {
    return (
      <div className="flex text-black w-full h-auto text-center justify-center items-center">
        No hay incidencias activas
      </div>
    );
  }

  return (
    <section className="border h-[350px]">
      <div className="flex w-full justify-center py-3 text-sm font-bold text-white bg-blue-500">
        Incidents active
      </div>
      <ActiveIncidents data={data} />
    </section>
  );
}
