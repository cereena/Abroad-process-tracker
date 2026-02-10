import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const [role, setRole] = useState("student");

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url =
        role === "student"
          ? "http://localhost:5000/api/student/login"
          : role === "admin"
            ? "http://localhost:5000/api/admin/login"
            : "http://localhost:5000/api/doc/login";

      const { data } = await axios.post(url, { email, password });
      console.log("Login response:", data);

      // Student
      if (role === "student") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "student");
        navigate("/student/my-profile");
      }

      // Admin
      if (role === "admin") {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      }

      // Documentation Executive
      if (role === "DocExecutive") {
        localStorage.setItem("docToken", data.token);
        navigate("/docExecutive/dashboard");
      }

      alert("Login successful");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="DocExecutive">Documentation Executive</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button className="w-full py-3 bg-blue-700 text-white font-semibold rounded-lg">
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link to="/forgot-password" className="text-blue-700 font-semibold">
            Forgot Password?
          </Link>
        </div>

        <p className="mt-4 text-center text-sm">
          {role === "student" && (
            <>
              New student?{" "}
              <Link to="/register" className="text-orange-600 font-semibold">
                Register
              </Link>
            </>
          )}
        </p>

      </div>
    </div>
  );
};

export default Login;
