import { getIncidents } from "@/lib/data";
import { TIncident } from "@/lib/types";
import Link from "next/link";

export default async function GeneralIncidents() {
  const data = (await getIncidents()) as TIncident[];
  const incidents = data.filter(
    (p) => p.status == "open" && p.assigned_to == null
  );

  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-lg shadow-lg h-fit max-h-[350px] mb-32">
      <h1 className="text-white bg-blue-500 uppercase text-sm font-semibold flex items-center justify-center py-3 rounded-t-lg">
        Incidencias - L2 - ( {incidents.length} )
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-gray-700 text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 text-center">Número</th>
              <th className="py-2 px-4 text-center">Caller</th>
              <th className="py-2 px-4 text-center">Priority</th>
              <th className="py-2 px-4 text-center">Department</th>
              <th className="py-2 px-4 text-center">Short Description</th>
              <th className="py-2 px-4 text-center">Updated</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident, index) => (
              <tr
                key={incident.id}
                className={`text-center text-[15px] border-b ${
                  index % 2 === 0 ? "bg-gray-100 hover:bg-white" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="py-2 px-4 text-blue-500 underline">
                  <Link href={`/admin/incidents/${incident.id}`}>
                    INC{incident.id}
                  </Link>
                </td>
                <td className="py-2 px-4">{incident.reported_by_name}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      incident.priority === "Critical" &&
                      "bg-red-100 text-red-900"
                    } ${
                      incident.priority === "High" &&
                      "bg-red-100 text-red-700"
                    } ${
                      incident.priority === "Medium" &&
                      "bg-yellow-100 text-yellow-300"
                    } ${
                      incident.priority === "Low" &&
                      "bg-yellow-50 text-yellow-150"
                    }`}
                  >
                    {incident.priority}
                  </span>
                </td>
                <td className="py-2 px-4">{incident.department}</td>
                <td className="py-2 px-4">{incident.title}</td>
                <td className="py-2 px-4">
                  {incident.updated_at?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
