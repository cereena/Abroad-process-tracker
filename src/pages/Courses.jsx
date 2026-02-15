import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  GraduationCap,
  Globe,
  DollarSign,
  Briefcase,
  FileText,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";

const Courses = () => {
  const navigate = useNavigate();

  /* ================= DATA ================= */

  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FILTERS ================= */

  const [filters, setFilters] = useState({
    country: "",
    maxBudget: "",
    minPercentage: "",
    stream: "",
    intake: "",
    schengen: "",
    prChance: "",
    stayBack: "",
  });

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchUniversities();
  }, [filters]);

  const fetchUniversities = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (filters.country) params.append("country", filters.country);
      if (filters.maxBudget) params.append("maxBudget", filters.maxBudget);
      if (filters.stream) params.append("stream", filters.stream);
      if (filters.schengen) params.append("schengen", filters.schengen);
      if (filters.intake) params.append("intake", filters.intake);
      if (filters.prChance) params.append("prChance", filters.prChance);
      if (filters.stayBack) params.append("stayBack", filters.stayBack);

      const url = `http://localhost:5000/api/universities?${params.toString()}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch universities");
      }

      const data = await res.json();

      console.log("Universities:", data); // debug

      setUniversities(data);

    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= NAVIGATION ================= */

  const handleTalkToExpert = (country) => {
    navigate("/contact", {
      state: { country },
    });
  };

  /* ================= UI ================= */

  return (
    <div className="bg-[#fff3d8] min-h-screen py-12 px-4 mt-6">

      {/* ================= HEADER ================= */}

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          Explore Study Abroad Programs
        </h1>

        <p className="text-slate-500 max-w-2xl mx-auto">
          Find universities based on your marks, budget, career goals,
          and visa eligibility.
        </p>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="bg-white border rounded-xl p-6 max-w-6xl mx-auto shadow-sm mb-12">

        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={20} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-blue-700">
            Eligibility Filters
          </h2>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">


          {/* Country */}
          <select
            className="border rounded-lg px-3 py-2 bg-blue-50 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            hover:border-blue-400 transition"

            value={filters.country}
            onChange={(e) =>
              setFilters({ ...filters, country: e.target.value })
            }
          >
            <option value="">All Countries</option>
            <option value="Germany">Germany</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="France">France</option>
            <option value="Poland">Poland</option>
            <option value="Ireland">Ireland</option>
          </select>

          {/* Budget */}
          <select
            className="border rounded-lg px-3 py-2 bg-blue-50 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            hover:border-blue-400 transition"

            value={filters.maxBudget}
            onChange={(e) =>
              setFilters({ ...filters, maxBudget: e.target.value })
            }
          >
            <option value="">Max Budget</option>
            <option value="0">Free Education</option>
            <option value="10000">Up to $10,000</option>
            <option value="20000">Up to $20,000</option>
            <option value="30000">Up to $30,000</option>
          </select>

          {/* Percentage */}
          <select
            className="border rounded-lg px-3 py-2 bg-blue-50 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            hover:border-blue-400 transition"

            value={filters.minPercentage}
            onChange={(e) =>
              setFilters({ ...filters, minPercentage: e.target.value })
            }
          >
            <option value="">Min Percentage</option>
            <option value="50">50%+</option>
            <option value="60">60%+</option>
            <option value="70">70%+</option>
            <option value="80">80%+</option>
          </select>

          {/* Stream */}
          <select
            className="border rounded-lg px-3 py-2 bg-blue-50 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            hover:border-blue-400 transition"

            value={filters.stream}
            onChange={(e) =>
              setFilters({ ...filters, stream: e.target.value })
            }
          >
            <option value="">All Streams</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
          </select>

          {/* Intake */}
          <select
            className="border rounded-lg px-3 py-2 bg-blue-50 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            hover:border-blue-400 transition"

            value={filters.intake}
            onChange={(e) =>
              setFilters({ ...filters, intake: e.target.value })
            }
          >
            <option value="">Intake</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="April">April</option>
            <option value="July">July</option>
            <option value="September">September</option>
            <option value="October">October</option>
          </select>

          {/* Schengen */}
          <select
            className="border rounded-lg px-3 py-2 bg-blue-50 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            hover:border-blue-400 transition"

            value={filters.schengen}
            onChange={(e) =>
              setFilters({ ...filters, schengen: e.target.value })
            }
          >
            <option value="">Schengen</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {/* PR */}
          <select
            className="border rounded-lg px-3 py-2 bg-blue-50 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            hover:border-blue-400 transition"

            value={filters.prChance}
            onChange={(e) =>
              setFilters({ ...filters, prChance: e.target.value })
            }
          >
            <option value="">PR Chance</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Stay Back */}
          <select
            className="border rounded-lg px-3 py-2 bg-blue-50 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            hover:border-blue-400 transition"

            value={filters.stayBack}
            onChange={(e) =>
              setFilters({ ...filters, stayBack: e.target.value })
            }
          >
            <option value="">Stay Back</option>
            <option value="1 Year">1 Year</option>
            <option value="18 Months">18 Months</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
          </select>

        </div>
      </div>

      {/* ================= CARDS ================= */}

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Loading */}
        {loading && (
          <p className="col-span-full text-center text-gray-500">
            Loading universities...
          </p>
        )}

        {/* Data */}
        {!loading &&
          universities.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-xl p-6 hover:shadow-lg transition flex flex-col"
            >

              <h3 className="text-xl font-bold text-blue-700 text-center mb-1">
                {item.universityName}
              </h3>

              <p className="text-sm text-center text-gray-500 mb-4">
                {item.courseName} • {item.country}
              </p>

              {/* Info */}
              <div className="space-y-2 text-sm text-slate-600 flex-1">

                <div className="flex gap-2 items-center">
                  <DollarSign size={16} />
                  {item.tuitionFee === 0 ? "Free" : `$${item.tuitionFee}`}
                </div>

                <div className="flex gap-2 items-center">
                  <GraduationCap size={16} />
                  {item.degree}
                </div>

                <div className="flex gap-2 items-center">
                  <Clock size={16} />
                  Intake: {item.intakes?.join(", ")}
                </div>

                <div className="flex gap-2 items-center">
                  <Globe size={16} />
                  {item.schengen ? "Schengen" : "Non-Schengen"}
                </div>

                <div className="flex gap-2 items-center">
                  <Briefcase size={16} />
                  {item.partTimeHours} hrs/week
                </div>

                <div className="flex gap-2 items-center">
                  <FileText size={16} />
                  App Fee: ${item.applicationFee}
                </div>

                <div className="flex gap-2 items-center">
                  <Award size={16} />
                  PR: {item.prChance}
                </div>

                <div className="flex gap-2 items-center">
                  <CheckCircle size={16} />
                  {item.globallyRecognized
                    ? "Globally Recognized"
                    : "Limited Recognition"}
                </div>

              </div>

              {/* CTA */}
              <button
                onClick={() => handleTalkToExpert(item.country)}
                className="mt-6 w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded-lg font-medium transition"
              >
                Talk to Expert
              </button>

            </div>
          ))}

        {/* No Result */}
        {!loading && universities.length === 0 && (
          <p className="col-span-full text-center text-slate-500">
            No universities match your criteria.
          </p>
        )}

      </div>
    </div>
  );
};

export default Courses;
