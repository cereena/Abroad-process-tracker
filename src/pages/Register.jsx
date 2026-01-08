import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    enquiryId: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/student/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Student Registration
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="branch"
            placeholder="Branch (optional)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="enquiryId"
            placeholder="Enquiry ID"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button className="w-full py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already registered?{" "}
          <Link to="/login" className="text-orange-600 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
