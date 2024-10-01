"use client";

import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { kanit } from "@/lib/fonts";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import logo from "@/app/public/servicenow.webp";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searching for", search);
    router.push(`/admin/search/${search}`);
  };

  return (
    <div className="flex flex-row justify-between fixed left-0 right-0 top-0 items-center w-full h-[57px] p-3 border-b border-black bg-[#303a46] text-white">
      <Link
        href={"/"}
        className="flex flex-row gap-2 justify-center items-center"
      >
        <Image src={logo} alt="Servicenow icon" width={100} height={50} />
        <h1 className={`text-[8px] ${kanit.className}`}>Service Desk</h1>
      </Link>
      <div className="flex flex-row items-center">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-xs">{user?.name}</p>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border border-white rounded-xl w-[100px] text-xs px-2 py-1"
            />
            <MagnifyingGlassIcon className="absolute right-1 top-1/2 size-4 -translate-y-1/2" />
          </form>
          <Cog6ToothIcon className="size-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
