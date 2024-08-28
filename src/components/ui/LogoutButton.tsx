"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/auth/logout`);
      if (response.data.success) {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => logout()}
      className="flex flex-row transition-all fixed bottom-0 left-0 w-[15%] gap-1 items-center justify-center py-4 text-center uppercase text-base font-bold text-white bg-[#303a46] hover:bg-[#9ab8dd]"
    >
      <PowerIcon className="size-4" />
      {loading ? "Wait..." : "Logout"}
    </button>
  );
}
