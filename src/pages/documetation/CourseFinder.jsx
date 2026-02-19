import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Globe,
  GraduationCap,
  DollarSign,
  Award,
  BookOpen,
  Percent,
  Clock,
  PlusCircle,
} from "lucide-react";

/* ================= HELPERS ================= */

const getToken = () => localStorage.getItem("docToken");

/* ================= COMPONENT ================= */

const Universities = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [showStudents, setShowStudents] = useState(false);


  const [universities, setUniversities] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    country: "",
    maxBudget: "",
    minPercentage: "",
    stream: "",
    intake: "",
  });

  /* PAGINATION */
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  /* ================= AUTH CHECK ================= */

  const checkAuth = () => {
    const token = getToken();

    if (!token) {
      alert("Session expired. Login again.");
      navigate("/login");
      return null;
    }

    return token;
  };

  /* ================= FETCH ================= */

  const fetchStudents = async () => {
    try {
      const token = checkAuth();
      if (!token) return;

      const res = await fetch(
        "http://localhost:5000/api/doc-executives/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();

      setStudents(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Students error:", err);
    }
  };


  const fetchUniversities = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/universities"
      );

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setUniversities(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load universities");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESPONSIVE ================= */

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w < 640) setPerPage(6);
      else if (w < 1024) setPerPage(8);
      else setPerPage(9);
    };

    update();

    window.addEventListener("resize", update);

    return () =>
      window.removeEventListener("resize", update);
  }, []);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    fetchUniversities();
    fetchStudents();
  }, []);

  /* ================= FILTER ================= */

  useEffect(() => {
    let temp = [...universities];

    if (search) {
      temp = temp.filter((u) =>
        u.universityName
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (filters.country) {
      temp = temp.filter(
        (u) => u.country === filters.country
      );
    }

    if (filters.maxBudget) {
      temp = temp.filter(
        (u) =>
          u.tuitionFee <= Number(filters.maxBudget)
      );
    }

    if (filters.minPercentage) {
      temp = temp.filter(
        (u) =>
          u.minPercentage >=
          Number(filters.minPercentage)
      );
    }

    if (filters.stream) {
      temp = temp.filter(
        (u) => u.stream === filters.stream
      );
    }

    if (filters.intake) {
      temp = temp.filter((u) =>
        u.intakes?.includes(filters.intake)
      );
    }

    setFiltered(temp);
    setPage(1);
  }, [filters, search, universities]);

  /* ================= ACTION ================= */

  const handleSuggest = async (uni) => {
    console.log("CLICKED", uni._id);
    try {
      if (!selectedStudent) {
        alert("Select student first");
        return;
      }

      const token = checkAuth();
      if (!token) return;

      const res = await fetch(
        `http://localhost:5000/api/application/suggest/${selectedStudent}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            universityId: uni._id,
            course: uni.stream || uni.courseName,
          }),

        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Suggested successfully ✅");

    } catch (err) {
      alert(err.message || "Failed");
    }
  };


  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(
    filtered.length / perPage
  );

  const data = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6">

      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-blue-800">
          Explore Universities
        </h1>

        <div className="relative mt-4 w-full sm:w-80">

          {/* Input */}
          <input
            type="text"
            placeholder="Search student by name or email..."
            value={studentSearch}
            onChange={(e) => {
              setStudentSearch(e.target.value);
              setShowStudents(true);
            }}
            onFocus={() => setShowStudents(true)}
            className="border p-2 rounded w-full bg-white"
          />

          {/* Dropdown */}
          {showStudents && studentSearch && (
            <div className="absolute z-50 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
              {students
                .filter((s) =>
                  studentSearch
                    ? `${s.name} ${s.email}`
                      .toLowerCase()
                      .includes(studentSearch.toLowerCase())
                    : true
                )
                .slice(0, 10)
                // limit results
                .map((s) => (

                  <div
                    key={s._id}
                    onMouseDown={() => {
                      console.log("STUDENT SELECTED:", s._id);
                      setSelectedStudent(s._id);
                      setStudentSearch(`${s.name} (${s.email})`);
                      setShowStudents(false);
                    }}

                    className="p-2 hover:bg-blue-50 cursor-pointer text-sm"
                  >
                    {s.name} ({s.email})
                  </div>

                ))}

              {students.length === 0 && (
                <p className="p-2 text-gray-400 text-sm">
                  No students found
                </p>
              )}

            </div>
          )}

        </div>


      </div>

      {/* FILTERS */}

      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">

        <input
          placeholder="Search"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Country"
          value={filters.country}
          onChange={(e) =>
            setFilters({
              ...filters,
              country: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Max Budget"
          value={filters.maxBudget}
          onChange={(e) =>
            setFilters({
              ...filters,
              maxBudget: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Min %"
          value={filters.minPercentage}
          onChange={(e) =>
            setFilters({
              ...filters,
              minPercentage: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

      </div>

      {selectedStudent && (
        <p className="text-xs text-gray-500">
          ID: {selectedStudent}
        </p>

      )}


      {/* LIST */}

      {loading && <p>Loading...</p>}

      {!loading && (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {data.map((u) => (

            <div
              key={u._id}
              className="bg-white p-5 rounded-xl shadow border flex flex-col"
            >

              <h2 className="font-bold text-lg text-blue-700">
                {u.universityName}
              </h2>

              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Globe size={14} />
                {u.country}, {u.city}
              </p>

              <div className="mt-3 space-y-2 text-sm text-gray-700">

                <p className="flex items-center gap-2">
                  <GraduationCap size={14} />
                  {u.degree} • {u.stream}
                </p>


                <p className="flex items-center gap-2">
                  <BookOpen size={14} />{" "}
                  {u.courseName}
                </p>

                <p className="flex items-center gap-2">
                  <DollarSign size={14} />{" "}
                  {u.tuitionFee}
                </p>

                <p className="flex items-center gap-2">
                  <Award size={14} /> PR:{" "}
                  {u.prChance}
                </p>

                <p className="flex items-center gap-2">
                  <Clock size={14} /> Stay
                  Back: {u.stayBackYears} yrs
                </p>

                <p className="flex items-center gap-2">
                  <Percent size={14} />{" "}
                  {u.commissionPercent}%
                </p>

              </div>

              {/* ACTION */}

              <button
                onClick={() => {
                  console.log("BUTTON CLICKED");
                  handleSuggest(u);
                }}
                className="mt-5 w-full py-2 rounded-lg font-semibold
                bg-orange-500 text-white hover:bg-orange-400 flex justify-center gap-2 items-center"
              >
                <PlusCircle size={18} />
                Suggest
              </button>

            </div>
          ))}

        </div>
      )}

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="flex justify-center gap-3 mt-8">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default Universities;
