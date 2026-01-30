export default function Phase4Preferences({ profile, setProfile, editMode = true }) {
    const pref = profile.preferences || {};

    const update = (field, value) => {
        if (!editMode) return;
        setProfile(p => ({
            ...p,
            preferences: {
                ...p.preferences,
                [field]: value
            }
        }));
    };

    const toggleCountry = country => {
        const list = pref.countries || [];
        update(
            "countries",
            list.includes(country)
                ? list.filter(c => c !== country)
                : [...list, country]
        );
    };

    const countries = [
        "CANADA", "UK", "POLAND", "AUSTRALIA",
        "IRELAND", "GERMANY"
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
            <h2 className="text-lg font-bold text-blue-800">
                Study Preferences
            </h2>

            {/* Country Preferences */}
            <div>
                <p className="text-sm font-medium mb-2">Preferred Countries</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {countries.map(c => (
                        <label
                            key={c}
                            className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                disabled={!editMode}
                                checked={pref.countries?.includes(c)}
                                onChange={() => toggleCountry(c)}
                            />
                            {c}
                        </label>
                    ))}
                </div>
            </div>

            {/* Course Preference */}
            <div>
                <label className="text-sm font-medium">Preferred Course</label>
                <input
                    disabled={!editMode}
                    value={pref.course || ""}
                    onChange={e => update("course", e.target.value)}
                    placeholder="Eg: Computer Science, MBA"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                />
            </div>

            {/* university preference  */}
            {/* University Preference */}
            <div>
                <label className="text-sm font-medium">Preferred University</label>
                <input
                    disabled={!editMode}
                    value={pref.university || ""}
                    onChange={e => update("university", e.target.value)}
                    placeholder="Eg: University of Edinburgh"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                />
            </div>


            {/* Intake */}
            <div>
                <label className="text-sm font-medium">Preferred Intake</label>
                <select
                    disabled={!editMode}
                    value={pref.intake || ""}
                    onChange={e => update("intake", e.target.value)}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                >
                    <option value="">Select</option>
                    <option value="Jan">January</option>
                    <option value="Sep">March</option>
                    <option value="May">May</option>
                    <option value="Sep">September</option>
                    <option value="Undecided">Undecided</option>
                </select>
            </div>

            {/* English Test */}
            <div>
                <label className="text-sm font-medium">English Language</label>
                <select
                    disabled={!editMode}
                    value={pref.englishTest || ""}
                    onChange={e => update("englishTest", e.target.value)}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                >
                    <option value="">Select</option>
                    <option value="MOI">MOI</option>
                    <option value="IELTS">IELTS</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="PTE">PTE</option>
                    <option value="Duolingo">Duolingo</option>
                    <option value="Not decided">Not decided</option>
                </select>
            </div>

            {/* Score */}
            {pref.englishTest && pref.englishTest !== "MOI" && (
                <div>
                    <label className="text-sm font-medium">Score (if available)</label>
                    <input
                        disabled={!editMode}
                        type="number"
                        value={pref.score || ""}
                        onChange={e => update("score", e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-2"
                    />
                </div>
            )}
        </div>
    );
}
