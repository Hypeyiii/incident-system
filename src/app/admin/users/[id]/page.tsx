import User from "@/components/ui/User";
import { getUserById } from "@/lib/data";
import { TUser } from "@/lib/types";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = (await getUserById(id)) as any;
  const user = data[0];
  return <User user={user} />;
}
