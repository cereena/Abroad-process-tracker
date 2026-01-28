import { toast } from "react-toastify";

export default function Phase3Work({ profile, setProfile, editMode }) {
  const hasExp = profile.workExperience?.hasExperience ?? null;

  const handleNoExperience = () => {
    const passoutYear = getLatestPassoutYear(profile.academicInfo);
    if (!passoutYear) return;

    const gap = new Date().getFullYear() - Number(passoutYear);

    if (gap >= 1) {
      toast.info(
        `You have a ${gap} year gap after your last qualification. 
Work experience or gap justification is very important for visa approval.`,
        { autoClose: 6000 }
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-bold text-blue-800">
        Work Experience
      </h2>

      <select
        disabled={!editMode}
        value={hasExp === null ? "" : hasExp ? "yes" : "no"}
        onChange={e => {
          const val = e.target.value === "yes";
          setProfile(p => ({
            ...p,
            workExperience: { ...p.workExperience, hasExperience: val }
          }));

          if (!val) handleNoExperience();
        }}
        className="w-full border rounded-lg px-3 py-2"
        required
      >
        <option value="">Do you have work experience?</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      {hasExp && (
        <>
          <input
            disabled={!editMode}
            required
            placeholder="Company Name"
            className="input"
          />
          <input
            disabled={!editMode}
            required
            placeholder="Role / Designation"
            className="input"
          />
          <input
            disabled={!editMode}
            required
            type="number"
            placeholder="Years of Experience"
            className="input"
          />
        </>
      )}
    </div>
  );
}

function getLatestPassoutYear(academicInfo) {
  return (
    academicInfo?.pg?.passoutYear ||
    academicInfo?.degree?.passoutYear ||
    academicInfo?.diploma?.passoutYear ||
    academicInfo?.twelfth?.passoutYear ||
    academicInfo?.tenth?.passoutYear ||
    null
  );
}
