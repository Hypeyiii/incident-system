"use client";

import LoadingTransition from "@/components/ui/LoadingTransition";
import MyIncidents from "@/components/ui/MyIncidents";
import { useUser } from "@/context/UserContext";
import { TIncident } from "@/lib/types";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
    return <LoadingTransition />;
  }

  const incidents = data.filter(
    (p) => p.status == "open" && p.assigned_to == user?.id
  );

  const chartData = {
    labels: ['Incidencias asignadas','Incidencias abiertas'],
    datasets: [
      {
        label: 'Número de Incidencias',
        data: [
          data.length,
          incidents.filter((incident) => incident.status === 'open').length,
        ],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)','rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Resumen de Incidencias',
      },
    },
  };

  if (incidents.length === 0 && !loading) {
    return (
      <div className="flex flex-col w-full border border-gray-300 rounded-lg shadow-lg h-fit max-h-[500px] overflow-y-auto">
        <h1 className="text-white bg-blue-500 uppercase text-sm font-semibold flex items-center justify-center py-3 rounded-t-lg">
          Incidencias - L2
        </h1>
        <div className="flex items-center justify-center h-full py-5">
          <h1>No hay incidencias activas </h1>
        </div>
      </div>
    );
  }

  return <div>
    <section className="w-full flex items-center justify-center max-h-[500px]">
    <Bar data={chartData} options={chartOptions} />
    </section>
    <MyIncidents incidents={incidents} />
  </div>;
}
