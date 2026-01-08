import { useState } from "react";

const universitiesData = [
  {
    id: 1,
    name: "University of Toronto",
    country: "Canada",
    course: "Computer Science",
    intake: "Fall 2026",
    status: "Not Applied",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/04/Utoronto_coa.svg",
  },
  {
    id: 2,
    name: "University of Melbourne",
    country: "Australia",
    course: "Data Science",
    intake: "July 2026",
    status: "Applied",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7e/University_of_Melbourne_coat_of_arms.svg",
  },
  {
    id: 3,
    name: "University of Oxford",
    country: "UK",
    course: "Artificial Intelligence",
    intake: "Fall 2026",
    status: "Offer Received",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/d3/University_of_Oxford_coat_of_arms.svg",
  },
];

const Universities = () => {
  const [country, setCountry] = useState("All");
  const [intake, setIntake] = useState("All");

  const filteredUniversities = universitiesData.filter((u) => {
    return (
      (country === "All" || u.country === country) &&
      (intake === "All" || u.intake === intake)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Universities</h1>
        <p className="text-gray-500 mt-1">
          Explore and track your university applications
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow">
        <select
          className="border rounded-lg px-4 py-2"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option>All</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>UK</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          value={intake}
          onChange={(e) => setIntake(e.target.value)}
        >
          <option>All</option>
          <option>Fall 2026</option>
          <option>July 2026</option>
        </select>
      </div>

      {/* University Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((uni) => (
          <div
            key={uni.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
          >
            <div>
              <img
                src={uni.logo}
                alt={uni.name}
                className="h-14 mb-4 object-contain"
              />

              <h3 className="text-lg font-semibold text-blue-900">
                {uni.name}
              </h3>

              <p className="text-sm text-gray-500">{uni.country}</p>

              <div className="mt-4 space-y-1 text-sm">
                <p>
                  <span className="font-medium">Course:</span> {uni.course}
                </p>
                <p>
                  <span className="font-medium">Intake:</span> {uni.intake}
                </p>
              </div>

              <span
                className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold
                ${
                  uni.status === "Offer Received"
                    ? "bg-green-100 text-green-700"
                    : uni.status === "Applied"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {uni.status}
              </span>
            </div>

            <button
              className={`mt-6 w-full py-2 rounded-lg font-semibold
              ${
                uni.status === "Not Applied"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-600 cursor-not-allowed"
              }`}
              disabled={uni.status !== "Not Applied"}
            >
              {uni.status === "Not Applied" ? "Apply Now" : "View Status"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Universities;
