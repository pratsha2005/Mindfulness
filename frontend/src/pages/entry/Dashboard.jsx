import React, { useState, useEffect } from "react";
import { positiveRoute } from "../../utils/apiRoutes";
import axios from "axios";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [positive, setPositive] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Loading state
  
  // Fetch positive prompt
  useEffect(() => {
    const positivePrompt = async () => {
      try {
        const res = await axios.get(positiveRoute, { withCredentials: true });
        setPositive(res.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // ✅ Stop loading when done
      }
    };
    positivePrompt();
  }, []);

  // ✅ Loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-purple-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-purple-700 font-semibold text-lg">
            Loading your positive vibes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="bg-white shadow-lg w-64">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-purple-700">MindTrack</h2>
          </div>
          <nav className="p-4 space-y-4 flex-1">
            <Link
              to="/add-entry"
              className="block p-2 rounded-lg hover:bg-purple-100 text-purple-700 font-medium"
            >
              ➕ Add Entry
            </Link>
            <Link
              to="/analysis"
              className="block p-2 rounded-lg hover:bg-purple-100 text-purple-700 font-medium"
            >
              📅 Weekly Analysis
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600">
              Add Today's Entry
            </button>
            <img
              src="https://via.placeholder.com/40"
              alt="User Profile"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Positive Prompt */}
        <main className="p-6 flex-1">
          <h1 className="text-4xl font-bold mb-6 text-purple-600">
            {positive && (
              <ReactTyped
                strings={[positive]}
                typeSpeed={50}
                backSpeed={30}
                showCursor={true}
                cursorChar="|"
                loop={false}
              />
            )}
          </h1>

          {/* Last 5 Entries */}
          <section className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Your Last 5 Entries</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="border rounded-xl p-4 shadow-md bg-purple-50 hover:shadow-lg hover:bg-purple-100 transition-all duration-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-purple-700">
                      2025-08-0{idx + 1}
                    </span>
                    <span className="text-yellow-600 font-medium">
                      Mood: {Math.floor(Math.random() * 5) + 1}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    This is a sample journal preview text for entry {idx + 1}...
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
