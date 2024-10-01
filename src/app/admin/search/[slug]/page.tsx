"use client";

import LoadingTransition from "@/components/ui/LoadingTransition";
import UserCard from "@/components/ui/UserCard";
import { TIncident, TUser } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page({ params }: { params: { slug: string | number } }) {
  const [data, setData] = useState<TIncident[]>([]);
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/incidents`);
        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchdata();
    fetchUsers();
  }, [slug]);

  const filteredData = data.filter((item) => "INC" + item.id == slug);

  const filterUsers = users.filter((item) =>
    item.name.toLowerCase().includes((slug as string).toLowerCase())
  );

  if (loading) return <LoadingTransition />;

  return (
    <div className="flex flex-col">
      Search for: {slug}
      <section>
        <h1 className="flex w-full border-b-[0.1px] border-black py-3">
          Users ({filterUsers.length})
        </h1>
        <div className="grid grid-cols-4 mt-6">
          {filterUsers.map((user) => (
            <UserCard key={user.id} user={user} incident={filteredData} />
          ))}
        </div>
      </section>
      <section>
        <h1 className="flex w-full border-b-[0.1px] border-black py-3">
          Incidents ({filteredData.length})
        </h1>
        <div className="grid grid-cols-4 mt-6">
          {filteredData.map((incident) => (
            <Link
              href={`/admin/incidents/${incident.id}`}
              key={incident.id}
              className="flex flex-col gap-2 justify-between items-center border border-black/20 rounded-lg p-5 h-[200px] shadow-black hover:shadow-xl bg-white/40"
            >
              <h1 className="text-xl text-black/90 text-center">
                {incident.title}
              </h1>
              <h2 className="text-base text-black/70 text-center">
                {incident.description}
              </h2>
              <h3 className="text-sm text-black/60">{incident.status}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
