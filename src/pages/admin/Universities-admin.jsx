import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Edit,
  Trash2,
  PlusCircle,
  Globe,
  GraduationCap,
  DollarSign,
  Award,
  BookOpen,
  Percent,
  Clock,
  Download,
} from "lucide-react";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AdminUniversities = () => {
  const navigate = useNavigate();

  const [universities, setUniversities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FILTER STATE */

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

useEffect(() => {
  const updatePerPage = () => {
    const w = window.innerWidth;

    if (w < 640) setPerPage(6); // mobile
    else if (w < 1024) setPerPage(10); // tablet
    else setPerPage(9); // desktop
  };

  updatePerPage(); // initial
  window.addEventListener("resize", updatePerPage);

  return () => window.removeEventListener("resize", updatePerPage);
}, []);


  /* ================= FETCH ================= */

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        "http://localhost:5000/api/admin/universities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setUniversities(data);
      setFiltered(data);
    } catch {
      alert("Access denied");
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
      temp = temp.filter((u) => u.country === filters.country);
    }

    /* Budget */
    if (filters.maxBudget) {
      temp = temp.filter(
        (u) => u.tuitionFee <= Number(filters.maxBudget)
      );
    }

    /* Percentage */
    if (filters.minPercentage) {
      temp = temp.filter(
        (u) => u.minPercentage >= Number(filters.minPercentage)
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
        (u) => String(u.schengen) === filters.schengen
      );
    }

    /* PR */
    if (filters.prChance) {
      temp = temp.filter(
        (u) => u.prChance === filters.prChance
      );
    }

    /* Stay Back */
    if (filters.stayBack) {
      temp = temp.filter(
        (u) => u.stayBackYears >= Number(filters.stayBack)
      );
    }

    setFiltered(temp);
    setPage(1);

  }, [filters, search, universities]);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this university?")) return;

  try {
    const token = localStorage.getItem("adminToken");

    await fetch(
      `http://localhost:5000/api/admin/universities/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchUniversities();
  } catch (err) {
    alert("Delete failed");
  }
};


  /* ================= EXCEL ================= */

  const exportExcel = () => {

    const data = filtered.map((u, i) => ({
      "S.No": i + 1,
      Name:u.universityName,
      Country: u.country,
      City: u.city,
      Course: u.courseName,
      Degree: u.degree,
      Stream: u.stream,
      Tuition: u.tuitionFee,
      PR: u.prChance,
      Intake: u.intakes?.join(", "),
      Commission: u.commissionPercent,
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Universities");

    const buf = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(new Blob([buf]), "universities.xlsx");
  };

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filtered.length / perPage);

  const data = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen w-full bg-blue-50 p-3 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <h1 className="text-3xl font-bold text-blue-800">
          Manage Universities
        </h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Download size={18} />
            Excel
          </button>

          <button
            onClick={() =>
              navigate("/admin/universities/new")
            }
            className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Add
          </button>

        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 gap-3">
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Country"
          value={filters.country}
          onChange={(e) =>
            setFilters({ ...filters, country: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Max Budget"
          type="number"
          value={filters.maxBudget}
          onChange={(e) =>
            setFilters({ ...filters, maxBudget: e.target.value })
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
            setFilters({ ...filters, stream: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          placeholder="Intake"
          value={filters.intake}
          onChange={(e) =>
            setFilters({ ...filters, intake: e.target.value })
          }
          className="border p-2 rounded"
        />

        <select
          value={filters.schengen}
          onChange={(e) =>
            setFilters({ ...filters, schengen: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">Schengen</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

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
         className="bg-gray-200 rounded px-2 py-1 w-full sm:w-auto">
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

              <p className="text-sm text-gray-500 flex items-center gap-1 items-center">
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
                  Intake: {u.intakes?.join(", ")}
                </p>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-3 justify-between mt-4">

                <button
                  onClick={() =>
                    navigate(`/admin/universities/edit/${u._id}`)
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <Edit size={14} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(u._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <Trash2 size={14} /> Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-3 mt-8 text-sm">

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

export default AdminUniversities;
