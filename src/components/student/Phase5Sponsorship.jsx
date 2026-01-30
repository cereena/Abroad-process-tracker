export default function Phase5Sponsorship({ profile, setProfile, editMode }) {
    const s = profile.sponsorship || {};

    const update = (field, value) => {
        if (!editMode) return;
        setProfile(p => ({
            ...p,
            sponsorship: { ...p.sponsorship, [field]: value }
        }));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-lg font-bold text-blue-800">
                Sponsorship / Financial Planning
            </h2>

            {/* Funding Type */}
            <div>
                <label className="text-sm font-medium">How will you fund your studies?</label>
                <select
                    value={s.type || ""}
                    onChange={e => update("type", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                >
                    <option value="">Select</option>
                    <option value="loan">Educational Loan</option>
                    <option value="sponsor">Sponsor</option>
                </select>
            </div>

            {/* Loan Questions */}
            {s.type === "loan" && (
                <div className="space-y-4">
                    <select
                        value={s.loanType || ""}
                        onChange={e => update("loanType", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="">Loan Type</option>
                        <option value="collateral">Collateral</option>
                        <option value="non-collateral">Non-Collateral</option>
                    </select>

                    <input
                        placeholder="Bank / Financial Institution"
                        value={s.bankName || ""}
                        onChange={e => update("bankName", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Approx Loan Amount"
                        value={s.loanAmount || ""}
                        onChange={e => update("loanAmount", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
            )}

            {/* Sponsor Questions */}
            {s.type === "sponsor" && (
                <div className="space-y-4">
                    <input
                        placeholder="Sponsor Name"
                        value={s.sponsorName || ""}
                        onChange={e => update("sponsorName", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Relationship"
                        value={s.relationship || ""}
                        onChange={e => update("relationship", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    <input
                        placeholder="Sponsor Occupation"
                        value={s.sponsorOccupation || ""}
                        onChange={e => update("sponsorOccupation", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />

                    {/* Is sponsor abroad */}
                    <label className="text-sm font-medium">
                        Is sponsor abroad? <span className="text-red-500">*</span>
                    </label>

                    <select
                        value={
                            s.isAbroad === true
                                ? "yes"
                                : s.isAbroad === false
                                    ? "no"
                                    : ""
                        }
                        onChange={e =>
                            update(
                                "isAbroad",
                                e.target.value === "yes"
                                    ? true
                                    : e.target.value === "no"
                                        ? false
                                        : null
                            )
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>


                    {/* PR only if abroad */}
                    {s.isAbroad === true && (
                        <>
                            <label className="text-sm font-medium">
                                Does sponsor have PR? <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={
                                    s.hasPR === true ? "yes" : s.hasPR === false ? "no" : ""
                                }
                                onChange={e =>
                                    update(
                                        "hasPR",
                                        e.target.value === "yes"
                                            ? true
                                            : e.target.value === "no"
                                                ? false
                                                : null
                                    )
                                }
                                className="w-full border rounded-lg px-3 py-2"
                            >

                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </>
                    )}


                    <label className="text-sm font-medium">
                        Does sponsor file ITR? <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={
                            s.filesITR === true ? "yes" : s.filesITR === false ? "no" : ""
                        }
                        onChange={e =>
                            update(
                                "filesITR",
                                e.target.value === "yes"
                                    ? true
                                    : e.target.value === "no"
                                        ? false
                                        : null
                            )
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    >

                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <label className="text-sm font-medium">
                        Stable bank transactions (last 2 months)? <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={
                            s.goodTransactions === true
                                ? "yes"
                                : s.goodTransactions === false
                                    ? "no"
                                    : ""
                        }
                        onChange={e =>update("goodTransactions",
                                e.target.value === "yes"
                                    ? true
                                    : e.target.value === "no"
                                    ? false
                                    : null)}
                                    className="w-full border rounded-lg px-3 py-2">

                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                </div>
            )}
        </div>
    );
}
