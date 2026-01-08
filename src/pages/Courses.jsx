import React, { useState } from "react";



const Courses = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [filters, setFilters] = useState({
    maxBudget: "",
    minPercentage: "",
    yearGap: "",
    schengen: "",
    spouse: "",
    ielts: "",
  });

  const options = [
    {
      id: 1,
      country: "United Kingdom",
      tuition: 28000,
      minPercentage: 65,
      yearGap: true,
      schengen: false,
      spouseAllowed: true,
      ielts: "Required",
    },
    {
      id: 2,
      country: "Canada",
      tuition: 18000,
      minPercentage: 55,
      yearGap: true,
      schengen: false,
      spouseAllowed: true,
      ielts: "Required",
    },
    {
      id: 3,
      country: "Germany",
      tuition: 0,
      minPercentage: 60,
      yearGap: false,
      schengen: true,
      spouseAllowed: true,
      ielts: "Not Required",
    },
    {
      id: 4,
      country: "France",
      tuition: 9000,
      minPercentage: 50,
      yearGap: true,
      schengen: true,
      spouseAllowed: false,
      ielts: "Not Required",
    },
    {
      id: 5,
      country: "Ireland",
      tuition: 20000,
      minPercentage: 60,
      yearGap: false,
      schengen: false,
      spouseAllowed: true,
      ielts: "Required",
    },
  ];

  const filteredOptions = options.filter((item) => {
    return (
      (filters.maxBudget === "" ||
        item.tuition <= Number(filters.maxBudget)) &&
      (filters.minPercentage === "" ||
        item.minPercentage <= Number(filters.minPercentage)) &&
      (filters.yearGap === "" ||
        String(item.yearGap) === filters.yearGap) &&
      (filters.schengen === "" ||
        String(item.schengen) === filters.schengen) &&
      (filters.spouse === "" ||
        String(item.spouseAllowed) === filters.spouse) &&
      (filters.ielts === "" || item.ielts === filters.ielts)
    );
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">Study Abroad Destinations</h1>
      <p className="text-center text-slate-500 mb-10">
        Choose countries based on your profile & eligibility
      </p>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-6xl mx-auto shadow-sm mb-12">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Filter Your Eligibility</h2>

        <div className="grid md:grid-cols-4 gap-4">
          <select className="border rounded-lg p-2" value={filters.maxBudget} onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}>
            <option value="">Max Tuition ($)</option>
            <option value="10000">Up to 10,000</option>
            <option value="20000">Up to 20,000</option>
            <option value="30000">Up to 30,000</option>
          </select>

          <select className="border rounded-lg p-2" value={filters.minPercentage} onChange={(e) =>
            setFilters({ ...filters, minPercentage: e.target.value })}>
            <option value="">Minimum Percentage</option>
            <option value="50">50%+</option>
            <option value="55">55%+</option>
            <option value="60">60%+</option>
            <option value="65">65%+</option>
          </select>

          <select
            className="border rounded-lg p-2"
            value={filters.yearGap} onChange={(e) => setFilters({ ...filters, yearGap: e.target.value })}>
            <option value="">Year Gap</option>
            <option value="true">Accepted</option>
            <option value="false">Not Accepted</option>
          </select>

          <select className="border rounded-lg p-2"
            value={filters.schengen}
            onChange={(e) =>
              setFilters({ ...filters, schengen: e.target.value })}>
            <option value="">Schengen Country</option>
            <option value="true">Yes</option>
            <option value="false">No</option></select>

          <select className="border rounded-lg p-2"
            value={filters.spouse}
            onChange={(e) =>
              setFilters({ ...filters, spouse: e.target.value })}>
            <option value="">Spouse Visa</option>
            <option value="true">Allowed</option>
            <option value="false">Not Allowed</option>
          </select>

          <select
            className="border rounded-lg p-2"
            value={filters.ielts}
            onChange={(e) =>
              setFilters({ ...filters, ielts: e.target.value })}>
            <option value="">IELTS</option>
            <option value="Required">Required</option>
            <option value="Not Required">Not Required</option>
          </select>
        </div>
      </div>

      {/* Country Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                {item.country}
              </h3>

              <div className="space-y-1 text-sm text-slate-600">
                <p>💰 Tuition: {item.tuition === 0 ? "Low / Free" : `$${item.tuition}`}</p>
                <p>📊 Min % Required: {item.minPercentage}%</p>
                <p>📆 Year Gap: {item.yearGap ? "Accepted" : "Not Accepted"}</p>
                <p>🌍 Schengen: {item.schengen ? "Yes" : "No"}</p>
                <p>👨‍👩‍👧 Spouse Visa: {item.spouseAllowed ? "Allowed" : "Not Allowed"}</p>
                <p>📝 IELTS: {item.ielts}</p>
              </div>



              <button
                className="mt-6 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-500"
                onClick={() => setShowNotification(true)}
              >
                Talk to Expert
              </button>


            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-slate-500">
            No countries match your profile.
          </p>
        )}
        {showNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md text-center shadow-lg">
              <h2 className="text-2xl font-bold text-blue-800 mb-3">
                📞 Call Scheduled
              </h2>
              <p className="text-gray-600 mb-6">
                Our study abroad expert will contact you shortly.
                <br />
                If you are interested, please proceed further.
              </p>

              <a
                href="/login"
                className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-500"
              >
                Proceed
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Courses;
