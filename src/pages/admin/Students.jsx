import { useEffect, useState } from "react";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/students/all")
      .then(res => res.json())
      .then(setStudents);
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Students</h2>

      <table className="w-full border text-sm">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="px-4 py-2">Student ID</th>
            <th className="px-4 py-2">Enquiry Code</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Assigned To</th>
          </tr>
        </thead>

        <tbody>
          {students.map(student => (
            <tr key={student._id} className="border-b">
              {/* ✅ THIS is where enquiry code goes */}
              
              <td className="px-4 py-2 font-mono text-blue-700">
                {student.studentEnquiryCode}
              </td>

              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">{student.email}</td>
              <td className="px-4 py-2">{student.phone}</td>
              <td className="px-4 py-2">
                {student.assignedTo?.name || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
