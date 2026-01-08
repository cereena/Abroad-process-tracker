export default function Students() {
  const students = [
    { id: 1, name: "Rahul", status: "Active", visa: "In Progress" },
    { id: 2, name: "Aisha", status: "Inactive", visa: "Approved" },
    { id: 3, name: "John", status: "Active", visa: "Pending" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Students</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Visa</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-b">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.status}</td>
                <td className="p-3">{s.visa}</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
