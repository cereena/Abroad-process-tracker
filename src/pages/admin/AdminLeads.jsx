import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLeads() {
    const [leads, setLeads] = useState([]);
    const [filter, setFilter] = useState("All");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/leads")
            .then(res => res.json())
            .then(setLeads);
    }, []);

    const updateStatus = async (id, status) => {
        await fetch(`http://localhost:5000/api/leads/${id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });

        setLeads(leads.map(l =>
            l._id === id ? { ...l, status } : l
        ));
    };

    const addStudent = (lead) => {
        navigate("/admin/students/add", { state: lead });
    };

    const filteredLeads = leads.filter(l => {
        if (filter === "All") return true;
        return l.status === filter;
    });

    const totalCount = filteredLeads.length;

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                {/* TOTAL */}
                <div className="bg-white border rounded-xl px-5 py-2 shadow-sm">
                    <p className="text-sm text-gray-600">
                        Total Leads
                        <span className="ml-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">
                            {totalCount}
                        </span>
                    </p>
                </div>

                <h1 className="text-2xl font-bold text-gray-800">Leads</h1>

                {/* FILTER */}
                <div className="flex bg-white border rounded-lg p-1 shadow-sm">
                    {["All", "Not Registered"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 text-sm rounded-md transition
                                    ${filter === f
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">Student</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Phone</th>
                                <th className="px-6 py-3 text-left">Country</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredLeads.map(lead => (
                                <tr
                                    key={lead._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    {/* STUDENT */}
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {lead.name}
                                    </td>

                                    {/* EMAIL */}
                                    <td className="px-6 py-4 text-gray-600">
                                        {lead.email}
                                    </td>

                                    {/* PHONE */}
                                    <td className="px-6 py-4 text-gray-600">
                                        {lead.phone}
                                    </td>

                                    {/* COUNTRY */}
                                    <td className="px-6 py-4 text-gray-600">
                                        {lead.countryPreference}
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                                                    ${lead.status === "Registered"
                                                    ? "bg-green-50 text-green-700"
                                                    : lead.status === "Student Created"
                                                        ? "bg-blue-50 text-blue-700"
                                                        : "bg-orange-50 text-orange-700"
                                                }`}
                                        >
                                            {lead.status}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">

                                            {/* REGISTER / UNREGISTER */}
                                            {!lead.isStudentCreated && (
                                                lead.status === "Registered" ? (
                                                    <button
                                                        onClick={() => updateStatus(lead._id, "Not Registered")}
                                                        className="px-3 py-1.5 text-xs rounded-md border text-orange-700 border-orange-300 hover:bg-orange-50"
                                                    >
                                                        Unregister
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => updateStatus(lead._id, "Registered")}
                                                        className="px-3 py-1.5 text-xs rounded-md border text-black-500 border-black"
                                                    >
                                                        Register
                                                    </button>
                                                )
                                            )}

                                            {/* ADD STUDENT */}
                                            <button
                                                disabled={lead.isStudentCreated || lead.status !== "Registered"}
                                                onClick={() => addStudent(lead)}
                                                className={`px-3 py-1.5 text-xs rounded-md font-medium
                                                        ${lead.isStudentCreated
                                                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                                                        : lead.status === "Registered"
                                                            ? "bg-blue-600 text-white hover:bg-blue-600"
                                                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                    }`}
                                            >
                                                {lead.isStudentCreated ? "Student Added" : "Add Student"}
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
