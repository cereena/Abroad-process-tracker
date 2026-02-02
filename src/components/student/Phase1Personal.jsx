import { User, Globe, Phone, FileText } from "lucide-react";
import { useState, useEffect } from "react";

/* 
   REUSABLE UI COMPONENTS
   (MOVED OUTSIDE)
*/
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

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  required,
  editMode,
}) => (
  <div>
    <label className="text-sm text-gray-600">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      disabled={!editMode}
      onChange={onChange}
      className={`mt-1 w-full rounded-lg border px-3 py-2 ${!value && required ? "border-red-400" : ""
        } ${editMode ? "bg-white" : "bg-gray-100"}`}
    />
  </div>
);

const Select = ({
  label,
  value,
  onChange,
  options,
  required,
  editMode,
}) => (
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
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

/* =======================
        MAIN COMPONENT
======================= */

export default function Phase1Personal({ profile, setProfile, editMode }) {
  const update = (section, field, value, subSection = null) => {
    if (!editMode) return;

    setProfile(p => {
      if (subSection) {
        return {
          ...p,
          [section]: {
            ...(p[section] || {}),
            [subSection]: {
              ...(p[section]?.[subSection] || {}),
              [field]: value,
            },
          },
        };
      }

      return {
        ...p,
        [section]: {
          ...(p[section] || {}),
          [field]: value,
        },
      };
    });
  };



  if (!profile) return null;

  const {
    personalInfo = {},
    passportInfo = {},
    emergencyContact = {},
    backgroundInfo = {},
  } = profile;

  const {
    currentAddress = {},
    permanentAddress = {},
  } = personalInfo;

  const toDate = v => (v ? v.split("T")[0] : "");

  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  useEffect(() => {
    if (!editMode) return;

    if (sameAsCurrent) {
      setProfile(p => ({
        ...p,
        personalInfo: {
          ...p.personalInfo,
          permanentAddress: {
            ...(p.personalInfo?.currentAddress || {}),
          },
        },
      }));
    }
  }, [sameAsCurrent, editMode, setProfile]);

  return (
    <div className="space-y-8">

      {/* PERSONAL INFO */}
      <Card icon={User} title="Personal Information">
        <Field label="First Name" required editMode={editMode}
          value={personalInfo.firstName || ""}
          onChange={e => update("personalInfo", "firstName", e.target.value)}
        />

        <Field label="Middle Name" editMode={editMode}
          value={personalInfo.middleName || ""}
          onChange={e => update("personalInfo", "middleName", e.target.value)}
        />

        <Field label="Last Name" required editMode={editMode}
          value={personalInfo.lastName || ""}
          onChange={e => update("personalInfo", "lastName", e.target.value)}
        />

        <Select
          label="Gender"
          required
          editMode={editMode}
          value={personalInfo.gender || ""}
          options={["Male", "Female", "Other"]}
          onChange={e => update("personalInfo", "gender", e.target.value)}
        />

        <Field
          label="Date of Birth"
          type="date"
          required
          editMode={editMode}
          value={toDate(personalInfo.dob)}
          onChange={e => update("personalInfo", "dob", e.target.value)}
        />

        <Select
          label="Marital Status"
          required
          editMode={editMode}
          value={personalInfo.maritalStatus || ""}
          options={["Single", "Married", "Divorced"]}
          onChange={e =>
            update("personalInfo", "maritalStatus", e.target.value)
          }
        />

        <Field
          label="Citizenship"
          required
          editMode={editMode}
          value={personalInfo.citizenship || ""}
          onChange={e => update("personalInfo", "citizenship", e.target.value)}
        />
      </Card>

      {/* PASSPORT */}
      <Card icon={FileText} title="Passport Information">
        <Field label="Name as per Passport" required editMode={editMode}
          value={passportInfo.nameAsPerPassport || ""}
          onChange={e =>
            update("passportInfo", "nameAsPerPassport", e.target.value)
          }
        />

        <Field label="Passport Number" required editMode={editMode}
          value={passportInfo.passportNo || ""}
          onChange={e =>
            update("passportInfo", "passportNo", e.target.value)
          }
        />

        <Field label="Issue Date" type="date" required editMode={editMode}
          value={toDate(passportInfo.issueDate)}
          onChange={e =>
            update("passportInfo", "issueDate", e.target.value)
          }
        />

        <Field label="Expiry Date" type="date" required editMode={editMode}
          value={toDate(passportInfo.expiryDate)}
          onChange={e =>
            update("passportInfo", "expiryDate", e.target.value)
          }
        />

        <Field
          label="Country of Birth"
          required
          editMode={editMode}
          value={passportInfo.countryOfBirth || ""}
          onChange={e =>
            update("passportInfo", "countryOfBirth", e.target.value)
          }
        />
      </Card>

      {/* EMERGENCY */}
      <Card icon={Phone} title="Emergency Contact">
        <Field label="Name" required editMode={editMode}
          value={emergencyContact.name || ""}
          onChange={e =>
            update("emergencyContact", "name", e.target.value)
          }
        />

        <Field label="Relationship" editMode={editMode}
          value={emergencyContact.relationship || ""}
          onChange={e =>
            update("emergencyContact", "relationship", e.target.value)
          }
        />

        <Field label="Phone" required editMode={editMode}
          value={emergencyContact.phone || ""}
          onChange={e =>
            update("emergencyContact", "phone", e.target.value)
          }
        />

        <Field label="Email" editMode={editMode}
          value={emergencyContact.email || ""}
          onChange={e =>
            update("emergencyContact", "email", e.target.value)
          }
        />
      </Card>

      {/* CURRENT ADDRESS */}
      <Card icon={Globe} title="Current Address">
        <Field label="Address Line" editMode={editMode}
          value={currentAddress.address || ""}
          onChange={e =>
            update("personalInfo", "address", e.target.value, "currentAddress")
          }
        />

        <Field label="City" editMode={editMode}
          value={currentAddress.city || ""}
          onChange={e =>
            update("personalInfo", "city", e.target.value, "currentAddress")
          }
        />

        <Field label="State" editMode={editMode}
          value={currentAddress.state || ""}
          onChange={e =>
            update("personalInfo", "state", e.target.value, "currentAddress")
          }
        />

        <Field label="Postal Code" editMode={editMode}
          value={currentAddress.postalCode || ""}
          onChange={e =>
            update("personalInfo", "postalCode", e.target.value, "currentAddress")
          }
        />

        <Field label="Country" editMode={editMode}
          value={currentAddress.country || ""}
          onChange={e =>
            update("personalInfo", "country", e.target.value, "currentAddress")
          }
        />

        <Select
          label="Living in another country?"
          editMode={editMode}
          value={
            passportInfo.livingInOtherCountry === true
              ? "yes"
              : passportInfo.livingInOtherCountry === false
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
      </Card>

      {/* PERMANENT ADDRESS */}
      <Card icon={Globe} title="Permanent Address">
        <div className="col-span-1 md:col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={sameAsCurrent}
            disabled={!editMode}
            onChange={e => setSameAsCurrent(e.target.checked)}
          />
          <label className="text-sm text-gray-700">
            Same as current address
          </label>
        </div>

        <Field label="Address Line" editMode={editMode}
          value={permanentAddress.address || ""}
          onChange={e =>
            update("personalInfo", "address", e.target.value, "permanentAddress")
          }
        />

        <Field label="City" editMode={editMode}
          value={permanentAddress.city || ""}
          onChange={e =>
            update("personalInfo", "city", e.target.value, "permanentAddress")
          }
        />

        <Field label="State" editMode={editMode}
          value={permanentAddress.state || ""}
          onChange={e =>
            update("personalInfo", "state", e.target.value, "permanentAddress")
          }
        />

        <Field label="Postal Code" editMode={editMode}
          value={permanentAddress.postalCode || ""}
          onChange={e =>
            update("personalInfo", "postalCode", e.target.value, "permanentAddress")
          }
        />

        <Field label="Country" editMode={editMode}
          value={permanentAddress.country || ""}
          onChange={e =>
            update("personalInfo", "country", e.target.value, "permanentAddress")
          }
        />
      </Card>

      {/* BACKGROUND INFORMATION */}
      <Card icon={FileText} title="Background Information">

        <Select
          label="Criminal Offence"
          required
          editMode={editMode}
          value={
            backgroundInfo.criminalOffence === true
              ? "yes"
              : backgroundInfo.criminalOffence === false
                ? "no"
                : ""
          }
          options={["yes", "no"]}
          onChange={e =>
            update(
              "backgroundInfo",
              "criminalOffence",
              e.target.value === "yes"
            )
          }
        />

        <Select
          label="Immigration Applied Earlier"
          required
          editMode={editMode}
          value={
            backgroundInfo.immigrationApplied === true
              ? "yes"
              : backgroundInfo.immigrationApplied === false
                ? "no"
                : ""
          }
          options={["yes", "no"]}
          onChange={e =>
            update(
              "backgroundInfo",
              "immigrationApplied",
              e.target.value === "yes"
            )
          }
        />

        <Select
          label="Medical Condition"
          required
          editMode={editMode}
          value={
            backgroundInfo.medicalCondition === true
              ? "yes"
              : backgroundInfo.medicalCondition === false
                ? "no"
                : ""
          }
          options={["yes", "no"]}
          onChange={e =>
            update(
              "backgroundInfo",
              "medicalCondition",
              e.target.value === "yes"
            )
          }
        />

        <Select
          label="Visa Refusal"
          required
          editMode={editMode}
          value={
            backgroundInfo.visaRefusal === true
              ? "yes"
              : backgroundInfo.visaRefusal === false
                ? "no"
                : ""
          }
          options={["yes", "no"]}
          onChange={e =>
            update(
              "backgroundInfo",
              "visaRefusal",
              e.target.value === "yes"
            )
          }
        />
      </Card>
    </div>
  );
}
