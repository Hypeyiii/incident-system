"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import MyIncidents from "@/components/ui/MyIncidents";
import { TIncident, TUser } from "@/lib/types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<TIncident[]>([]);
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = params;

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
    const fetUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("fetchUsers error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetUsers();
    fetchIncidents();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col w-full border border-gray-300 rounded-lg shadow-lg h-fit max-h-[500px] overflow-y-auto">
        <h1 className="text-white bg-blue-500 uppercase text-sm font-semibold flex items-center justify-center py-3 rounded-t-lg">
          Incidencias - L2
        </h1>
        <div className="flex items-center justify-center h-full py-5">
          <h1>Obteniendo incidencias</h1>
        </div>
      </div>
    );
  }

  const incidents = data.filter((p) => p.assigned_to == id && p.status === 'resolved');
  const user = users.find((u) => u.id == id);

  const chartData = {
    labels: ['Incidencias asignadas', 'Incidencias cerradas'],
    datasets: [
      {
        label: 'Número de Incidencias',
        data: [
          data.length,
          incidents.filter((incident) => incident.status === 'resolved').length,
          incidents.filter((incident) => incident.status === 'open').length,
        ],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
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
          <h1>No hay incidencias activas</h1>
        </div>
      </div>
    );
  }

  return (
    <section>
      <h1 className="flex flex-row gap-1 text-xl">
        Incidencias de <span className="font-bold">{user?.name}</span>
      </h1>
      <div className="mb-8 max-h-[500px] flex items-center justify-center w-full">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <MyIncidents incidents={incidents} />
    </section>
  );
}

