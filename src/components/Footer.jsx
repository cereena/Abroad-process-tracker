import React from "react";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 ">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">
            Study Abroad Consultancy
          </h2>
          <p className="text-sm leading-6">
            Guiding students to achieve their global education dreams with expert
            advice, personalized support, and trusted partnerships.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/services" className="hover:text-white">Services</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">Contact Us</h2>
          <p className="flex items-center gap-2 text-sm">
            <Phone size={16} /> +91 98765 43210
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Mail size={16} /> info@studyabroad.com
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-blue-500"><Facebook size={20} /></a>
            <a href="#" className="hover:text-pink-500"><Instagram size={20} /></a>
            <a href="#" className="hover:text-blue-400"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>© 2025 Study Abroad Consultancy. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
