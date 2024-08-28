import { TUser } from "@/lib/types";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function UserCard({ user }: { user: TUser }) {
  return (
    <Link
      href={`/admin/users/${user.id}`}
      className="flex flex-col gap-1 justify-between items-center border border-black/20 rounded-lg p-5 h-[200px] shadow-black hover:shadow-xl bg-white/40"
    >
      <UserIcon className="size-12" />
      <h1 className="text-xl text-black/90 text-center">{user.name}</h1>
      <h2 className="text-base text-black/70 text-center">
        {user.department_name}
      </h2>
      <h3 className="text-sm text-black/60">{user.role_name}</h3>
    </Link>
  );
}