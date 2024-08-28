"use client";

import LogoutButton from "@/components/ui/LogoutButton";
import { navsideAdmin } from "@/lib/list";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavbar() {
  const currentPath = usePathname();
  return (
    <div className="fixed top-0 left-0 flex flex-col mt-[57px] text-xs w-[15%] h-screen border-r border-black  bg-[#455464] text-white">
      {navsideAdmin.map((item, index) => {
        return (
          <Link
            href={item.href}
            key={index}
            className={`flex flex-row gap-2 items-center text-sm [&>svg]:size-6 [&>svg]:text-[${
              item.color
            }] ${
              item.href === currentPath ? " bg-[#303a46]" : "text-white/70"
            } border-b border-black/20 p-5 
                        hover:bg-[#303a46] hover:text-[${
                          item.color
                        }] cursor-pointer`}
          >
            {item.icon}
            <p>{item.title}</p>
          </Link>
        );
      })}
      <LogoutButton />
    </div>
  );
}
