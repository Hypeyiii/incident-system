"use client";

import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { bebas, kanit } from "@/lib/fonts";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import logo from "@/app/public/servicenow.webp";

export default function Navbar() {
  const { user } = useUser();

  return (
    <div className="flex flex-row justify-between items-center w-full h-[57px] p-3 border-b border-black bg-[#303a46] text-white">
      <div className="flex flex-row gap-2 justify-center items-center">
        <Image src={logo} alt="Servicenow icon" width={100} height={50} />
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
