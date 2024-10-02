"use client";

import MyIncidents from "@/components/ui/MyIncidents";
import { useUser } from "@/context/UserContext";
import { TIncident } from "@/lib/types";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Page() {
  const [data, setData] = useState<TIncident[]>([]);
  const { user } = useUser();

  useEffect(() => {
    fetch("/api/incidents")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const incidents = data.filter((p) => p.reported_by === user?.id);

  const chartData = {
    labels: ["Incidencias hechas", "Incidencias abiertas" , "Incidencias cerradas"],
    datasets: [
      {
        label: "Número de Incidencias",
        data: [
          incidents.length,
          incidents.filter((incident) => incident.status === "open").length,
          incidents.filter((incident) => incident.status === "resolved").length,
        ],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(75, 192, 192, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)" , "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Resumen de Incidencias",
      },
    },
  };

  return (
    <div className="flex flex-col gap-10 mb-32">
      <h1 className="text-2xl text-black font-bold">Mis incidencias</h1>
      <div className="w-full h-[450px] flex justify-center items-center">
      <Bar data={chartData} options={chartOptions} />
      </div>
      <MyIncidents incidents={incidents} />
    </div>
  );
}
