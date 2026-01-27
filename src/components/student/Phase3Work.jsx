import { toast } from "react-toastify";

const validateProfile = () => {
  const ai = profile.academicInfo;

  if (!ai.highestQualification) return "Select highest qualification";

  if (ai.tenth && (!ai.tenth.board || !ai.tenth.passoutYear))
    return "Complete 10th details";

  if (ai.twelfth && (!ai.twelfth.board || !ai.twelfth.passoutYear))
    return "Complete 12th details";

  if (ai.degree && (!ai.degree.course || !ai.degree.passoutYear))
    return "Complete degree details";

  if (profile.workExperience?.hasExperience === null)
    return "Select work experience status";

  return null;
};

const error = validateProfile();
if (error) {
  toast.error(error);
  return;
}


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
      <h2 className="text-lg font-bold text-blue-800">Work Experience</h2>

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
          <input required disabled={!editMode} placeholder="Company Name" className="input" />
          <input required disabled={!editMode} placeholder="Role / Designation" className="input" />
          <input required disabled={!editMode} placeholder="Years of Experience" type="number" className="input" />
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
