"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

const ActiveIncidents = ({ data }: { data: any[] }) => {
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
        (incident) => incident.status === "active" && incident.assigned_to
      );

      const users = Array.from(
        new Set(activeIncidents.map((incident) => incident.assigned_to_name))
      );

      const incidentsPerUser = users.map(
        (user) =>
          activeIncidents.filter(
            (incident) => incident.assigned_to_name === user
          ).length
      );

      setChartData({
        labels: users,
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

      // Redirigir a la página de incidencias del usuario
      router.push(`/incidents/user/${clickedUser}`);
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

export default ActiveIncidents;
