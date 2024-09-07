"use client";

import MyIncidents from "@/components/ui/MyIncidents";
import { useUser } from "@/context/UserContext";
import { TIncident } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<TIncident[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

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

  if (loading) {
    return (
      <div className="flex flex-col w-full border border-gray-300 rounded-lg shadow-lg h-fit max-h-[500px] overflow-y-auto">
        <h1 className="text-white bg-blue-500 uppercase text-sm font-semibold flex items-center justify-center py-3 rounded-t-lg">
          Incidencias - L2
        </h1>
        <div className="flex items-center justify-center h-full py-5">
          <h1>Obtniendo incidencias</h1>
        </div>
      </div>
    );
  }

  const incidents = data.filter((p) => p.assigned_to === user?.id && p.status != "resolved");

  if (incidents.length === 0 && !loading) {
    return (
      <div className="flex flex-col w-full border border-gray-300 rounded-lg shadow-lg h-fit max-h-[500px] overflow-y-auto">
        <h1 className="text-white bg-blue-500 uppercase text-sm font-semibold flex items-center justify-center py-3 rounded-t-lg">
          Incidencias - L2
        </h1>
        <div className="flex items-center justify-center h-full py-5">
          <h1>
            No hay incidencias asignadas{" "}
            <span className="underline">{user?.name}</span>
          </h1>
        </div>
      </div>
    );
  }

  return <MyIncidents incidents={incidents} user={user} />;
}
