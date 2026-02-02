const qualifications = ["10th", "12th", "Diploma", "Degree", "PG"];
/* 
   Utility: Calculate Gap
*/
const calculateGap = (academicInfo) => {
  const years = [];

  if (academicInfo.tenth?.passoutYear) years.push(+academicInfo.tenth.passoutYear);
  if (academicInfo.twelfth?.passoutYear) years.push(+academicInfo.twelfth.passoutYear);
  if (academicInfo.diploma?.passoutYear) years.push(+academicInfo.diploma.passoutYear);
  if (academicInfo.degree?.passoutYear) years.push(+academicInfo.degree.passoutYear);
  if (academicInfo.pg?.passoutYear) years.push(+academicInfo.pg.passoutYear);

  if (!years.length) return 0;

  const latest = Math.max(...years);
  return new Date().getFullYear() - latest;
};

/* 
   Component
 */
export default function Phase2Academics({ profile, setProfile, editMode = true }) {
  if (!profile || !profile.academicInfo) return null;

  const academicInfo = profile.academicInfo || {};
  const q = academicInfo.highestQualification || "";
  const gap = calculateGap(academicInfo);

  /* 
     Update helper
   */
  const update = (section, field, value) => {
    if (!editMode) return;

    setProfile(p => ({
      ...p,
      academicInfo: {
        ...p.academicInfo,
        [section]: {
          ...(p.academicInfo?.[section] ?? {}),
          [field]: value,
        },
      },
    }));
  };


  /* 
     Visibility logic
   */
  const show10th = ["10th", "12th", "Diploma", "Degree", "PG"].includes(q);
  const show12th = ["12th", "Diploma", "Degree", "PG"].includes(q);
  const showDiploma = q === "Diploma";
  const showDegree = ["Degree", "PG"].includes(q);
  const showPG = q === "PG";

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-lg font-bold text-blue-800">Academic Information</h2>

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
                ...(p.academicInfo || {}),
                highestQualification: e.target.value,
              },
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
          <Input label="Board" value={academicInfo.tenth?.board || ""} onChange={e => update("tenth", "board", e.target.value)} disabled={!editMode} />
          <Input label="Stream" value={academicInfo.tenth?.specialization || ""} onChange={e => update("tenth", "specialization", e.target.value)} disabled={!editMode} />
          <Input label="Marks (%)" type="number" value={academicInfo.tenth?.marks || ""} onChange={e => update("tenth", "marks", e.target.value)} disabled={!editMode} />
          <YearSelect label="Passout Year" value={academicInfo.tenth?.passoutYear || ""} onChange={val => update("tenth", "passoutYear", val)} disabled={!editMode} />
        </AcademicBlock>
      )}

      {/* 12th */}
      {show12th && (
        <AcademicBlock title="12th Standard">
          <Input label="Board" value={academicInfo.twelfth?.board || ""} onChange={e => update("twelfth", "board", e.target.value)} disabled={!editMode} />
          <Input label="Stream" value={academicInfo.twelfth?.specialization || ""} onChange={e => update("twelfth", "specialization", e.target.value)} disabled={!editMode} />
          <Input label="Marks (%)" type="number" value={academicInfo.twelfth?.marks || ""} onChange={e => update("twelfth", "marks", e.target.value)} disabled={!editMode} />
          <YearSelect label="Passout Year" value={academicInfo.twelfth?.passoutYear || ""} onChange={val => update("twelfth", "passoutYear", val)} disabled={!editMode} />
        </AcademicBlock>
      )}

      {/* Diploma */}
      {showDiploma && (
        <AcademicBlock title="Diploma">
          <Input label="Institution" value={academicInfo.diploma?.institution || ""} onChange={e => update("diploma", "institution", e.target.value)} disabled={!editMode} />
          <Input label="Course" value={academicInfo.diploma?.course || ""} onChange={e => update("diploma", "course", e.target.value)} disabled={!editMode} />
          <YearSelect label="Passout Year" value={academicInfo.diploma?.passoutYear || ""} onChange={val => update("diploma", "passoutYear", val)} disabled={!editMode} />
        </AcademicBlock>
      )}

      {/* Degree */}
      {showDegree && (
        <AcademicBlock title="Degree">
          <Input label="University" value={academicInfo.degree?.university || ""} onChange={e => update("degree", "university", e.target.value)} disabled={!editMode} />
          <Input label="Course" value={academicInfo.degree?.course || ""} onChange={e => update("degree", "course", e.target.value)} disabled={!editMode} />
          <Input label="CGPA / Marks" type="number" value={academicInfo.degree?.cgpa || ""} onChange={e => update("degree", "cgpa", e.target.value)} disabled={!editMode} />
          <YearSelect label="Passout Year" value={academicInfo.degree?.passoutYear || ""} onChange={val => update("degree", "passoutYear", val)} disabled={!editMode} />
        </AcademicBlock>
      )}

      {/* Post Graduation */}
      {showPG && (
        <AcademicBlock title="PG">
          <Input label="University" value={academicInfo.pg?.university || ""} onChange={e => update("pg", "university", e.target.value)} disabled={!editMode} />
          <Input label="Course" value={academicInfo.pg?.course || ""} onChange={e => update("pg", "course", e.target.value)} disabled={!editMode} />
          <Input label="CGPA / Marks" type="number" value={academicInfo.pg?.cgpa || ""} onChange={e => update("pg", "cgpa", e.target.value)} disabled={!editMode} />
          <YearSelect label="Passout Year" value={academicInfo.pg?.passoutYear || ""} onChange={val => update("pg", "passoutYear", val)} disabled={!editMode} />
        </AcademicBlock>
      )}

      {/* Education Gap */}
      {gap >= 1 && (
        <AcademicBlock title="Education Gap">
          <p className="text-sm text-orange-600 col-span-2">
            You have a <strong>{gap}-year</strong> education gap. Please explain if applicable.
          </p>

          <select
            disabled={!editMode}
            value={
              academicInfo.educationGap?.hasGap === true
                ? "true"
                : academicInfo.educationGap?.hasGap === false
                  ? "false"
                  : ""
            }
            onChange={e => update("educationGap", "hasGap", e.target.value === "true")}
            className="w-full border rounded-lg px-3 py-2">
            <option value="">Do you have a gap?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {academicInfo.educationGap?.hasGap === true && (
            <textarea
              disabled={!editMode}
              className="w-full border rounded-lg p-2 col-span-2"
              placeholder="Explain your education gap"
              value={academicInfo.educationGap?.reason || ""}
              onChange={e => update("educationGap", "reason", e.target.value)}
            />
          )}
        </AcademicBlock>
      )}
    </div>
  );
}

/* 
   Helpers
*/
function AcademicBlock({ title, children }) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <div className="grid md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...props} className="w-full mt-1 border rounded-lg px-3 py-2" />
    </div>
  );
}

function YearSelect({ label, value, onChange, disabled }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2016 + 1 },
    (_, i) => 2016 + i
  ).reverse();

  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        disabled={disabled}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2"
      >
        <option value="">Select year</option>
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}

