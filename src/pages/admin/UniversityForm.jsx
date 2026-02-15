import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UniversityForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = Boolean(id);

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

    /* LOAD EDIT */

    useEffect(() => {
        if (isEdit) fetchOne();
    }, [id]);

    const fetchOne = async () => {
        const token = localStorage.getItem("adminToken");

        const res = await fetch(
            `http://localhost:5000/api/admin/universities/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("STATUS:", res.status);

        const data = await res.json();

        console.log("DATA FROM API:", data); // 👈 ADD THIS

        setForm({
            universityName: data.universityName || "",
            country: data.country || "",
            city: data.city || "",
            partner: data.partner || false,
            globalRanking: data.globalRanking || "",
            globallyRecognized: data.globallyRecognized || false,
            courseName: data.courseName || "",
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
    };



    /* SAVE */

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            intakes: form.intakes.split(",").map(i => i.trim()),
        };

        const url = isEdit
            ? `http://localhost:5000/api/admin/universities/${id}`
            : "http://localhost:5000/api/admin/universities";

        const method = isEdit ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        navigate("/admin/universities");
    };

    /* UI */

    return (
        <div className="p-6 bg-blue-50 min-h-screen">

            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">

                <h1 className="text-2xl font-bold mb-6 text-blue-700">
                    {isEdit ? "Edit University" : "Add University"}
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >

                    {Object.keys(form).map((key) => (
                        <label key={key} className="text-sm">

                            {key.replace(/([A-Z])/g, " $1")}

                            {typeof form[key] === "boolean" ? (
                                <input
                                    type="checkbox"
                                    checked={form[key]}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [key]: e.target.checked,
                                        })
                                    }
                                    className="mt-2"
                                />
                            ) : (
                                <input
                                    type={
                                        [
                                            "globalRanking",
                                            "minPercentage",
                                            "tuitionFee",
                                            "applicationFee",
                                            "showMoney",
                                            "stayBackYears",
                                            "partTimeHours",
                                            "commissionPercent",
                                        ].includes(key)
                                            ? "number"
                                            : "text"
                                    }
                                    value={form[key]}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            [key]: e.target.value,
                                        })
                                    }
                                    className="border p-2 w-full rounded mt-1"
                                />
                            )}

                        </label>
                    ))}


                    <div className="col-span-2 flex items-center gap-4 mt-4">

                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-6 py-2 rounded"
                        >
                            {isEdit ? "Update" : "Create"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="border px-6 py-2 rounded"
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
