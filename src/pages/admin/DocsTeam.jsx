import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function DocsTeam() {
  const [executives, setExecutives] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedExec, setSelectedExec] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    fetchExecutives();
    fetchStudents();
  }, []);


  const fetchExecutives = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/doc-executives/all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      );
      setExecutives(res.data);
    } catch (err) {
      console.error("Exec fetch error:", err);
      alert("Failed to load executives");
    }
  };

  // ✅ FETCH UNASSIGNED STUDENTS
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/student/unassigned",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      );
      setStudents(res.data);
    } catch (err) {
      console.error("Student fetch error:", err);
    }
  };

  // ✅ ASSIGN STUDENT
  const assignStudent = async () => {
    if (!selectedStudent || !selectedExec) return;

    try {
      await axios.post(
        "http://localhost:5000/api/student/assign",
        {
          studentId: selectedStudent,
          executiveId: selectedExec._id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      );

      alert("Student assigned successfully");
      setSelectedExec(null);
      setSelectedStudent("");
      fetchStudents();
      fetchExecutives();
    } catch (err) {
      console.error("Assign error:", err);
      alert("Assignment failed");
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-blue-900">
          Documentation Team
        </h2>

        <NavLink
          to="/admin/docs-team/add"
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          + Add Executive
        </NavLink>
      </div>

      {/* EXEC TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-blue-900">
            <tr>
              <th className="p-3 text-left">Executive</th>
              <th className="p-3">Countries</th>
              <th className="p-3">Assigned Students</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {executives.map((exec) => (
              <tr key={exec._id} className="border-b">
                <td className="p-3 font-medium">{exec.name}</td>
                <td className="p-3 text-center">
                  {exec.countriesHandled?.join(", ")}
                </td>
                <td className="p-3 text-center">
                  {exec.assignedStudents?.length || 0}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedExec(exec)}
                    className="bg-blue-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Assign Student
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ASSIGN MODAL */}
      {selectedExec && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[420px]">
            <h3 className="text-lg font-bold text-blue-900 mb-3">
              Assign Student to {selectedExec.name}
            </h3>

            <select
              className="w-full border p-2 rounded mb-4"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Select Student</option>
              {students
                .filter(s => selectedExec.countriesHandled?.includes(s.countryPreference))
                .map(s => (
                  <option key={s._id} value={s._id}>
                    {s.name} — {s.countryPreference}
                  </option>
                ))}

            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedExec(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={assignStudent}
                className="px-4 py-2 bg-orange-600 text-white rounded"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocsTeam;
