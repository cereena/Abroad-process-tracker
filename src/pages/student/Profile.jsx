import { useState } from "react";

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    qualification: "",
    passportno: "",
    college: "",
    year: "",
    score: "",
    country: "",
    intake: "",
    course: "",
    englishTest: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile saved successfully ✅");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-blue-900">My Profile</h1>
        <p className="text-gray-500 text-sm">
          Manage your personal & academic information
        </p>
      </div>

      {/* ========== Personal Info ========== */}
      <Section title="Personal Information">
        <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Input label="Date of Birth" type="date" name="dob" value={form.dob} onChange={handleChange} />
        <Input label="Passport Number" name="passportno" value={form.passportno} onChange={handleChange} />

        <Select label="Gender" name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </Select>
      </Section>

      {/* ========== Academic Info ========== */}
      <Section title="Academic Information">
        <Input label="Highest Qualification" name="qualification" value={form.qualification} onChange={handleChange} />
        <Input label="College / University" name="college" value={form.college} onChange={handleChange} />
        <Input label="Year of Passing" name="year" value={form.year} onChange={handleChange} />
        <Input label="GPA / Percentage" name="score" value={form.score} onChange={handleChange} />
      </Section>

      {/* ========== Preferences ========== */}
      <Section title="Study Abroad Preferences">
        <Select label="Preferred Country" name="country" value={form.country} onChange={handleChange}>
          <option value="">Select</option>
          <option>Poland</option>
          <option>UK</option>
          <option>Canada</option>
          <option>Australia</option>
        </Select>

        <Select label="Intake" name="intake" value={form.intake} onChange={handleChange}>
          <option value="">Select</option>
          <option>Fall 2026</option>
          <option>Spring 2026</option>
        </Select>

        <Input label="Interested Course" name="course" value={form.course} onChange={handleChange} />

        <Select label="English Test" name="englishTest" value={form.englishTest} onChange={handleChange}>
          <option value="">Select</option>
          <option>IELTS</option>
          <option>TOEFL</option>
          <option>MOI</option>
          <option>None</option>
        </Select>
      </Section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;





/* ================== Small reusable components ================== */

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-lg font-semibold text-blue-800">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <select
        {...props}
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        {children}
      </select>
    </div>
  );
}
