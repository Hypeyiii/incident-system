import MyIncidents from "@/components/ui/MyIncidents";

export default function Page() {
  return (
    <section className="fixed overflow-auto flex flex-col gap-20 top-0 right-0 w-[85%] h-full mt-[57px] p-10 bg-[#cfc18c33]">
      <MyIncidents />
    </section>
  );
}
