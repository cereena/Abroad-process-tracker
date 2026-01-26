const qualifications = ["10th", "12th", "Diploma", "Degree", "Post Graduation"];

export default function Phase2Academics({ profile, setProfile, editMode }) {
  const q = profile.academicInfo.highestQualification;

  const update = (field, value) => {
    if (!editMode) return;
    setProfile(p => ({
      ...p,
      academicInfo: { ...p.academicInfo, [field]: value }
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-bold text-blue-800">
        Academic Information
      </h2>

      {/* Highest Qualification */}
      <div>
        <label className="text-sm font-medium">Highest Qualification</label>
        <select
          disabled={!editMode}
          value={q}
          onChange={e => update("highestQualification", e.target.value)}
          className="w-full mt-1 border rounded-lg px-3 py-2"
        >
          <option value="">Select</option>
          {qualifications.map(q => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
      </div>

      {(q === "10th" || q === "12th") && (
        <>
          <input disabled={!editMode} placeholder="Board" className="input" />
          <input disabled={!editMode} placeholder="Marks (%)" className="input" />
          <input disabled={!editMode} placeholder="Passout Year" className="input" />
        </>
      )}

      {(q === "Diploma" || q === "Degree" || q === "Post Graduation") && (
        <>
          <input disabled={!editMode} placeholder="Institution / University" className="input" />
          <input disabled={!editMode} placeholder="Course" className="input" />
          <input disabled={!editMode} placeholder="CGPA / Marks" className="input" />
          <input disabled={!editMode} placeholder="Passout Year" className="input" />
        </>
      )}
    </div>
  );
}
