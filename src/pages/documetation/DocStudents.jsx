import { useState } from "react";

export default function DocStudents() {
  const [search, setSearch] = useState("");

  const students = [
    {
      id: 1795,
      name: "Aansh Jain",
      email: "aanshjain@gmail.com",
      phone: "+91-9643436536",
      location: "Madhya Pradesh, India",
      status: "Course Preference Added",
      assignedTo: "Admin Admin",
      created: "17 Aug 2023",
      profileAge: "41 Days",
      branch: "Bannerghatta Rd",
    },
    {
      id: 1747,
      name: "Mohmad Siraj",
      email: "siraj@test.com",
      phone: "+91-8523697412",
      location: "India",
      status: "Course Preference Added",
      assignedTo: "--",
      created: "20 Mar 2023",
      profileAge: "191 Days",
      applications: 1,
      branch: "Bannerghatta Rd",
    },
    {
      id: 1732,
      name: "Ks Bharat",
      email: "ksbharat@gmail.com",
      phone: "+91-4587123654",
      location: "Jamshedpur, Indonesia",
      status: "Application Processing",
      assignedTo: "--",
      created: "17 Mar 2023",
      profileAge: "194 Days",
      applications: 3,
      branch: "Bannerghatta Rd",
    },
  ];

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Students</h2>

        <div className="flex gap-3">
          <button className="border px-3 py-2 rounded-md text-sm">
            🔍 Filter
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            ➕ Create
          </button>
        </div>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm">
          Show{" "}
          <select className="border rounded px-2 py-1 mx-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>{" "}
          entries
        </div>

        <input
          type="text"
          placeholder="Search by ID, Name, Email, Mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-72 text-sm"
        />
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Next Follow-up</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Assigned to</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">

                {/* ID */}
                <td className="p-3 font-medium">{s.id}</td>

                {/* STUDENT INFO */}
                <td className="p-3">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-gray-500 text-xs">📧 {s.email}</p>
                  <p className="text-gray-500 text-xs">📞 {s.phone}</p>
                  <p className="text-gray-500 text-xs">🌍 {s.location}</p>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      Profile Age: {s.profileAge}
                    </span>

                    {s.applications && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        Applications: {s.applications}
                      </span>
                    )}

                    <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                      {s.branch}
                    </span>
                  </div>
                </td>

                {/* NEXT FOLLOW UP */}
                <td className="p-3 text-gray-500">--</td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`font-medium ${
                      s.status === "Application Processing"
                        ? "text-green-600"
                        : "text-indigo-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                {/* ASSIGNED */}
                <td className="p-3">{s.assignedTo}</td>

                {/* CREATED */}
                <td className="p-3 text-gray-600">{s.created}</td>

                {/* ACTIONS */}
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      className="border border-blue-600 text-blue-600 px-2 py-1 rounded"
                      onClick={() => alert(`Viewing ${s.name}`)}
                    >
                      👁
                    </button>
                    <button className="border border-red-500 text-red-500 px-2 py-1 rounded">
                      ⋮
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
