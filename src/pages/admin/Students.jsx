import { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/student/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then(res => {
        console.log("STUDENTS:", res.data);
        setStudents(res.data);
      })
      .catch(err => {
        console.error("Student fetch error:", err.response?.data || err.message);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Students</h2>

      {/* Responsive wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Student ID</th>
              <th className="px-4 py-3 text-left">Enquiry Code</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Serial No */}
                  <td className="px-4 py-2">{index + 1}</td>

                  {/* Student ID (short) */}
                  <td className="px-4 py-2 font-mono text-gray-600">
                    {student._id.slice(-6)}
                  </td>

                  {/* ✅ Enquiry Code (FIXED FIELD NAME IF NEEDED) */}
                  <td className="px-4 py-2 font-mono text-blue-700">
                    {student.enquiryCode || "—"}
                  </td>

                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">{student.phone}</td>

                  <td className="px-4 py-2">
                    {student.assignedTo?.name || (
                      <span className="text-gray-400 italic">
                        Unassigned
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
