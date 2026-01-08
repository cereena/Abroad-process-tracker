import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-orange-100 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl text-blue-800 font-bold">Study Abroad 🌍</h1>
      <ul className="flex text-blue-800 gap-6">
        <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
        <li><Link to="/about" className="hover:text-yellow-300">About</Link></li>
        <li><Link to="/courses" className="hover:text-yellow-300">Courses</Link></li>
        <li><Link to="/contact" className="hover:text-yellow-300">Contact</Link></li>
        <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
