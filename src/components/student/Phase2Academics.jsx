const qualifications = ["10th", "12th", "Diploma", "Degree", "Post Graduation"];

export default function Phase2Academics({ profile, setProfile, editMode = true }) {
  const q = profile.academicInfo.highestQualification;

  const update = (section, field, value) => {
    if (!editMode) return;
    setProfile(p => ({
      ...p,
      academicInfo: {
        ...p.academicInfo,
        [section]: {
          ...p.academicInfo[section],
          [field]: value
        }
      }
    }));
  };

  const show10th = ["10th", "12th", "Diploma", "Degree", "Post Graduation"].includes(q);
  const show12th = ["12th", "Diploma", "Degree", "Post Graduation"].includes(q);
  const showDiploma = q === "Diploma";
  const showDegree = ["Degree", "Post Graduation"].includes(q);
  const showPG = q === "Post Graduation";

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-lg font-bold text-blue-800">
        Academic Information
      </h2>

      {/* Highest Qualification */}
      <div>
        <label className="text-sm font-medium">Highest Qualification</label>
        <select
          disabled={!editMode}
          value={q}
          onChange={e =>
            setProfile(p => ({
              ...p,
              academicInfo: {
                ...p.academicInfo,
                highestQualification: e.target.value
              }
            }))
          }
          className="w-full mt-1 border rounded-lg px-3 py-2"
        >
          <option value="">Select</option>
          {qualifications.map(q => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
      </div>

      {/* 10th */}
      {show10th && (
        <AcademicBlock title="10th Standard">
          <Input
            label="Board"
            value={profile.academicInfo.tenth?.board || ""}
            onChange={e => update("tenth", "board", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Specialization / Stream"
            value={profile.academicInfo.tenth?.specialization || ""}
            onChange={e => update("tenth", "specialization", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Marks (%)"
            value={profile.academicInfo.tenth?.marks || ""}
            onChange={e => update("tenth", "marks", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Passout Year"
            value={profile.academicInfo.tenth?.passoutYear || ""}
            onChange={e => update("tenth", "passoutYear", e.target.value)}
            disabled={!editMode}
          />
        </AcademicBlock>
      )}

      {/* 12th */}
      {show12th && (
        <AcademicBlock title="12th Standard">
          <Input
            label="Board"
            value={profile.academicInfo.twelfth?.board || ""}
            onChange={e => update("twelfth", "board", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Specialization / Stream"
            placeholder="Science / Commerce / Humanities"
            value={profile.academicInfo.twelfth?.specialization || ""}
            onChange={e => update("twelfth", "specialization", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Marks (%)"
            value={profile.academicInfo.twelfth?.marks || ""}
            onChange={e => update("twelfth", "marks", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Passout Year"
            value={profile.academicInfo.twelfth?.passoutYear || ""}
            onChange={e => update("twelfth", "passoutYear", e.target.value)}
            disabled={!editMode}
          />
        </AcademicBlock>
      )}

      {/* Diploma */}
      {showDiploma && (
        <AcademicBlock title="Diploma">
          <Input
            label="Institution"
            value={profile.academicInfo.diploma?.institution || ""}
            onChange={e => update("diploma", "institution", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Course"
            value={profile.academicInfo.diploma?.course || ""}
            onChange={e => update("diploma", "course", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Passout Year"
            value={profile.academicInfo.diploma?.passoutYear || ""}
            onChange={e => update("diploma", "passoutYear", e.target.value)}
            disabled={!editMode}
          />
        </AcademicBlock>
      )}

      {/* Degree */}
      {showDegree && (
        <AcademicBlock title="Degree">
          <Input
            label="University"
            value={profile.academicInfo.degree?.university || ""}
            onChange={e => update("degree", "university", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Course"
            value={profile.academicInfo.degree?.course || ""}
            onChange={e => update("degree", "course", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="CGPA / Marks"
            value={profile.academicInfo.degree?.cgpa || ""}
            onChange={e => update("degree", "cgpa", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Passout Year"
            value={profile.academicInfo.degree?.passoutYear || ""}
            onChange={e => update("degree", "passoutYear", e.target.value)}
            disabled={!editMode}
          />
        </AcademicBlock>
      )}

      {/* Post Graduation */}
      {showPG && (
        <AcademicBlock title="Post Graduation">
          <Input
            label="University"
            value={profile.academicInfo.pg?.university || ""}
            onChange={e => update("pg", "university", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Course"
            value={profile.academicInfo.pg?.course || ""}
            onChange={e => update("pg", "course", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="CGPA / Marks"
            value={profile.academicInfo.pg?.cgpa || ""}
            onChange={e => update("pg", "cgpa", e.target.value)}
            disabled={!editMode}
          />
          <Input
            label="Passout Year"
            value={profile.academicInfo.pg?.passoutYear || ""}
            onChange={e => update("pg", "passoutYear", e.target.value)}
            disabled={!editMode}
          />
        </AcademicBlock>
      )}
    </div>
  );
}

/* Helpers */

function AcademicBlock({ title, children }) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full mt-1 border rounded-lg px-3 py-2"
      />
    </div>
  );
}
