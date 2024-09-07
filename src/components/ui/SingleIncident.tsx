"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingTransition from "./LoadingTransition";

export default function SingleIncident({
  id,
  incident,
}: {
  id: number;
  incident: any;
}) {
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [assignedTo, setAssignedTo] = useState<number | string>(
    incident.assigned_to || ""
  );
  const [closedInfo, setClosedInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          toast.error("Error al cargar usuarios");
        }
      } catch (error) {
        toast.error("Error al cargar usuarios");
      }
    };

    fetchUsers();
  }, []);

  const handleAssign = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/incidents/assign/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assigned_to: assignedTo }),
      });

      if (response.ok) {
        toast.success("Incidencia asignada con éxito");
        setSuccess(true);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
      }
    } catch (error) {
      toast.error("Hubo un error al asignar la incidencia");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/incidents/close/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          closed_info: closedInfo,
        }),
      });

      if (response.ok) {
        toast.success("Incidencia cerrada con éxito");
        setSuccess(true);
        window.location.href = "/admin";
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
      }
    } catch (error) {
      toast.error("Hubo un error al cerrar la incidencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full mx-auto grid grid-cols-2 gap-6 justify-center items-center">
      <h2 className="text-2xl font-bold col-span-2">
        Actualizar Ticket INC{id}
      </h2>
      <div className="flex flex-row items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700">Título</label>
        <input
          name="title"
          type="text"
          defaultValue={incident.title}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
          required
          readOnly
        />
      </div>
      <div className="flex flex-row items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700">Descripción</label>
        <textarea
          name="description"
          defaultValue={incident.description}
          className="w-full h-fit bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
          required
          readOnly
        />
      </div>
      <div className="flex flex-row items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700">Hecha por:</label>
        <input
          type="text"
          name="description"
          defaultValue={incident.reported_by_name}
          className="w-full h-fit bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
          required
          readOnly
        />
      </div>
      <div className="flex flex-row items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700">Prioridad</label>
        <input
          type="text"
          readOnly
          value={incident.priority}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
        />
      </div>
      <div className="flex flex-row items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700">Categoría</label>
        <input
          type="text"
          readOnly
          value={incident.category}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
        />
      </div>
      <div className="flex flex-row items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700">Departament</label>
        <input
          type="text"
          readOnly
          value={incident.department}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
        />
      </div>
      <div className="flex flex-row items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700">Severidad</label>
        <input
          type="text"
          readOnly
          value={incident.severity}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
        />
      </div>
      <div className="flex flex-row items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700">Asignar a:</label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
        >
          <option value="">No asignado</option>
          {users
            .filter((p) => p.role_name === "admin")
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
      </div>
      {incident.status === "resolved" ? (
        <div className="col-span-2 flex flex-col gap-2 items-center">
          <label className="block text-gray-700">Información de cierre</label>
          <textarea
            value={incident.closed_info}
            onChange={(e) => setClosedInfo(e.target.value)}
            className="w-full h-24 bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
            readOnly
          />
        </div>
      ) : (
        <div className="col-span-2 flex flex-col gap-2">
          <label className="block text-gray-700">Información de cierre</label>
          <textarea
            value={closedInfo}
            onChange={(e) => setClosedInfo(e.target.value)}
            className="w-full h-24 bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
          />
        </div>
      )}
      <div className="col-span-2 flex flex-row gap-5 items-center justify-between">
        <button
          type="button"
          onClick={handleAssign}
          className="w-full py-3 px-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Actualizar Incidencia
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="w-full py-3 px-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Cerrar Incidencia
        </button>
      </div>
      {success && (
        <p className="col-span-2 text-center text-green-500">
          Incidencia actualizada con éxito
        </p>
      )}
      {loading && <LoadingTransition />}
    </form>
  );
}
