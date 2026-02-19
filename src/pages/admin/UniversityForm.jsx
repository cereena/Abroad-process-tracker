import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ENUMS = {
    degree: ["Bachelors", "Masters", "PhD", "Diploma"],

    stream: [
        "Computer Science",
        "Engineering",
        "Business",
        "Health",
        "Arts",
        "Science",
    ],

    ielts: ["Required", "Waiver", "Not Required"],

    prChance: ["Low", "Medium", "High"],
};

const UniversityForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = Boolean(id);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        universityName: "",
        country: "",
        city: "",
        partner: false,
        globalRanking: "",
        globallyRecognized: false,

        courseName: "",
        degree: "",
        stream: "",
        minPercentage: "",
        ielts: "",

        tuitionFee: "",
        applicationFee: "",
        showMoney: "",
        freeEducation: false,

        schengen: false,
        prChance: "",
        stayBackYears: "",
        partTimeHours: "",

        intakes: "",
        commissionPercent: "",
    });

    /* ================= LOAD EDIT ================= */

    useEffect(() => {
        if (isEdit) fetchOne();
    }, [id]);

    const fetchOne = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("adminToken");

            const res = await fetch(
                `http://localhost:5000/api/admin/universities/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to load university");
            }

            const data = await res.json();

            console.log("DATA FROM API:", data);

            setForm({
                universityName: data.name || "",
                country: data.country || "",
                city: data.city || "",
                partner: data.partner || false,
                globalRanking: data.globalRanking || "",
                globallyRecognized: data.globallyRecognized || false,

                courseName: data.course || "",
                degree: data.degree || "",
                stream: data.stream || "",
                minPercentage: data.minPercentage || "",
                ielts: data.ielts || "",

                tuitionFee: data.tuitionFee || "",
                applicationFee: data.applicationFee || "",
                showMoney: data.showMoney || "",
                freeEducation: data.freeEducation || false,

                schengen: data.schengen || false,
                prChance: data.prChance || "",
                stayBackYears: data.stayBackYears || "",
                partTimeHours: data.partTimeHours || "",

                intakes: data.intakes?.join(", ") || "",
                commissionPercent: data.commissionPercent || "",
            });
        } catch (err) {
            console.error(err);
            alert("Failed to load data");
            navigate(-1);
        } finally {
            setLoading(false);
        }
    };

    /* ================= CHANGE HANDLER ================= */

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    /* ================= SAVE ================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token = localStorage.getItem("adminToken");

            const payload = {
                ...form,

                globalRanking: Number(form.globalRanking),
                minPercentage: Number(form.minPercentage),

                tuitionFee: Number(form.tuitionFee),
                applicationFee: Number(form.applicationFee),
                showMoney: Number(form.showMoney),

                stayBackYears: Number(form.stayBackYears),
                partTimeHours: Number(form.partTimeHours),
                commissionPercent: Number(form.commissionPercent),

                intakes: form.intakes
                    .split(",")
                    .map((i) => i.trim())
                    .filter(Boolean),
            };

            console.log("SENDING:", payload);

            const url = isEdit
                ? `http://localhost:5000/api/admin/universities/${id}`
                : "http://localhost:5000/api/admin/universities";

            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Save failed");
            }

            alert(isEdit ? "Updated Successfully" : "Created Successfully");

            navigate("/admin/universities");
        } catch (err) {
            console.error(err);
            alert(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    /* ================= UI ================= */

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-600">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 bg-blue-50 min-h-screen w-full">
            <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow">

                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700">
                    {isEdit ? "Edit University" : "Add University"}
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {Object.keys(form).map((key) => (
                        <label key={key} htmlFor={key} className="text-sm flex flex-col gap-1 w-full">
                            <span className="capitalize text-gray-700">{key.replace(/([A-Z])/g, " $1")}</span>

                            {typeof form[key] === "boolean" ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        id={key}
                                        name={key}
                                        type="checkbox"
                                        checked={form[key]}
                                        onChange={handleChange}
                                        className="h-4 w-4"
                                    />
                                    <span className="text-sm">{key.replace(/([A-Z])/g, " $1")}</span>
                                </div>
                            ) : ENUMS[key] ? (
                                <select
                                    id={key}
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    required
                                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white w-full"
                                >
                                    <option value="">Select</option>
                                    {ENUMS[key].map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    id={key}
                                    name={key}
                                    type={["globalRanking", "minPercentage", "tuitionFee", "applicationFee", "showMoney", "stayBackYears", "partTimeHours", "commissionPercent"].includes(key) ? "number" : "text"}
                                    value={form[key]}
                                    onChange={handleChange}
                                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                                />
                            )}
                        </label>
                    ))}

                    <div className="col-span-1 sm:col-span-2 flex flex-wrap gap-4 mt-6 justify-start sm:justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition disabled:opacity-60"
                        >
                            {isEdit ? "Update" : "Create"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="border px-6 py-2 rounded hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default UniversityForm;
