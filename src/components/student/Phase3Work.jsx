import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Phase3Work({ profile, setProfile, editMode }) {
  const [gapInfo, setGapInfo] = useState(null);

  const hasExp = profile.workExperience?.hasExperience ?? null;

  //  calculate gap whenever "No experience" is selected
  useEffect(() => {
    if (hasExp === false) {
      handleNoExperience();
    } else {
      setGapInfo(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasExp]);

  const handleNoExperience = () => {
    const passoutYear = getLatestPassoutYear(profile.academicInfo);
    if (!passoutYear) return;

    const gap = new Date().getFullYear() - Number(passoutYear);

    if (gap >= 1) {
      setGapInfo(gap);

      toast.info(
        `You have a ${gap}-year gap after your last qualification.`,
        { autoClose: 4000 }
      );
    } else {
      setGapInfo(null);
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
        onChange={(e) => {
          const val = e.target.value === "yes";

          setProfile((p) => ({
            ...p,
            workExperience: val
              ? { ...p.workExperience, hasExperience: true }
              : { hasExperience: false }
          }));
        }}

        className="w-full border rounded-lg px-3 py-2"
        required
      >
        <option value="">Do you have work experience?</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      {/* GAP NOTICE (alert-style, not toast-only) */}
      {gapInfo && (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-lg text-sm">
          <strong>Important:</strong> You have a {gapInfo}-year gap after your
          last qualification.
          Work experience or proper gap justification is crucial for visa
          approval.
        </div>
      )}

      {hasExp && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">

          <h3 className="text-sm font-semibold text-slate-700">
            Work Experience Details
          </h3>

          <div className="space-y-1">
            <label className="text-sm text-slate-600">
              Company Name
            </label>
            <input
              disabled={!editMode}
              required={hasExp === true}
              type="text"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              value={profile.workExperience?.company || ""}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  workExperience: {
                    ...p.workExperience,
                    company: e.target.value
                  }
                }))
              }
            />

          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-600">
              Role / Designation
            </label>
            <input
              disabled={!editMode}
              required={hasExp === true}
              type="text"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              value={profile.workExperience?.role || ""}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  workExperience: {
                    ...p.workExperience,
                    role: e.target.value
                  }
                }))
              }
            />

          </div>

          <div className="space-y-1 max-w-xs">
            <label className="text-sm text-slate-600">
              Total Years of Experience
            </label>
            <input
              disabled={!editMode}
              required={hasExp === true}
              type="number"
              min="0"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              value={profile.workExperience?.years || ""}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  workExperience: {
                    ...p.workExperience,
                    years: e.target.value
                  }
                }))
              }
            />

          </div>
        </div>
      )}


    </div>
  );
}

/*  Helper */
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
