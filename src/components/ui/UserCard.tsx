import { TUser, TIncident } from "@/lib/types";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function UserCard({
  user,
  incident,
}: {
  user: TUser;
  incident: TIncident[];
}) {
  const incidents = incident.filter((p) => p.assigned_to === user.id);
  return (
    <div className="overflo-y-auto flex flex-col gap-1 justify-between items-center border border-black/20 rounded-lg p-5 h-[200px] shadow-black hover:shadow-xl bg-white/40">
      <UserIcon className="size-12" />
      <h1 className="text-xl text-black/90 text-center">{user.name}</h1>
      <h2 className="text-base text-black/70 text-center">
        {user.department_name}
      </h2>
      <h3 className="text-sm text-black/60">{user.role_name}</h3>
      <span className="flex flex-row gap-2 justify-center items-center text-xs">
        <Link
          href={`/admin/users/${user.id}`}
          className="text-blue-600 hover:underline transition-all"
        >
          Informacion
        </Link>
        {user.role_name === "admin" && (
          <Link
            href={`/admin/incidents/user/${user.id}`}
            className="text-blue-600 hover:underline transition-all"
          >
            Incidencias ({incidents.length})
          </Link>
        )}
      </span>
    </div>
  );
}
