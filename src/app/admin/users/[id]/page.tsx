import User from "@/components/ui/User";
import { getUserById } from "@/lib/data";
import { TUser } from "@/lib/types";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = (await getUserById(id)) as any;
  const user = data[0];
  return (
    <section className="fixed overflow-auto flex flex-col gap-20 top-0 right-0 w-[85%] h-full mt-[57px] p-10 bg-[#cfc18c33]">
      <User user={user} />
    </section>
  );
}
