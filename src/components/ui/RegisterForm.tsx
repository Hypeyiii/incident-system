"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import logo from "@/app/public/servicenow.webp";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import {
  EnvelopeIcon,
  KeyIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import LoadingTransition from "./LoadingTransition";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState<number>(0);
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
        department_id: department,
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
      {loading && <LoadingTransition />}
      <Image
        src={logo}
        alt="ServiceNow Logo"
        width={200}
        className="cursor-default"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col gap-5 p-10 rounded-lg relative md:h-[450px] w-fit md:w-[400px]"
      >
        <label htmlFor="name" className="relative">
          <div className="relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-[#81B5A1]"
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </label>
        <label htmlFor="email">
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-[#81B5A1]"
              required
            />
            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </label>
        <label htmlFor="password">
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-[#81B5A1]"
              required
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </label>
        <label htmlFor="department">
          <div className="relative">
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(Number(e.target.value))}
              className="peer bg-transparent block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-gray-500 focus:text-black focus:outline-[#81B5A1]"
              required
            >
              {departments.map((dept) => (
                <option
                  key={dept.id}
                  value={dept.id}
                  className="text-xs font-sans cursor-pointer"
                >
                  {dept.name}
                </option>
              ))}
            </select>
            <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
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
