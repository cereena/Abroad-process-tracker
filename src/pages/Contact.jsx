import React from "react";

const Contact = () => {
  return (
    <div className="bg-orange-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Have questions about studying abroad? We’re here to help you every step of the way.
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-blue-900 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-semibold mb-2">Subject</label>
              <input
                type="text"
                placeholder="Eg: Admission Query"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-blue-900 font-semibold mb-2">Message</label>
              <textarea
                rows="5"
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

        {/* Contact Info */}
        {/* Contact Info */}
        <div className="flex flex-col justify-center bg-gradient-to-r from-orange-50 to-blue-50 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Get in Touch</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            Whether you are a student planning your higher studies abroad or a parent looking for the best guidance for your child, we are here to support you.
          </p>

          <div className="space-y-6 text-lg">
            <div>
              <h4 className="font-semibold text-blue-900">Office Address</h4>
              <p className="text-gray-700">
                Study Abroad Consultancy Pvt. Ltd. <br />
                123 Main Road, Marine Drive, Kochi, Kerala - 682001 <br />
                India
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-blue-900">Phone</h4>
              <p className="text-gray-700">
                +91 98765 43210 <br />
                +91 99876 54321 (Student Helpline)
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-blue-900">Email</h4>
              <p className="text-gray-700">
                info@studyabroad.com <br />
                admissions@studyabroad.com
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-blue-900">Working Hours</h4>
              <p className="text-gray-700">
                Monday – Friday: 9:00 AM – 6:00 PM <br />
                Saturday: 9:00 AM – 1:00 PM <br />
                Sunday: Closed
              </p>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.23819584856!2d75.7804!3d9.9391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08730c6a3dbf41%3A0x7d39b5a1e6b1d9b2!2sKochi!5e0!3m2!1sen!2sin!4v1696500000000!5m2!1sen!2sin"
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

