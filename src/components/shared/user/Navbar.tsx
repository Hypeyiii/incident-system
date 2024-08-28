"use client";

import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { bebas, kanit } from "@/lib/fonts";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <div className="flex flex-row justify-between items-center w-full h-auto p-3 border-b border-black bg-[#303a46] text-white">
      <div className="flex flex-row gap-2 items-center">
        <h1 className={`text-2xl uppercase ${bebas.className}`}>POLARIS</h1>
        <h1 className={`text-[8px] ${kanit.className}`}>Service Desk</h1>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-xs">{user?.name}</p>
          <MagnifyingGlassIcon className="size-4 cursor-pointer" />
          <Cog6ToothIcon className="size-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
