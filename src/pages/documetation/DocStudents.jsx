import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DocStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("docToken");

    fetch("http://localhost:5000/api/student/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          setStudents([]);
        }
      })
      .catch((err) => {
        console.error("Fetch students error:", err);
        setStudents([]);
      });
  }, []);

  const filtered = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Action handlers
  const handleView = (student) => {
    // Navigate or open modal to view student details
    alert(`Viewing ${student.name}'s details`);
  };

  const handleStatusChange = async (student, newStatus) => {
    const token = localStorage.getItem("docToken");

    try {
      const res = await fetch(
        `http://localhost:5000/api/student/${student._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");

      // Update local state
      setStudents((prev) =>
        prev.map((s) =>
          s._id === student._id ? { ...s, status: newStatus } : s
        )
      );
      alert(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Students</h2>
      </div>

      {/* SEARCH */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-72 text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Enquiry Code</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.email}</p>
                  <p className="text-xs text-gray-500">{s.phone}</p>
                </td>

                <td className="p-3">{s.studentEnquiryCode || "—"}</td>

                <td className="p-3">{s.countryPreference || "—"}</td>

                <td className="p-3 text-indigo-600 font-medium">{s.status}</td>

                <td className="p-3 text-gray-600">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      if (!s.profileCompleted) {
                        alert("Student has not completed profile yet");
                        return;
                      }
                      navigate(`/docExecutive/students/${s._id}`);
                    }}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                  >
                    View Profile
                  </button>


                  <select
                    className="border px-2 py-1 text-xs rounded"
                    value={s.status}
                    onChange={(e) => handleStatusChange(s, e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Docs">Docs</option>
                    <option value="Visa">Visa</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <p className="text-center text-gray-500 p-6">
            No students assigned yet
          </p>
        )}
      </div>
    </div>
  );
}
