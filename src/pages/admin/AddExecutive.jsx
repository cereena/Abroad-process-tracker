import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AddExecutive() {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    password: "",
    countriesHandled: []
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCountries = (e) => {
    const values = Array.from(e.target.selectedOptions, o => o.value);
    setForm({ ...form, countriesHandled: values });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/doc-executives/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      );
      alert("Executive created successfully");
      navigate("/admin/docs-team");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create executive");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 sm:p-8">

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-blue-900 mb-1">
          Add Documentation Executive
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Fill in the details to create a new documentation executive
        </p>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="branch"
            placeholder="Branch (Eg: Kochi)"
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Temporary Password"
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none sm:col-span-2"
          />
        </div>

        {/* COUNTRIES */}
        <div className="mt-5">
          <label className="block mb-2 font-medium text-blue-900">
            Countries Handled
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["UK", "Canada", "Poland", "Germany", "France", "Ireland"].map(
              (country) => (
                <label
                  key={country}
                  className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    value={country}
                    checked={form.countriesHandled.includes(country)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          countriesHandled: [...form.countriesHandled, country]
                        });
                      } else {
                        setForm({
                          ...form,
                          countriesHandled: form.countriesHandled.filter(
                            (c) => c !== country
                          )
                        });
                      }
                    }}
                    className="accent-blue-600"
                  />
                  <span className="text-sm">{country}</span>
                </label>
              )
            )}
          </div>
        </div>


        {/* ACTION */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Create Executive
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddExecutive;
