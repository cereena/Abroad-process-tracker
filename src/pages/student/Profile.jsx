import { useState } from "react";
import { toast } from "react-toastify";

/* ================== REUSABLE UI COMPONENTS ================== */

const Section = ({ title, subtitle, children }) => (
  <div className="bg-white p-6 rounded-xl shadow space-y-4">
    <div>
      <h2 className="text-lg font-bold text-blue-800">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Input = ({ label, value, onChange, type = "text", required }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

const Select = ({ label, value, onChange, required, children }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    >
      {children}
    </select>
  </div>
);

const YesNo = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="flex gap-6 mt-2">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          checked={value === true}
          onChange={() => onChange(true)}
        />
        Yes
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          checked={value === false}
          onChange={() => onChange(false)}
        />
        No
      </label>
    </div>
  </div>
);

/* ================== MAIN PROFILE COMPONENT ================== */

const Profile = () => {
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

    backgroundInfo: {
      immigrationApplied: false,
      medicalCondition: false,
      visaRefusal: false,
      criminalOffence: false,
    },
  });

  /* ---------- STATE UPDATE HELPER ---------- */
  const update = (section, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  /* ---------- VALIDATION ---------- */
  const isValid =
    profile.personalInfo.firstName.trim() &&
    profile.personalInfo.lastName.trim() &&
    profile.personalInfo.gender &&
    profile.personalInfo.dob &&
    profile.passportInfo.nameAsPerPassport.trim() &&
    profile.passportInfo.passportNo.trim() &&
    profile.passportInfo.expiryDate &&
    profile.passportInfo.issueCountry.trim() &&
    profile.emergencyContact.name.trim() &&
    profile.emergencyContact.phone.trim();

  /* ---------- SAVE HANDLER ---------- */
  const handleSave = () => {
    if (!isValid) {
      toast.error("Please complete all required fields ❌");
      return;
    }

    console.log("PROFILE DATA:", profile);
    toast.success("Profile saved successfully ✅");
  };

  return (
    <div className="max-w-6xl mx-4 mb-10 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold mt-4 text-blue-800">My Profile</h1>
        <p className="text-gray-500">
          Complete your profile to proceed with your application
        </p>
      </div>

      {/* PERSONAL INFO */}
      <Section
        title="Personal Information"
        subtitle="Details as per your official records"
      >
        <Input required label="First Name"
          value={profile.personalInfo.firstName}
          onChange={(e) => update("personalInfo", "firstName", e.target.value)}
        />

        <Input label="Middle Name"
          value={profile.personalInfo.middleName}
          onChange={(e) => update("personalInfo", "middleName", e.target.value)}
        />

        <Input required label="Last Name"
          value={profile.personalInfo.lastName}
          onChange={(e) => update("personalInfo", "lastName", e.target.value)}
        />

        <Select required label="Gender"
          value={profile.personalInfo.gender}
          onChange={(e) => update("personalInfo", "gender", e.target.value)}
        >
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </Select>

        <Input required type="date" label="Date of Birth"
          value={profile.personalInfo.dob}
          onChange={(e) => update("personalInfo", "dob", e.target.value)}
        />

        <Input label="Nationality"
          value={profile.personalInfo.nationality}
          onChange={(e) => update("personalInfo", "nationality", e.target.value)}
        />

        <Input label="Citizenship"
          value={profile.personalInfo.citizenship}
          onChange={(e) => update("personalInfo", "citizenship", e.target.value)}
        />
      </Section>

      {/* PASSPORT INFO */}
      <Section title="Passport Information">
        <Input required label="Name as per Passport"
          value={profile.passportInfo.nameAsPerPassport}
          onChange={(e) => update("passportInfo", "nameAsPerPassport", e.target.value)}
        />

        <Input required label="Passport Number"
          value={profile.passportInfo.passportNo}
          onChange={(e) => update("passportInfo", "passportNo", e.target.value)}
        />

        <Input type="date" label="Issue Date"
          value={profile.passportInfo.issueDate}
          onChange={(e) => update("passportInfo", "issueDate", e.target.value)}
        />

        <Input required type="date" label="Expiry Date"
          value={profile.passportInfo.expiryDate}
          onChange={(e) => update("passportInfo", "expiryDate", e.target.value)}
        />

        <Input required label="Country of Issue"
          value={profile.passportInfo.issueCountry}
          onChange={(e) => update("passportInfo", "issueCountry", e.target.value)}
        />
      </Section>

      {/* BACKGROUND INFO */}
      <Section title="Background Information">
        <YesNo label="Applied for immigration before?"
          value={profile.backgroundInfo.immigrationApplied}
          onChange={(v) => update("backgroundInfo", "immigrationApplied", v)}
        />

        <YesNo label="Any serious medical condition?"
          value={profile.backgroundInfo.medicalCondition}
          onChange={(v) => update("backgroundInfo", "medicalCondition", v)}
        />

        <YesNo label="Any visa refusal history?"
          value={profile.backgroundInfo.visaRefusal}
          onChange={(v) => update("backgroundInfo", "visaRefusal", v)}
        />

        <YesNo label="Any criminal offence?"
          value={profile.backgroundInfo.criminalOffence}
          onChange={(v) => update("backgroundInfo", "criminalOffence", v)}
        />
      </Section>

      {/* EMERGENCY CONTACT */}
      <Section title="Emergency Contact">
        <Input required label="Name"
          value={profile.emergencyContact.name}
          onChange={(e) => update("emergencyContact", "name", e.target.value)}
        />

        <Input label="Relationship"
          value={profile.emergencyContact.relationship}
          onChange={(e) => update("emergencyContact", "relationship", e.target.value)}
        />

        <Input required label="Phone"
          value={profile.emergencyContact.phone}
          onChange={(e) => update("emergencyContact", "phone", e.target.value)}
        />

        <Input label="Email"
          value={profile.emergencyContact.email}
          onChange={(e) => update("emergencyContact", "email", e.target.value)}
        />
      </Section>

      {/* SAVE BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={!isValid}
          className={`px-10 py-2 rounded-lg text-white transition
            ${isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"}`}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
