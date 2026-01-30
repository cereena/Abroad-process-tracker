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

  const Field = ({ label, value, onChange, type = "text", required }) => (
    <div>
      <label className="text-sm text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        disabled={!editMode}
        onChange={onChange}
        required={required}
        className={`mt-1 w-full rounded-lg border px-3 py-2 ${!value && required ? "border-red-400" : ""
          } ${editMode ? "bg-white" : "bg-gray-100"}`}
      />
    </div>
  );

  const Select = ({ label, value, onChange, options, required }) => (
    <div>
      <label className="text-sm text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        disabled={!editMode}
        onChange={onChange}
        className="mt-1 w-full rounded-lg border px-3 py-2 bg-white"
      >
        <option value="">Select</option>
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );


  return (
    <div className="space-y-8">
      <Card icon={User} title="Personal Information">
        <Field label="First Name" value={profile.personalInfo.firstName} required
          onChange={e => update("personalInfo", "firstName", e.target.value)} />

        <Field label="Middle Name" value={profile.personalInfo.middleName}
          required onChange={e => update("personalInfo", "middleName", e.target.value)} />
        <Field label="Last Name" value={profile.personalInfo.lastName}
          required onChange={e => update("personalInfo", "lastName", e.target.value)} />
        <Field label="Gender" value={profile.personalInfo.gender}
          required onChange={e => update("personalInfo", "gender", e.target.value)} />
        <Field label="Date of Birth" type="date"
          value={toDate(profile.personalInfo.dob)}
          required onChange={e => update("personalInfo", "dob", e.target.value)} />
      </Card>

      <Card icon={FileText} title="Passport Information">
        <Field label="Name as per Passport" value={profile.passportInfo.nameAsPerPassport}
          required onChange={e => update("passportInfo", "nameAsPerPassport", e.target.value)} />
        <Field label="Passport Number" value={profile.passportInfo.passportNo}
          required onChange={e => update("passportInfo", "passportNo", e.target.value)} />
        <Field label="Issue Date" type="date"
          value={toDate(profile.passportInfo.issueDate)}
          required onChange={e => update("passportInfo", "issueDate", e.target.value)} />
        <Field label="Expiry Date" type="date"
          value={toDate(profile.passportInfo.expiryDate)}
          required onChange={e => update("passportInfo", "expiryDate", e.target.value)} />
      </Card>

      <Card icon={Phone} title="Emergency Contact">
        <Field label="Name" value={profile.emergencyContact.name}
          required onChange={e => update("emergencyContact", "name", e.target.value)} />
        <Field label="Relationship" value={profile.emergencyContact.relationship}
          onChange={e => update("emergencyContact", "relationship", e.target.value)} />
        <Field label="Phone" value={profile.emergencyContact.phone}
          required onChange={e => update("emergencyContact", "phone", e.target.value)} />
        <Field label="Email" value={profile.emergencyContact.email}
          onChange={e => update("emergencyContact", "email", e.target.value)} />
      </Card>

      <Select
        label="Marital Status"
        value={profile.personalInfo.maritalStatus}
        required
        options={["Single", "Married", "Divorced"]}
        onChange={e => update("personalInfo", "maritalStatus", e.target.value)}
      />

      <Field
        label="Citizenship"
        value={profile.personalInfo.citizenship}
        required
        onChange={e => update("personalInfo", "citizenship", e.target.value)}
      />

      <Field
        label="Country of Birth"
        value={profile.passportInfo.countryOfBirth}
        required
        onChange={e => update("passportInfo", "countryOfBirth", e.target.value)}
      />


      <Card icon={Globe} title="Current Address">
        <Field label="Address Line" value={profile.currentAddress.address}
          onChange={e => update("currentAddress", "address", e.target.value)} />

        <Field label="City" value={profile.currentAddress.city}
          onChange={e => update("currentAddress", "city", e.target.value)} />

        <Field label="State" value={profile.currentAddress.state}
          onChange={e => update("currentAddress", "state", e.target.value)} />

        <Field label="Postal Code" value={profile.currentAddress.postalCode}
          onChange={e => update("currentAddress", "postalCode", e.target.value)} />

        <Field label="Country" value={profile.currentAddress.country}
          onChange={e => update("currentAddress", "country", e.target.value)} />

        <Select
          label="Living in another country?"
          value={
            profile.passportInfo.livingInOtherCountry === true
              ? "yes"
              : profile.passportInfo.livingInOtherCountry === false
                ? "no"
                : ""
          }
          options={["yes", "no"]}
          onChange={e =>
            update(
              "passportInfo",
              "livingInOtherCountry",
              e.target.value === "yes"
            )
          }
        />


        <Field
          label="Citizenship"
          value={profile.personalInfo.citizenship}
          required
          onChange={e => update("personalInfo", "citizenship", e.target.value)}
        />

      </Card>

      <Card icon={Globe} title="Permanent Address">
        <Field label="Address Line" value={profile.permanentAddress.address}
          onChange={e => update("permanentAddress", "address", e.target.value)} />

        <Field label="City" value={profile.permanentAddress.city}
          onChange={e => update("permanentAddress", "city", e.target.value)} />

        <Field label="State" value={profile.permanentAddress.state}
          onChange={e => update("permanentAddress", "state", e.target.value)} />

        <Field label="Postal Code" value={profile.permanentAddress.postalCode}
          onChange={e => update("permanentAddress", "postalCode", e.target.value)} />

        <Field label="Country" value={profile.permanentAddress.country}
          onChange={e => update("permanentAddress", "country", e.target.value)} />
      </Card>

    </div>
  );
}
