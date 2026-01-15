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

            {/* 🔷 HEADER */}
            <div className="flex items-center justify-between">
                {/* 🔢 TOTAL LEADS BAR */}
                <div className="flex items-center justify-between bg-white border rounded-xl shadow-sm px-6 py-3">
                    <p className="text-sm text-gray-600">
                        Total Leads : <span className="text-l px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                            {totalCount}  </span>
                    </p>


                </div>

                <h1 className="text-2xl font-bold text-blue-900">Leads</h1>

                {/* FILTER PILLS */}
                <div className="flex bg-white rounded-full shadow-sm border p-1">
                    {["All", "Registered", "Not Registered"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 text-sm rounded-full transition
                ${filter === f
                                    ? "bg-blue-900 text-white shadow"
                                    : "text-gray-600 hover:bg-gray-100"}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* 📋 TABLE CARD */}
            <div className="bg-white rounded-2xl shadow-md border overflow-hidden ">

                <div className="overflow-x-auto">
                    <table className="w-full text-sm table-fixed">
                        <thead className="bg-blue-900 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left w-[18%]">Student</th>
                                <th className="px-6 py-4 text-left w-[22%]">Email</th>
                                <th className="px-6 py-4 text-left w-[15%]">Phone</th>
                                <th className="px-6 py-4 text-left w-[15%]">Country</th>
                                <th className="px-6 py-4 text-center w-[15%]">Status</th>
                                <th className="px-6 py-4 text-center w-[15%]">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredLeads.map(lead => (
                                <tr
                                    key={lead._id}
                                    className="border-b last:border-none hover:bg-gray-50"
                                >
                                    {/* STUDENT */}
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {lead.name}
                                    </td>

                                    {/* EMAIL */}
                                    <td className="px-6 py-4 truncate">
                                        {lead.email}
                                    </td>

                                    {/* PHONE */}
                                    <td className="px-6 py-4">
                                        {lead.phone}
                                    </td>

                                    {/* COUNTRY */}
                                    <td className="px-6 py-4">
                                        {lead.countryPreference}
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`inline-flex items-center justify-center px-4 py-1 rounded text-xs font-semibold
                                                    ${lead.status === "Registered"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-orange-100 text-red-700"}`}
                                        >
                                            {lead.status}
                                        </span>
                                    </td>
                                    
                                    {/* ACTIONS */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">

                                            {/* TOGGLE REGISTER STATUS */}
                                            {lead.status === "Registered" ? (
                                                <button
                                                    onClick={() => updateStatus(lead._id, "Not Registered")}
                                                    className="px-4 py-1.5 text-xs rounded-md bg-orange-500 text-white hover:bg-orange-600 whitespace-nowrap"
                                                >
                                                    Unregister
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => updateStatus(lead._id, "Registered")}
                                                    className="px-4 py-1.5 text-xs rounded-md bg-green-600 text-white hover:bg-green-700 whitespace-nowrap"
                                                >
                                                    Register
                                                </button>
                                            )}

                                            {/* ADD STUDENT */}
                                            <button
                                                disabled={lead.status !== "Registered"}
                                                onClick={() => addStudent(lead)}
                                                className={`px-4 py-1.5 text-xs rounded-md whitespace-nowrap
    ${lead.status === "Registered"
                                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                                        : "bg-gray-400 text-white cursor-not-allowed"}`}
                                            >
                                                Add Student
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
