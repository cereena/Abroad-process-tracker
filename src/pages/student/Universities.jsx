import { useEffect, useState } from "react";

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [country, setCountry] = useState("All");
  const [intake, setIntake] = useState("All");

  // Fetch universities
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch("/api/universities");

        if (!res.ok) {
          throw new Error("Failed to fetch universities");
        }

        const data = await res.json();
        setUniversities(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Filter
  const filteredUniversities = universities.filter((u) => {
    return (
      (country === "All" || u.country === country) &&
      (intake === "All" || u.intake === intake)
    );
  });

  if (loading) {
    return <p className="text-center">Loading universities...</p>;
  }

  const token = localStorage.getItem("token"); // or studentToken

  const handleAdd = async (uni) => {
    try {
      const res = await fetch("/api/application/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          universityId: uni._id,
          course: uni.course,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Added to application");
    } catch (err) {
      console.error(err);
      alert("Failed to add");
    }
  };

  return (
    <div className="space-y-6 bg-blue-50">
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
            key={uni._id}
            className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
          >
            <div>
              {uni.logo && (
                <img
                  src={uni.logo}
                  alt={uni.name}
                  className="h-14 mb-4 object-contain"
                />
              )}

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
            </div>

            <button
              className="mt-6 w-full py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => handleAdd(uni)}
            >
              Add to Application
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Universities;
