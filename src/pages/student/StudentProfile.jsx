import {
  User,
  FileText,
  Phone,
  Globe,
  GraduationCap,
  Briefcase,
  Landmark,
  MapPin,
} from "lucide-react";

export default function StudentProfile({ profile, onEdit }) {
  if (!profile) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  const {
    personalInfo = {},
    passportInfo = {},
    backgroundInfo = {},
    emergencyContact = {},
    academicInfo = {},
    workExperience = {},
    preferences = {},
    sponsorship = {},
  } = profile;

  const hq = academicInfo.highestQualification;

  /* ------------------ helpers ------------------ */
  const date = (v) => (v ? v.split("T")[0] : "—");

  const renderValue = (val) => {
    if (val === null || val === undefined || val === "") return "—";
    if (Array.isArray(val)) return val.join(", ");
    if (typeof val === "object") {
      return Object.values(val).filter(Boolean).join(", ");
    }
    return val;
  };

  const Section = ({ icon: Icon, title, children }) => (
    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4 mx-4">
      <div className="flex items-center gap-3">
        <Icon className="text-blue-600" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-medium mx-9">
        {children}
      </div>
    </div>
  );

  const Item = ({ label, value }) => (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">
        {renderValue(value)}
      </p>
    </div>
  );

  /* ------------------ UI ------------------ */
  return (
    <div className="space-y-7">

      {/* ================= HEADER CARD ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-black rounded p-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-white text-blue-600 flex items-center justify-center text-2xl font-bold">
            {personalInfo.firstName?.[0] || "S"}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-sm opacity-90">
              Study Abroad Applicant
            </p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="bg-white text-blue-700 px-5 py-2 rounded-lg font-medium hover:bg-blue-50"
        >
          Edit Profile
        </button>
      </div>

      {/* ================= PERSONAL ================= */}
      <Section icon={User} title="Personal Information">
        <Item label="First Name" value={personalInfo.firstName} />
        <Item label="Middle Name" value={personalInfo.middleName} />
        <Item label="Last Name" value={personalInfo.lastName} />
        <Item label="Gender" value={personalInfo.gender} />
        <Item label="Date of Birth" value={date(personalInfo.dob)} />
        <Item label="Citizenship" value={personalInfo.citizenship} />
      </Section>

      {/* ================= ADDRESS ================= */}
      <Section icon={MapPin} title="Address Information">

        {/* CURRENT ADDRESS */}
        <Item
          label="Current Address"
          value={[
            personalInfo.currentAddress?.address,
            personalInfo.currentAddress?.city,
            personalInfo.currentAddress?.state,
            personalInfo.currentAddress?.country,
            personalInfo.currentAddress?.postalCode,
          ].filter(Boolean).join(", ")}
        />

        {/* PERMANENT ADDRESS */}
        <Item
          label="Permanent Address"
          value={[
            personalInfo.permanentAddress?.address,
            personalInfo.permanentAddress?.city,
            personalInfo.permanentAddress?.state,
            personalInfo.permanentAddress?.country,
            personalInfo.permanentAddress?.postalCode,
          ].filter(Boolean).join(", ")}
        />

      </Section>


      {/* ================= PASSPORT ================= */}
      <Section icon={FileText} title="Passport Information">
        <Item label="Passport Name" value={passportInfo.nameAsPerPassport} />
        <Item label="Passport Number" value={passportInfo.passportNo} />
        <Item label="Issue Date" value={date(passportInfo.issueDate)} />
        <Item label="Expiry Date" value={date(passportInfo.expiryDate)} />
      </Section>

      {/* ================= EMERGENCY ================= */}
      <Section icon={Phone} title="Emergency Contact">
        <Item label="Name" value={emergencyContact.name} />
        <Item label="Relationship" value={emergencyContact.relationship} />
        <Item label="Phone" value={emergencyContact.phone} />
        <Item label="Email" value={emergencyContact.email} />
      </Section>

      {/* ================= BACKGROUND INFO ================= */}
      <Section icon={FileText} title="Background Information">
        <Item
          label="Criminal Offence"
          value={backgroundInfo.criminalOffence ? "Yes" : "No"}
        />
        <Item
          label="Immigration Applied Before"
          value={backgroundInfo.immigrationApplied ? "Yes" : "No"}
        />
        <Item
          label="Medical Condition"
          value={backgroundInfo.medicalCondition ? "Yes" : "No"}
        />
        <Item
          label="Visa Refusal"
          value={backgroundInfo.visaRefusal ? "Yes" : "No"}
        />
      </Section>

      {/* ================= ACADEMICS ================= */}
      <Section icon={GraduationCap} title="Academic Information">
        <Item label="Highest Qualification" value={hq} />

        <Item label="10th Board" value={academicInfo.tenth?.board} />
        <Item label="10th Passout Year" value={academicInfo.tenth?.passoutYear} />

        {["12th", "Degree", "PG"].includes(hq) && (
          <>
            <Item label="12th Board" value={academicInfo.twelfth?.board} />
            <Item label="12th Passout Year" value={academicInfo.twelfth?.passoutYear} />
          </>
        )}

        {["Degree", "PG"].includes(hq) && (
          <>
            <Item label="Degree Course" value={academicInfo.degree?.course} />
            <Item label="Degree Passout Year" value={academicInfo.degree?.passoutYear} />
          </>
        )}

        {hq === "PG" && (
          <>
            <Item label="PG Course" value={academicInfo.pg?.course} />
            <Item label="PG Passout Year" value={academicInfo.pg?.passoutYear} />
          </>
        )}
      </Section>

      {/* ================= WORK ================= */}
      <Section icon={Briefcase} title="Work Experience">
        <Item
          label="Has Experience"
          value={
            workExperience.hasExperience === true
              ? "Yes"
              : workExperience.hasExperience === false
                ? "No"
                : "—"
          }
        />
        <Item label="Company" value={workExperience.company} />
        <Item label="Role" value={workExperience.role} />
        <Item label="Years" value={workExperience.years} />
      </Section>

      {/* ================= PREFERENCES ================= */}
      <Section icon={Globe} title="Study Preferences">
        <Item label="Preferred Countries" value={preferences.countries} />
        <Item label="Course" value={preferences.course} />
        <Item label="University" value={preferences.university} />
        <Item label="Intake" value={preferences.intake} />
        <Item label="English Test" value={preferences.englishTest} />
        <Item label="Score" value={preferences.score} />
      </Section>

      {/* ================= SPONSORSHIP ================= */}
      <Section icon={Landmark} title="Financial / Sponsorship">
        <Item label="Funding Type" value={sponsorship.type} />
        <Item label="Loan Type" value={sponsorship.loanType} />
        <Item label="Bank Name" value={sponsorship.bankName} />
        <Item label="Loan Amount" value={sponsorship.loanAmount} />

        <Item label="Sponsor Name" value={sponsorship.sponsorName} />
        <Item label="Relationship" value={sponsorship.relationship} />
        <Item
          label="Sponsor Abroad"
          value={sponsorship.isAbroad === true ? "Yes" : sponsorship.isAbroad === false ? "No" : "—"}
        />
      </Section>

    </div>
  );
}
