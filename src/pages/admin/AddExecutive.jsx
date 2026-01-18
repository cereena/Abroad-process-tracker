import { useState } from "react";
import axios from "axios";

function AddExecutive() {
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
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
          }
        }
      );

      alert("Executive created successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create executive");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-[500px]">
      <h2 className="text-xl font-bold mb-4">Add Documentation Executive</h2>

      <input name="name" placeholder="Name" onChange={handleChange} className="input" />
      <input name="email" placeholder="Email" onChange={handleChange} className="input" />
      <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
      <input name="branch" placeholder="Branch" onChange={handleChange} className="input" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />

      <label className="block mt-3 font-medium">Countries handled</label>
      <select multiple onChange={handleCountries} className="w-full border p-2 rounded">
        <option value="UK">UK</option>
        <option value="Canada">Canada</option>
        <option value="Poland">Poland</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
        <option value="Ireland">Ireland</option>
      </select>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-700 text-white px-4 py-2 rounded"
      >
        Create Executive
      </button>
    </div>
  );
}

export default AddExecutive;
