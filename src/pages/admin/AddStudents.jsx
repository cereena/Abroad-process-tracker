import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddStudent() {
    const { state: lead } = useLocation();
    const navigate = useNavigate();

    const [executives, setExecutives] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        countryPreference: "",
        assignedTo: ""
    });

    //  safety: if no lead, go back
    useEffect(() => {
        if (!lead) {
            navigate("/admin/leads");
            return;
        }

        if (lead.isStudentCreated) {
            alert("Student already created for this lead");
            navigate("/admin/leads");
            return;
        }
        setForm({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            countryPreference: lead.countryPreference,
            assignedTo: ""
        });

        fetch("http://localhost:5000/api/doc-executives/all", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("RAW EXECUTIVES FROM API:", data);

                const filtered = data.filter(exec =>
                    Array.isArray(exec.countriesHandled) &&
                    exec.countriesHandled.some(
                        c => c.toLowerCase() === lead.countryPreference.toLowerCase()
                    )
                );

                setExecutives(filtered);
            });
    }, [lead, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/student",
                {
                    leadId: lead._id,
                    assignedTo: form.assignedTo
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            alert("Student created successfully");
            navigate("/admin/students");

        } catch (err) {
            if (err.response?.status === 409) {
                alert("Student already exists");
                navigate("/admin/leads");
            } else {
                console.error("CREATE STUDENT ERROR:", err.response?.data || err.message);
                alert("Failed to create student");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">

            {/* PAGE HEADER */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900">
                    Add New Student
                </h2>
                <p className="text-gray-500 text-sm">
                    Convert registered lead into a student and assign an executive
                </p>
            </div>

            {/* CARD */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Student Name
                            </label>
                            <input
                                value={form.name}
                                readOnly
                                className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Email
                            </label>
                            <input
                                value={form.email}
                                readOnly
                                className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Phone
                            </label>
                            <input
                                value={form.phone}
                                readOnly
                                className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Country Preference
                            </label>
                            <input
                                value={form.countryPreference}
                                readOnly
                                className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                            />
                        </div>

                        {/* ASSIGN EXECUTIVE */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Assign Executive
                            </label>
                            <select
                                required
                                value={form.assignedTo}
                                onChange={e => setForm({ ...form, assignedTo: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                            >
                                <option value="">Select Executive</option>
                                {executives.map(e => (
                                    <option key={e._id} value={e._id}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* ACTION */}
                    <div className="flex justify-end pt-4">
                        <button
                            className="px-8 py-2.5 rounded-lg bg-blue-700 text-white font-semibold
                       hover:bg-blue-800 transition shadow-md"
                        >
                            Create Student
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );

}
