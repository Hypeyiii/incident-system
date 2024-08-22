import { navsidelist } from "@/lib/list";
import Link from "next/link";

export default function SideNavbar() {
  return (
    <div className="flex flex-col text-xs w-[15%] border-r border-black h-screen bg-[#455464] text-white">
      {navsidelist.map((item, index) => {
        return (
          <Link
            href={item.href}
            key={index}
            className={`flex flex-row gap-2 items-center [&>svg]:size-4 [&>svg]:text-[${item.color}] border-b border-black/20 p-5 
                        hover:bg-[#303a46] hover:text-[${item.color}] cursor-pointer`}
          >
            {item.icon}
            <p>{item.title}</p>
          </Link>
        );
      })}
    </div>
  );
}
