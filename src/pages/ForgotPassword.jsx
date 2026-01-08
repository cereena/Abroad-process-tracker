import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("If this email exists, reset instructions will be sent.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your registered email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button className="w-full py-3 bg-blue-700 text-white font-semibold rounded-lg">
            Send Reset Link
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link to="/login" className="text-orange-600 font-semibold">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
