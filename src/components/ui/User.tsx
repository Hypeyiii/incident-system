"use client";

import { useEffect, useState } from "react";

export default function User({ user }: { user: any }) {
  const [rol, setRol] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userRole, setUserRole] = useState<number>(user.rol_id); // Valor inicial del rol

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/rols");
        if (response.ok) {
          const data = await response.json();
          setRol(data);
        } else {
          setError("Error al cargar los roles.");
        }
      } catch (error) {
        setError("Error al conectarse al servidor.");
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rol_id: userRole }),
      });

      if (response.ok) {
        setSuccess("Cambios guardados con éxito.");
      } else {
        setError("Hubo un error al guardar los cambios.");
      }
    } catch (error) {
      setError("Error al guardar los cambios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 items-center justify-center"
    >
      <div className="flex flex-row gap-2 items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700 text-sm">Nombre:</label>
        <input
          type="text"
          value={user.name}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
          readOnly
        />
      </div>
      <div className="flex flex-row gap-2 items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700 text-sm">Correo:</label>
        <input
          type="text"
          value={user.email}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
          readOnly
        />
      </div>
      <div className="flex flex-row gap-2 items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700 text-sm">Departamento:</label>
        <input
          type="text"
          value={user.department_name}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
          readOnly
        />
      </div>
      <div className="flex flex-row gap-2 items-center [&>label]:w-[20%] [&>select]:w-full">
        <label className="block text-gray-700">Rol:</label>
        <select
          value={userRole}
          onChange={(e) => setUserRole(Number(e.target.value))}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
        >
          <option value="">Selecciona un rol</option>
          {rol.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="col-span-2 bg-yellow-500 text-white py-2 px-4 rounded-lg"
        disabled={loading}
      >
        {loading ? "Guardando cambios..." : "Guardar cambios"}
      </button>
      {error && <p className="col-span-2 text-red-500">{error}</p>}
      {success && <p className="col-span-2 text-green-500">{success}</p>}
    </form>
  );
}
