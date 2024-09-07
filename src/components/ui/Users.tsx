import { getUsers } from "@/lib/data";
import { TUser } from "@/lib/types";
import UserCard from "./UserCard";

export default async function Users() {
  const users = (await getUsers()) as TUser[];
  const data = users.filter((user) => user.role_name === "admin");
  return (
    <section className="fixed overflow-auto h-full top-0 right-0 w-[85%] mt-[57px] p-10 bg-[#cfc18c33]">
      <div className="grid grid-cols-5 gap-4">
        {data.map((user, index) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}
