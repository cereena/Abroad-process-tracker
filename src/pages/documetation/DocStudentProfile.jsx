import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Section = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow space-y-3">
    <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
      {children}
    </div>
  </div>
);

const Field = ({ label, value }) => (
  <p>
    <span className="font-medium text-gray-700">{label}:</span>{" "}
    {value || "—"}
  </p>
);

export default function DocStudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("docToken");

    fetch(`http://localhost:5000/api/student/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!student) return <p className="p-6">Loading...</p>;

  if (!student.profileCompleted) {
    return (
      <p className="text-red-600 text-center mt-10">
        Student profile not completed yet
      </p>
    );
  }

  const { personalInfo, passportInfo, emergencyContact, backgroundInfo } =
    student;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      <h2 className="text-2xl font-bold text-blue-800">
        Student Profile – {student.name}
      </h2>

      {/* BASIC INFO */}
      <Section title="Basic Information">
        <Field label="Email" value={student.email} />
        <Field label="Phone" value={student.phone} />
        <Field label="Country Preference" value={student.countryPreference} />
        <Field label="Status" value={student.status} />
        <Field
          label="Profile Completion"
          value={`${student.profileCompletionPercent || 0}%`}
        />
      </Section>

      {/* PERSONAL INFO */}
      <Section title="Personal Information">
        <Field label="First Name" value={personalInfo?.firstName} />
        <Field label="Middle Name" value={personalInfo?.middleName} />
        <Field label="Last Name" value={personalInfo?.lastName} />
        <Field label="Gender" value={personalInfo?.gender} />
        <Field
          label="Date of Birth"
          value={personalInfo?.dob?.split("T")[0]}
        />
        <Field label="Nationality" value={personalInfo?.nationality} />
        <Field label="Citizenship" value={personalInfo?.citizenship} />
      </Section>

      {/* PASSPORT */}
      <Section title="Passport Information">
        <Field
          label="Name as per Passport"
          value={passportInfo?.nameAsPerPassport}
        />
        <Field label="Passport Number" value={passportInfo?.passportNo} />
        <Field
          label="Issue Date"
          value={passportInfo?.issueDate?.split("T")[0]}
        />
        <Field
          label="Expiry Date"
          value={passportInfo?.expiryDate?.split("T")[0]}
        />
        <Field label="Issue Country" value={passportInfo?.issueCountry} />
      </Section>

      {/* BACKGROUND */}
      <Section title="Background Information">
        <Field
          label="Applied for Immigration"
          value={backgroundInfo?.immigrationApplied ? "Yes" : "No"}
        />
        <Field
          label="Medical Condition"
          value={backgroundInfo?.medicalCondition ? "Yes" : "No"}
        />
        <Field
          label="Visa Refusal History"
          value={backgroundInfo?.visaRefusal ? "Yes" : "No"}
        />
        <Field
          label="Criminal Offence"
          value={backgroundInfo?.criminalOffence ? "Yes" : "No"}
        />
      </Section>

      {/* EMERGENCY */}
      <Section title="Emergency Contact">
        <Field label="Name" value={emergencyContact?.name} />
        <Field label="Relationship" value={emergencyContact?.relationship} />
        <Field label="Phone" value={emergencyContact?.phone} />
        <Field label="Email" value={emergencyContact?.email} />
      </Section>

    </div>
  );
}
