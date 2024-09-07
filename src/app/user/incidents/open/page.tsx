"use client";

import MyIncidents from "@/components/ui/MyIncidents";
import { useUser } from "@/context/UserContext";
import { TIncident } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<TIncident[]>([]);
  const { user } = useUser();

  useEffect(() => {
    fetch("/api/incidents")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const incidents = data.filter((p) => p.reported_by === user?.id && p.status == "open");

  return (
    <div className="fixed overflow-auto flex flex-col gap-20 top-0 right-0 w-[85%] h-full mt-[57px] p-10 bg-[#cfc18c33]">
      <h1 className="text-2xl text-black font-bold">Mis incidencias abiertas</h1>
      <MyIncidents incidents={incidents} user={user} />
    </div>
  );
}
