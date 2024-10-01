"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

const IncidentsAssigned = ({ data }: { data: any[] }) => {
  const router = useRouter();
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      hoverOffset: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (data.length > 0) {
      const activeIncidents = data.filter(
        (incident) => incident.status === "resolved" && incident.assigned_to
      );

      // Crear un mapa de usuarios con su id y nombre
      const userMap = new Map<string, { id: string; name: string }>();

      activeIncidents.forEach((incident) => {
        if (!userMap.has(incident.assigned_to)) {
          userMap.set(incident.assigned_to, {
            id: incident.assigned_to,
            name: incident.assigned_to_name,
          });
        }
      });

      const users = Array.from(userMap.values());
      const incidentsPerUser = users.map((user) =>
        activeIncidents.filter(
          (incident) => incident.assigned_to === user.id
        ).length
      );

      setChartData({
        labels: users.map((user) => user.name),
        datasets: [
          {
            label: "Incidencias activas por usuario",
            data: incidentsPerUser,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            hoverOffset: 4,
          },
        ],
      });
    }
  }, [data]);

  // Manejar clic en una sección de la gráfica
  const handleClick = (event: any, elements: any) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedUser = chartData.labels[clickedIndex];

      // Obtener el ID del usuario basado en su nombre
      const userId = [...data].find(
        (incident) => incident.assigned_to_name === clickedUser
      )?.assigned_to;

      // Redirigir a la página de incidencias del usuario usando el ID
      if (userId) {
        router.push(`/admin/incidents/closed/${userId}`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[300px]">
      <Pie
        data={chartData}
        options={{
          onClick: handleClick,
        }}
      />
    </div>
  );
};

export default IncidentsAssigned;
