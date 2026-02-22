import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const location = useLocation();
  const prefilledCountry = location.state?.country || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryPreference: prefilledCountry,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          status: "New Lead",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Your request has been sent. Our expert will contact you.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryPreference: "",
          message: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="bg-orange-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Have questions about studying abroad? We’re here to help you every step of the way.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Send Us a Message</h2>

          {/* 4. Added onSubmit and value/onChange to inputs */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-blue-900 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-semibold mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-semibold mb-2">
                Country Preference
              </label>

              <select
                name="countryPreference"
                required
                value={formData.countryPreference}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">-- Select a country --</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="UK">UK</option>
                <option value="USA">USA</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Poland">Poland</option>
                <option value="Ireland">Ireland</option>
                <option value="New Zealand">New Zealand</option>
              </select>
            </div>


            <div>
              <label className="block text-blue-900 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info (Remains the same) */}
        <div className="flex flex-col justify-center bg-gradient-to-r from-orange-50 to-blue-50 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Get in Touch</h2>
          <div className="space-y-6 text-lg">
            <div>
              <h4 className="font-semibold text-blue-900">Office Address</h4>
              <p className="text-gray-700">123 Main Road, Kochi, Kerala - 682001</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Phone</h4>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Our Location</h2>
        <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="office-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.653355325881!2d76.270922315354!3d9.962725992876618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d08f976f3a9%3A0x138290f653a99e74!2sMarine%20Drive%2C%20Ernakulam%2C%20Kochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1625648564721!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;

