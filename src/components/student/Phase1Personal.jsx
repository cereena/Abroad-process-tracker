import { User, Globe, Phone, FileText } from "lucide-react";

export default function Phase1Personal({ profile, setProfile, editMode }) {
  const update = (section, field, value) => {
    if (!editMode) return;
    setProfile(p => ({
      ...p,
      [section]: { ...p[section], [field]: value },
    }));
  };

  const toDate = v => (v ? v.split("T")[0] : "");

  const Card = ({ icon: Icon, title, children }) => (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="text-blue-600" />
        <h2 className="font-semibold text-lg">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value, onChange, type = "text" }) => (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        disabled={!editMode}
        onChange={onChange}
        className={`mt-1 w-full rounded-lg border px-3 py-2 ${
          editMode ? "bg-white" : "bg-gray-100 text-gray-700"
        }`}
      />
    </div>
  );

  return (
    <div className="space-y-8">
      <Card icon={User} title="Personal Information">
        <Field label="First Name" value={profile.personalInfo.firstName}
          onChange={e => update("personalInfo","firstName",e.target.value)} />
        <Field label="Middle Name" value={profile.personalInfo.middleName}
          onChange={e => update("personalInfo","middleName",e.target.value)} />
        <Field label="Last Name" value={profile.personalInfo.lastName}
          onChange={e => update("personalInfo","lastName",e.target.value)} />
        <Field label="Gender" value={profile.personalInfo.gender}
          onChange={e => update("personalInfo","gender",e.target.value)} />
        <Field label="Date of Birth" type="date"
          value={toDate(profile.personalInfo.dob)}
          onChange={e => update("personalInfo","dob",e.target.value)} />
      </Card>

      <Card icon={FileText} title="Passport Information">
        <Field label="Name as per Passport" value={profile.passportInfo.nameAsPerPassport}
          onChange={e => update("passportInfo","nameAsPerPassport",e.target.value)} />
        <Field label="Passport Number" value={profile.passportInfo.passportNo}
          onChange={e => update("passportInfo","passportNo",e.target.value)} />
        <Field label="Issue Date" type="date"
          value={toDate(profile.passportInfo.issueDate)}
          onChange={e => update("passportInfo","issueDate",e.target.value)} />
        <Field label="Expiry Date" type="date"
          value={toDate(profile.passportInfo.expiryDate)}
          onChange={e => update("passportInfo","expiryDate",e.target.value)} />
      </Card>

      <Card icon={Phone} title="Emergency Contact">
        <Field label="Name" value={profile.emergencyContact.name}
          onChange={e => update("emergencyContact","name",e.target.value)} />
        <Field label="Relationship" value={profile.emergencyContact.relationship}
          onChange={e => update("emergencyContact","relationship",e.target.value)} />
        <Field label="Phone" value={profile.emergencyContact.phone}
          onChange={e => update("emergencyContact","phone",e.target.value)} />
        <Field label="Email" value={profile.emergencyContact.email}
          onChange={e => update("emergencyContact","email",e.target.value)} />
      </Card>
    </div>
  );
}
