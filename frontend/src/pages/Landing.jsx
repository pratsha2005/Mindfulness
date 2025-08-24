// src/pages/LandingPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">MindTrack</h1>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <a href="#features" className="text-gray-700 hover:text-indigo-600">
                Features
              </a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600">
                Contact
              </a>
              <Link to={"/login"} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
                Get Started
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 focus:outline-none"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white px-4 pt-2 pb-3 space-y-1 shadow">
            <a href="#features" className="block text-gray-700 hover:text-indigo-600">
              Features
            </a>
            <a href="#about" className="block text-gray-700 hover:text-indigo-600">
              About
            </a>
            <a href="#contact" className="block text-gray-700 hover:text-indigo-600">
              Contact
            </a>
            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="bg-indigo-600 flex-1">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Track Your Mind, Improve Your Life
          </h2>
          <p className="mt-4 text-lg text-white">
            MindTrack helps you log your moods, reflect with AI insights, and
            discover patterns that improve your mental wellbeing.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link to = {"/login"} className="px-6 py-3 bg-white text-black rounded-lg shadow hover:bg-indigo-700 transition">
              Get Started
            </Link>
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-indigo-50 rounded-md shadow text-center border border-black min-h-56 flex flex-col justify-center">
  <h4 className="text-xl font-semibold mb-2">Daily Check-ins</h4>
  <p className="text-gray-600">
    Log your moods and thoughts daily to build self-awareness.
  </p>
</div>


            <div className="p-6 bg-indigo-50 rounded-md shadow text-center border border-indigo min-h-56 flex flex-col justify-center">
              <h4 className="text-xl font-semibold mb-2">AI Insights</h4>
              <p className="text-gray-600">
                Get personalized AI summaries of your emotional trends.
              </p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-md shadow text-center border border-indigo min-h-56 flex flex-col justify-center">
              <h4 className="text-xl font-semibold mb-2">Analytics</h4>
              <p className="text-gray-600">
                Visualize your mood patterns weekly and monthly with charts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-white italic">
            “Mental health app for every moment.”
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">About MindTrack</h3>
          <p className="text-lg text-gray-600">
            MindTrack was built to empower individuals to take control of their
            mental health. By combining journaling, mood tracking, and AI-driven
            insights, we make self-care more accessible and effective.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2">© {new Date().getFullYear()} MindTrack. All rights reserved.</p>
          <p>
            Built with ❤️ to support your mental wellbeing.
          </p>
        </div>
      </footer>
    </div>
  );
}
