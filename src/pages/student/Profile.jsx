import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProfileStepper from "../../components/student/ProfileStepper.jsx";
import Phase1Personal from "../../components/student/Phase1Personal.jsx";
import Phase2Academics from "../../components/student/Phase2Academics.jsx";
import Phase3Work from "../../components/student/Phase3Work.jsx";
import Phase4Preferences from "../../components/student/Phase4Preferences.jsx";
import Phase5Sponsorship from "../../components/student/Phase5Sponsorship.jsx";

const Profile = () => {
  const [step, setStep] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const steps = [
    "Personal",
    "Academics",
    "Work Experience",
    "Preferences"
  ];

  const [profile, setProfile] = useState({
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      dob: "",
      nationality: "",
      citizenship: "",
    },
    passportInfo: {
      nameAsPerPassport: "",
      passportNo: "",
      issueDate: "",
      expiryDate: "",
      issueCountry: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      email: "",
    },
    academicInfo: {
      highestQualification: "",
      tenth: {},
      twelfth: {},
      diploma: {},
      degree: {},
      pg: {},
    },
    workExperience: {
      hasExperience: null,
    },
    preferences: {
      countries: [],
      course: "",
      intake: "",
      englishTest: "",
      score: ""
    },
    sponsorship: {
      type: "",

      loanType: "",
      bankName: "",
      loanAmount: "",

      sponsorName: "",
      relationship: "",
      sponsorOccupation: "",
      sponsorCountry: "",
      isAbroad: null,
      hasPR: null,
      filesITR: null,
      goodTransactions: null,
    }

  });

  const isStepComplete = (stepNo, profile) => {
    const ai = profile.academicInfo;

    // STEP 1 — Personal
    if (stepNo === 1) {
      const p = profile.personalInfo;
      return !!(p.firstName && p.lastName && p.gender && p.dob);
    }

    // STEP 2 — Academics
    if (stepNo === 2) {
      if (!ai.highestQualification) return false;

      if (ai.highestQualification !== "10th") {
        if (!ai.tenth?.board || !ai.tenth?.passoutYear) return false;
      }

      if (["12th", "Diploma", "Degree", "PG"].includes(ai.highestQualification)) {
        if (!ai.twelfth?.board || !ai.twelfth?.passoutYear) return false;
      }

      if (["Degree", "PG"].includes(ai.highestQualification)) {
        if (!ai.degree?.course || !ai.degree?.passoutYear) return false;
      }

      if (ai.highestQualification === "PG") {
        if (!ai.pg?.course || !ai.pg?.passoutYear) return false;
      }

      return true;
    }

    // STEP 3 — Work Experience
    if (stepNo === 3) {
      return profile.workExperience?.hasExperience !== null;
    }

    // STEP 4 — Preferences
    if (stepNo === 4) {
      const pref = profile.preferences;
      if (!pref) return false;

      if (!pref.countries?.length) return false;
      if (!pref.course) return false;
      if (!pref.university) return false;
      if (!pref.englishTest) return false;

      if (pref.englishTest !== "MOI" && !pref.score) return false;

      return true;
    }

    return false;
  };


  const validateStep = (step, profile) => {
    if (step === 1) {
      const p = profile.personalInfo;
      if (!p.firstName || !p.lastName || !p.gender || !p.dob)
        return "Please complete all personal details";
    }

    if (step === 2) {
      const ai = profile.academicInfo;

      if (!ai.highestQualification)
        return "Select highest qualification";

      if (ai.highestQualification !== "10th") {
        if (!ai.tenth?.board || !ai.tenth?.passoutYear)
          return "Complete 10th details";
      }

      if (["12th", "Diploma", "Degree", "PG"].includes(ai.highestQualification)) {
        if (!ai.twelfth?.board || !ai.twelfth?.passoutYear)
          return "Complete 12th details";
      }

      if (["Degree", "PG"].includes(ai.highestQualification)) {
        if (!ai.degree?.course || !ai.degree?.passoutYear)
          return "Complete degree details";
      }

      if (ai.highestQualification === "PG") {
        if (!ai.pg?.course || !ai.pg?.passoutYear)
          return "Complete PG details";
      }
    }

    if (step === 3) {
      if (profile.workExperience?.hasExperience == null)
        return "Select work experience status";
    }

    if (step === 4) {
      const pref = profile.preferences;

      if (!pref?.countries?.length)
        return "Please select at least one country";

      if (!pref.course)
        return "Please select preferred course";

      if (!pref.university)
        return "Please enter preferred university";

      if (!pref.englishTest)
        return "Please select English language proof";

      if (pref.englishTest !== "MOI" && !pref.score)
        return "Please enter English test score";
    }

    if (step === 5) {
      const s = profile.sponsorship || {};

      if (!s.type)
        return "Select funding type";

      if (s.type === "loan") {
        if (!s.loanType || !s.bankName)
          return "Complete loan details";
      }

      if (s.type === "sponsor") {
        if (!s.sponsorName || !s.relationship)
          return "Enter sponsor name and relationship";

        if (s.isAbroad === null || s.isAbroad === undefined)
          return "Please specify if sponsor is abroad";

        if (s.isAbroad === true && (s.hasPR === null || s.hasPR === undefined))
          return "Please specify sponsor PR status";

        if (s.filesITR === null || s.filesITR === undefined)
          return "Please specify ITR filing status";

        if (s.goodTransactions === null || s.goodTransactions === undefined)
          return "Please specify bank transaction stability";
      }
    }

    return null;
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/student/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        if (!data) return;
        setProfile(p => ({
          ...p,
          personalInfo: { ...p.personalInfo, ...data.personalInfo },
          passportInfo: { ...p.passportInfo, ...data.passportInfo },
          emergencyContact: { ...p.emergencyContact, ...data.emergencyContact },
          academicInfo: { ...p.academicInfo, ...data.academicInfo },
          workExperience: { ...p.workExperience, ...data.workExperience },
        }));
      })
      .catch(() => {
        toast.error("Failed to load profile");
      });

  }, []);

  const validateProfile = (profile) => {
    const ai = profile.academicInfo;

    if (!ai.highestQualification)
      return "Select highest qualification";

    // 10th is required for everything above 10th
    if (ai.highestQualification !== "10th") {
      if (!ai.tenth?.board || !ai.tenth?.passoutYear)
        return "Complete 10th details";
    }

    // 12th required only for these
    if (["12th", "Diploma", "Degree", "PG"].includes(ai.highestQualification)) {
      if (!ai.twelfth?.board || !ai.twelfth?.passoutYear)
        return "Complete 12th details";
    }

    // Degree required only for Degree & PG
    if (["Degree", "PG"].includes(ai.highestQualification)) {
      if (!ai.degree?.course || !ai.degree?.passoutYear)
        return "Complete degree details";
    }

    // PG required only for PG
    if (ai.highestQualification === "PG") {
      if (!ai.pg?.course || !ai.pg?.passoutYear)
        return "Complete PG details";
    }

    // Phase 3 validation
    if (profile.workExperience?.hasExperience === null)
      return "Select work experience status";

    if (profile.workExperience?.hasExperience === true) {
      const we = profile.workExperience;

      if (!we.company || !we.role || !we.years) {
        return "Please complete all work experience details";
      }
    }

    // Phase 4 validation — Preferences
    const pref = profile.preferences;

    if (!pref?.countries?.length)
      return "Please select at least one preferred country";

    if (!pref.course)
      return "Please select preferred course";

    if (!pref.englishTest)
      return "Please select English language proof";

    if (pref.englishTest !== "MOI" && !pref.score)
      return "Please enter English test score";

    return null;
  };


  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Session expired");

    const error = validateStep(step, profile);

    if (error) {
      toast.error(error);
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("http://localhost:5000/api/student/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error();

      toast.success("Saved successfully");

      if (step < 4) {
        setStep(step + 1);
        setEditMode(true);
      }

    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-6 space-y-8 mb-10">
      <h1 className="text-2xl font-bold text-blue-800">My Profile</h1>

      <ProfileStepper
        step={step}
        setStep={(nextStep) => {
          if (nextStep > step) {
            const error = validateStep(step, profile);
            if (error) {
              toast.error(error);
              return;
            }
          }
          setStep(nextStep);
          setEditMode(true);
        }}


      />
      {step === 1 && (
        <Phase1Personal
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
        />
      )}

      {step === 2 && (
        <Phase2Academics
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
        />
      )}

      {step === 3 && (
        <Phase3Work
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
        />
      )}

      {step === 4 && (
        <Phase4Preferences
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
        />
      )}

      {step === 5 && (
        <Phase5Sponsorship
          profile={profile}
          setProfile={setProfile}
          editMode={editMode}
        />
      )}


      <div className="flex justify-between items-center pt-6">

        {/* Previous */}
        <button
          disabled={step === 1}
          onClick={() => setStep(step - 1)}
          className={`px-8 py-2 rounded-lg ${step === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-300"
            }`}
        >
          Previous
        </button>

        {/* Center actions */}
        <div className="flex gap-4">
          {editMode && (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white px-10 py-2 rounded-lg"
              >
                {saving
                  ? "Saving..."
                  : step < 5 ? "Save & Next" : "Save Profile"}
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 px-10 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          )}

          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-gray-800 text-white px-10 py-2 rounded-lg">
              Edit
            </button>
          )}
        </div>

        {/* Next */}
        <button
          disabled={!isStepComplete(step, profile)}
          onClick={() => {
            const error = validateStep(step, profile);
            if (error) {
              toast.error(error);
              return;
            }
            setStep(step + 1);
            setEditMode(true);
          }}

          className={`px-8 py-2 rounded-lg ${!isStepComplete(step, profile)
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-green-600 text-white"
            }`}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Profile;
