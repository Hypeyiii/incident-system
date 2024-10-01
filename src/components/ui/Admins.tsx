import { getUsers, getIncidents } from "@/lib/data";
import { TIncident, TUser } from "@/lib/types";
import UserCard from "./UserCard";

export default async function Admins() {
  const users = (await getUsers()) as TUser[];
  const data = users.filter((user) => user.role_name === "admin");
  const incidents = (await getIncidents()) as TIncident[];
  return (
    <section className="fixed overflow-auto h-full top-0 right-0 w-[85%] mt-[57px] p-10 bg-[#cfc18c33]">
      <div className="grid grid-cols-5 gap-4">
        {data.map((user, index) => (
          <UserCard key={user.id} user={user} incident={incidents} />
        ))}
      </div>
    </section>
  );
}
