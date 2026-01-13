import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

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

  const navigate = useNavigate();

  const handleTalkToExpert = (countryName) => {
    navigate("/contact", { state: { country: countryName } });
  };

  const options = [
    { id: 1, country: "United Kingdom", tuition: 28000, minPercentage: 65, yearGap: true, schengen: false, spouseAllowed: true, ielts: "Required" },
    { id: 2, country: "Canada", tuition: 18000, minPercentage: 55, yearGap: true, schengen: false, spouseAllowed: true, ielts: "Required" },
    { id: 3, country: "Germany", tuition: 0, minPercentage: 60, yearGap: false, schengen: true, spouseAllowed: true, ielts: "Not Required" },
    { id: 4, country: "France", tuition: 9000, minPercentage: 50, yearGap: true, schengen: true, spouseAllowed: false, ielts: "Not Required" },
    { id: 5, country: "Ireland", tuition: 20000, minPercentage: 60, yearGap: false, schengen: false, spouseAllowed: true, ielts: "Required" },
  ];

  const filteredOptions = options.filter((item) => {
    return (
      (filters.maxBudget === "" || item.tuition <= Number(filters.maxBudget)) &&
      (filters.minPercentage === "" || item.minPercentage <= Number(filters.minPercentage)) &&
      (filters.yearGap === "" || String(item.yearGap) === filters.yearGap) &&
      (filters.schengen === "" || String(item.schengen) === filters.schengen) &&
      (filters.spouse === "" || String(item.spouseAllowed) === filters.spouse) &&
      (filters.ielts === "" || item.ielts === filters.ielts)
    );
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">Study Abroad Destinations</h1>
      <p className="text-center text-slate-500 mb-10">Choose countries based on your profile & eligibility</p>

      <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-6xl mx-auto shadow-sm mb-12">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Filter Your Eligibility</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <select className="border rounded-lg p-2" value={filters.maxBudget} onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}>
            <option value="">Max Tuition ($)</option>
            <option value="10000">Up to 10,000</option>
            <option value="20000">Up to 20,000</option>
            <option value="30000">Up to 30,000</option>
          </select>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">{item.country}</h3>
              <div className="space-y-1 text-sm text-slate-600">
                <p>💰 Tuition: {item.tuition === 0 ? "Low / Free" : `$${item.tuition}`}</p>
                <p>📊 Min % Required: {item.minPercentage}%</p>
                <p>📝 IELTS: {item.ielts}</p>
              </div>

              <button
                className="mt-6 w-full bg-orange-600 text-white py-2 rounded-lg"
                onClick={() => handleTalkToExpert(item.country)}
              >
                Talk to Expert
              </button>


            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-slate-500">No countries match your profile.</p>
        )}

        {showNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md text-center shadow-lg">
              <h2 className="text-2xl font-bold text-blue-800 mb-3">📞 Call Scheduled</h2>
              <p className="text-gray-600 mb-6">Our study abroad expert will contact you shortly.</p>
              <button
                onClick={() => setShowNotification(false)}
                className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;