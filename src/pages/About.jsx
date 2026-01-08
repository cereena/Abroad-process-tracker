import React from "react";

function About() {
  return (
    <div className="bg-orange-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-800 text-orange-100 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Guiding students towards their dream of studying abroad with honesty,
          care, and professional expertise.
        </p>
      </section>

      {/* Who We Are */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Who We Are</h2>
        <p className="text-lg leading-relaxed mb-6">
          We are a passionate study-abroad consultancy dedicated to helping
          students unlock global opportunities. With years of experience in
          student counseling, documentation, and international admissions, we
          make the complex process of studying abroad simple and stress-free.
        </p>
        <p className="text-lg leading-relaxed">
          From choosing the right country and university to preparing documents,
          managing applications, and visa guidance — we support students at
          every step. Our goal is not just to send students abroad but to ensure
          they thrive academically, personally, and professionally.
        </p>
      </section>

      {/* Achievements / Stats Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-800">100+</h3>
            <p className="mt-2 text-lg">Students Guided</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-800">500+</h3>
            <p className="mt-2 text-lg">Applications Processed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-800">20+</h3>
            <p className="mt-2 text-lg">Countries Covered</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-800">50+</h3>
            <p className="mt-2 text-lg">Partner Universities</p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Mission</h2>
            <p className="leading-relaxed">
              To empower students with the right knowledge, guidance, and
              resources to pursue world-class education abroad. We strive to
              make global education accessible and affordable, while ensuring a
              transparent, student-first approach.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Vision</h2>
            <p className="leading-relaxed">
              To become a trusted global partner for students who dream of
              international education, known for our integrity, expertise, and
              commitment to student success.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">Integrity</h3>
            <p>We are honest, transparent, and student-focused in everything we do.</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">Excellence</h3>
            <p>We strive for the highest quality in guidance, documentation, and support.</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-bold text-xl mb-2">Empathy</h3>
            <p>We understand the dreams and challenges of students and guide them with care.</p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">What We Do</h2>
          <ul className="grid md:grid-cols-2 gap-6 list-disc list-inside text-lg">
            <li>Personalized counseling based on your goals, budget, and eligibility</li>
            <li>University and course selection across top study destinations</li>
            <li>Application guidance and step-by-step documentation support</li>
            <li>Visa file preparation, interview training, and mock sessions</li>
            <li>Pre-departure guidance and ongoing support after admission</li>
          </ul>
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center py-16 bg-blue-800 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Global Education Journey?
        </h2>
        <p className="mb-6">
          Let us help you take the first step towards your dream career abroad.
        </p>
        <button className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300">
          Get Started Today
        </button>
      </section>
    </div>
  );
}

export default About;
