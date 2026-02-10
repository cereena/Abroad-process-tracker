import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional (for icons)

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#fff3d6] shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-800">
          Study Abroad 🌍
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-blue-800 font-medium">

          <li>
            <Link to="/" className="hover:text-yellow-500 transition">
              Home
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-yellow-500 transition">
              About
            </Link>
          </li>

          <li>
            <Link to="/courses" className="hover:text-yellow-500 transition">
              Courses
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-yellow-500 transition">
              Contact
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </li>

        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-blue-800 text-2xl"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-orange-50 px-6 pb-4">

          <ul className="flex flex-col gap-4 text-blue-800 font-medium">

            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>

            <li>
              <Link to="/courses" onClick={() => setIsOpen(false)}>
                Courses
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-center"
              >
                Login
              </Link>
            </li>

          </ul>

        </div>
      )}
    </nav>
  );
}

export default Navbar;
