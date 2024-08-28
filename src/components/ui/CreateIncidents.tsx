"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingTransition from "./LoadingTransition";

export default function CreateIncident() {
  const { user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [severity, setSeverity] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);
  const [severities, setSeverities] = useState<{ id: number; level: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    }

    async function fetchDepartments() {
      const response = await fetch("/api/departments");
      const data = await response.json();
      setDepartments(data);
    }

    async function fetchSeverities() {
      const response = await fetch("/api/severity");
      const data = await response.json();
      setSeverities(data);
    }

    fetchCategories();
    fetchDepartments();
    fetchSeverities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const incidentData = {
      title,
      description,
      priority,
      reported_by: user?.id,
      category,
      department: department,
      severity,
    };

    try {
      const response = await fetch("/api/incidents/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incidentData),
      });

      if (response.ok) {
        toast.success("Incidencia creada con éxito");
        setSuccess(true);
        router.push("/");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
      }
    } catch (error) {
      toast.error("Hubo un error al crear la incidencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto grid grid-cols-2 gap-6 justify-center items-center p-4"
    >
      <h2 className="text-2xl font-bold mb-4 col-span-2">Crear Incidencia</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-lg shadow-black/20 bg-black/5"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-lg shadow-black/20 bg-black/5"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Prioridad</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-lg shadow-black/20 bg-black/5"
        >
          <option value="Low">Baja</option>
          <option value="Medium">Media</option>
          <option value="High">Alta</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Categoría</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-lg shadow-black/20 bg-black/5"
          required
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Departamento</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-lg shadow-black/20 bg-black/5"
          required
        >
          <option value="">Seleccione un departamento</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Severidad</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-lg shadow-black/20 bg-black/5"
          required
        >
          <option value="">Seleccione una severidad</option>
          {severities.map((sev) => (
            <option key={sev.id} value={sev.level}>
              {sev.level}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="col-span-2 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Crear Incidencia
      </button>
      {success && (
        <p className="col-span-2 text-center text-green-500">
          Incidencia creada con éxito
        </p>
      )}
      {loading && <LoadingTransition />}
    </form>
  );
}
