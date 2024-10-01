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

  const realDepartment = departments.find((p) => user?.department_id === p.id);

  console.log(realDepartment);

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
      department: realDepartment?.name,
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
      <h2 className="text-2xl font-bold mb-4 col-span-2">Create incident</h2>
      <div className="flex flex-col gap-1 col-span-2 text-xs">
        <label className="block text-gray-700">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full py-5 px-3 text-xs border rounded-xl bg-gray-50"
          required
        />
      </div>
      <div className="flex flex-col gap-1 col-span-2 text-xs">
        <label className="block text-gray-700">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full py-5 px-3 h-24 border rounded-xl bg-gray-5"
          required
        />
      </div>
      <div className="mb-2 text-xs">
        <label className="block text-gray-700">Prioridad</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full py-5 px-3 text-xs border rounded-xl bg-gray-50"
        >
          <option value="Low">Baja</option>
          <option value="Medium">Media</option>
          <option value="High">Alta</option>
        </select>
      </div>
      <div className="mb-2 text-xs">
        <label className="block text-gray-700">Categoría</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full py-5 px-3 text-xs border rounded-xl bg-gray-50"
          required
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2 text-xs">
        <label className="block text-gray-700">Severidad</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="w-full py-5 px-3 text-xs border rounded-xl bg-gray-50"
          required
        >
          {severities.map((sev) => (
            <option key={sev.id} value={sev.level}>
              {sev.level}
            </option>
          ))}
        </select>
      </div>

      <section className="flex w-full items-center justify-center col-span-2">
        <button
          onSubmit={handleSubmit}
          className="px-4 py-2 text-center bg-gray-200 text-xs text-black/60 hover:text-black hover:bg-white hover:border-black border border-transparent transition-all rounded-xl"
        >
          Crear incidencia
        </button>
      </section>
      {success && (
        <p className="col-span-2 text-center text-green-500">
          Incidencia creada con éxito
        </p>
      )}
      {loading && <LoadingTransition />}
    </form>
  );
}
