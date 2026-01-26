import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProfileStepper from "../../components/student/ProfileStepper.jsx";
import Phase1Personal from "../../components/student/Phase1Personal.jsx";
import Phase2Academics from "../../components/student/Phase2Academics.jsx";
import Phase3Work from "../../components/student/Phase3Work.jsx";

const Profile = () => {
  const [step, setStep] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

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
    academicInfo: {},
    workExperience: {},
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/student/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => data && setProfile(p => ({ ...p, ...data })));
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Session expired");

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
      toast.success("Profile saved");
      setEditMode(false);
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-6 space-y-8 mb-10">
      <h1 className="text-2xl font-bold text-blue-800">My Profile</h1>

      <ProfileStepper step={step} setStep={setStep} />

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

      <div className="flex justify-center gap-4 pt-6">
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-gray-800 text-white px-10 py-2 rounded-lg"
          >
            Edit Profile
          </button>
        )}

        {editMode && (
          <>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-10 py-2 rounded-lg"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-10 py-2 rounded-lg"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
