import React from "react";

function Home() {
  return (
    <div className="bg-orange-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center justify-end text-right h-[100vh] overflow-hidden">
        {/* BACKGROUND VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          // 'object-cover' forces the video to cover the area without distorting aspect ratio, 
          // reducing the "zoomed in" effect compared to min-w/min-h-full
          className="absolute z-0 w-full h-full object-cover"
        >
          <source src="/main_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* CONTENT - Wrapped in a div to ensure it stays on top of the video */}
        <div className="relative z-10 flex flex-col items-center max-w-lg mr-16 p-8 rounded-xl bg-white/70 backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-blue-800 mb-6 text-center">
            Start Your Global Education Journey
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Find the right country that fits your dreams and budget.
            Get expert guidance at every step of your abroad study journey.
          </p>
          <button className="bg-blue-800 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Expert Guidance</h3>
            <p className="text-gray-700">
              Get one-on-one counseling with experienced consultants who guide you through every step.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">20+ Countries</h3>
            <p className="text-gray-700">
              Choose from top destinations including UK, USA, Canada, Australia, Germany, and more.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">500+ Students</h3>
            <p className="text-gray-700">
              Trusted by hundreds of students who achieved their dream of studying abroad with us.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Courses/Destinations */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-10">Popular Destinations</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
              <h3 className="font-bold text-orange-600 text-xl">United Kingdom</h3>
              <p className="text-gray-600 mt-2">World-class universities & scholarships</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
              <h3 className="font-bold text-orange-600 text-xl">Canada</h3>
              <p className="text-gray-600 mt-2">Affordable education & PR opportunities</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
              <h3 className="font-bold text-orange-600 text-xl">Germany</h3>
              <p className="text-gray-600 mt-2">Top engineering & zero tuition fees</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
              <h3 className="font-bold text-orange-600 text-xl">Australia</h3>
              <p className="text-gray-600 mt-2">High employability & cultural diversity</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-bold text-orange-600 text-xl">Step 1</h3>
            <p className="text-gray-700 mt-2">Register and book your counseling session</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-bold text-orange-600 text-xl">Step 2</h3>
            <p className="text-gray-700 mt-2">Submit your documents for review</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-bold text-orange-600 text-xl">Step 3</h3>
            <p className="text-gray-700 mt-2">Get admission offer from top universities</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-bold text-orange-600 text-xl">Step 4</h3>
            <p className="text-gray-700 mt-2">Visa preparation & pre-departure guidance</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-blue-900 text-white text-center py-14">
        <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
        <p className="mb-6">
          Register today and take the first step toward your dream career abroad.
        </p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-400">
          Register Now
        </button>
      </section>
    </div>
  );
}

export default Home;
