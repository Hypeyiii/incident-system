"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import logo from "@/app/public/servicenow.webp";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState<string>("");
  const [departments, setDepartments] = useState<
    { id: string; name: string }[]
  >([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await axios.get("/api/departments");
        setDepartments(response.data);
      } catch (err) {
        console.error("Failed to load departments", err);
      }
    }

    fetchDepartments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password || !name || !department) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`/api/auth/register`, {
        email,
        password,
        name,
        department,
      });

      if (response.data.success) {
        setUser(response.data.user);
        window.location.href = "/admin";
      } else {
        setError(response.data.error || "Login failed");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen bg-[#2e3d4b]">
      <Image
        src={logo}
        alt="ServiceNow Logo"
        width={200}
        className="cursor-default"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white flex-col gap-2 p-10 rounded-lg relative"
      >
        <label htmlFor="name">
          <h1>Name</h1>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            required
          />
        </label>
        <label htmlFor="email">
          <h1>Email</h1>
          <input
            type="email" // Changed from "text" to "email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            required
          />
        </label>
        <label htmlFor="password">
          <h1>Password</h1>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            required
          />
        </label>
        <label htmlFor="department">
          <h1>Department</h1>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Select a department
            </option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className={`w-full p-2 bg-[#2e3d4b] text-white rounded-md ${
            error ? "mb-0" : "mb-32"
          }`}
        >
          {loading ? "Loading..." : "Register"}
        </button>
        {error && <p className="text-red-500 text-center mb-32">{error}</p>}
        <h4 className="absolute bottom-0 left-0 right-0 flex justify-center items-center rounded-b-md py-10 bg-[#81B5A1] text-white/70 flex-row gap-1">
          Have an account? <Link href="/">Log In</Link>
        </h4>
      </form>
    </section>
  );
}
