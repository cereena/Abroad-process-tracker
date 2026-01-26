import { toast } from "react-toastify";

export default function Phase3Work({ profile, setProfile, editMode }) {
  const hasExp = profile.workExperience.hasExperience;

  const handleNoExperience = () => {
    const year = profile.academicInfo.passoutYear;
    if (!year) return;

    const gap = new Date().getFullYear() - Number(year);
    if (gap > 1) {
      toast.info(
        "You have an education/work gap. This may require justification during visa or interview."
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-bold">Work Experience</h2>

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
      >
        <option value="">Do you have work experience?</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      {hasExp && (
        <>
          <input disabled={!editMode} placeholder="Company" />
          <input disabled={!editMode} placeholder="Role" />
          <input disabled={!editMode} placeholder="Years of Experience" />
        </>
      )}
    </div>
  );
}
