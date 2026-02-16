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

const Universities = () => {
  /* ================= STATE ================= */

  const [universities, setUniversities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [myPrefs, setMyPrefs] = useState([]);

  const [search, setSearch] = useState("");

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

  /* PAGINATION */

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const navigate = useNavigate();

  /* ================= RESPONSIVE ================= */

  const fetchMyApplication = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/application/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();

      if (data?.preferences) {
        const ids = data.preferences.map(
          (p) => p.university._id
        );

        setMyPrefs(ids);
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    const updatePerPage = () => {
      const w = window.innerWidth;

      if (w < 640) setPerPage(6);
      else if (w < 1024) setPerPage(8);
      else setPerPage(9);
    };

    updatePerPage();

    window.addEventListener("resize", updatePerPage);

    return () =>
      window.removeEventListener("resize", updatePerPage);
  }, []);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchUniversities();
    fetchMyApplication();
  }, []);

  const fetchUniversities = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/universities"
      );

      if (!res.ok) {
        throw new Error("Failed to load");
      }

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

  /* ================= FILTER LOGIC ================= */

  useEffect(() => {
    let temp = [...universities];

    /* Search */
    if (search) {
      temp = temp.filter((u) =>
        u.universityName
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    /* Country */
    if (filters.country) {
      temp = temp.filter(
        (u) => u.country === filters.country
      );
    }

    /* Budget */
    if (filters.maxBudget) {
      temp = temp.filter(
        (u) =>
          u.tuitionFee <= Number(filters.maxBudget)
      );
    }

    /* Percentage */
    if (filters.minPercentage) {
      temp = temp.filter(
        (u) =>
          u.minPercentage >=
          Number(filters.minPercentage)
      );
    }

    /* Stream */
    if (filters.stream) {
      temp = temp.filter(
        (u) => u.stream === filters.stream
      );
    }

    /* Intake */
    if (filters.intake) {
      temp = temp.filter((u) =>
        u.intakes?.includes(filters.intake)
      );
    }

    /* Schengen */
    if (filters.schengen) {
      temp = temp.filter(
        (u) =>
          String(u.schengen) === filters.schengen
      );
    }

    /* PR */
    if (filters.prChance) {
      temp = temp.filter(
        (u) =>
          u.prChance === filters.prChance
      );
    }

    /* Stay Back */
    if (filters.stayBack) {
      temp = temp.filter(
        (u) =>
          u.stayBackYears >=
          Number(filters.stayBack)
      );
    }

    setFiltered(temp);
    setPage(1);
  }, [filters, search, universities]);

  /* ================= ADD TO APPLICATION ================= */

  const handleAdd = async (uni) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        navigate("/login");
        return;
      }

      const res = await fetch(
        "http://localhost:5000/api/application/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            universityId: uni._id,
            course: uni.courseName,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Added to application ✅");

      setMyPrefs((prev) => [...prev, uni._id]);

    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
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
    <div className="min-h-screen w-full bg-blue-50 p-3 sm:p-6">

      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-blue-800">
          Explore Universities
        </h1>

        <p className="text-gray-500 mt-1">
          Find and add universities to your
          application
        </p>

      </div>

      {/* FILTERS */}

      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 gap-3">

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
          placeholder="Max Budget"
          type="number"
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
          placeholder="Min %"
          type="number"
          value={filters.minPercentage}
          onChange={(e) =>
            setFilters({
              ...filters,
              minPercentage: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Stream"
          value={filters.stream}
          onChange={(e) =>
            setFilters({
              ...filters,
              stream: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Intake"
          value={filters.intake}
          onChange={(e) =>
            setFilters({
              ...filters,
              intake: e.target.value,
            })
          }
          className="border p-2 rounded"
        />

        <button
          onClick={() =>
            setFilters({
              country: "",
              maxBudget: "",
              minPercentage: "",
              stream: "",
              intake: "",
              schengen: "",
              prChance: "",
              stayBack: "",
            })
          }
          className="bg-gray-200 rounded px-2 py-1 w-full sm:w-auto"
        >
          Clear
        </button>

      </div>

      {/* LIST */}

      {loading && <p>Loading...</p>}

      {!loading && (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {data.map((u) => (

            <div
              key={u._id}
              className="bg-white p-5 rounded-xl shadow border flex flex-col justify-between h-full"
            >

              <h2 className="font-bold text-lg text-blue-700 break-words">
                {u.universityName}
              </h2>

              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Globe size={14} />
                {u.country}, {u.city}
              </p>

              <div className="mt-3 space-y-1 text-sm">

                <p className="flex items-center gap-1">
                  <GraduationCap size={14} />
                  {u.degree} • {u.stream}
                </p>

                <p className="flex items-center gap-1">
                  <BookOpen size={14} />
                  {u.courseName}
                </p>

                <p className="flex items-center gap-1">
                  <DollarSign size={14} />
                  {u.tuitionFee}
                </p>

                <p className="flex items-center gap-1">
                  <Award size={14} />
                  PR: {u.prChance}
                </p>

                <p className="flex items-center gap-1">
                  <Clock size={14} />
                  Stay Back: {u.stayBackYears} yrs
                </p>

                <p className="flex items-center gap-1">
                  <Percent size={14} />
                  Commission: {u.commissionPercent}%
                </p>

                <p className="text-xs text-gray-400">
                  Intake:{" "}
                  {u.intakes?.join(", ")}
                </p>

              </div>

              {/* ACTION */}

              {/* ACTION */}

              {(() => {
                const isAdded = myPrefs.includes(u._id);

                return (
                  <button
                    disabled={isAdded}onClick={() => handleAdd(u)}
                    className={`mt-6 w-full py-2 rounded-lg font-semibold
                     ${isAdded
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                      }`} >
                    {isAdded ? "Added" : "Add to Application"}
                  </button>
                );
              })()}

            </div>
          ))}

        </div>
      )}

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="flex justify-center items-center gap-3 mt-8 text-sm">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage(page + 1)
            }
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
