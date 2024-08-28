"use client";

import { useEffect, useState } from "react";

export default function User({ user }: { user: any }) {
  const [rol, setRol] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userRole, setUserRole] = useState<number | string>(
    user.role_name || ""
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/rols");
        if (response.ok) {
          const data = await response.json();
          setRol(data);
        } else {
        }
      } catch (error) {}
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rol_id: userRole }),
      });

      if (response.ok) {
        setSuccess("Cambios guardados con éxito");
      } else {
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
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
          name="title"
          type="text"
          defaultValue={user.name}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
          readOnly
        />
      </div>
      <div className="flex flex-row gap-2 items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700 text-sm">Correo:</label>
        <input
          name="title"
          type="text"
          defaultValue={user.email}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
          readOnly
        />
      </div>
      <div className="flex flex-row gap-2 items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700 text-sm">Departamento:</label>
        <input
          name="title"
          type="text"
          defaultValue={user.department_name}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
          readOnly
        />
      </div>
      <div className="flex flex-row gap-2 items-center [&>label]:w-[20%] [&>input]:w-full">
        <label className="block text-gray-700">Rol a:</label>
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="w-full bg-yellow-200/20 border-black/20 text-black/60 py-3 px-1 text-sm border rounded-lg focus:outline-none"
        >
          <option value="">No asignado</option>
          {rol.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="col-span-2 bg-yellow-500 text-white py-2 px-4 rounded-lg"
      >
        {loading ? "Guardando cambios..." : "Guardar cambios"}
      </button>
      {error && <p className="col-span-2 text-red-500">{error}</p>}
      {success && <p className="col-span-2 text-green-500">{success}</p>}
    </form>
  );
}
