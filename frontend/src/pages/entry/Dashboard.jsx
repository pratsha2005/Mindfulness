import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">MindTrack</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600">
            Add Today's Entry
          </button>
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User Profile"
              className="w-10 h-10 rounded-full border"
            />
            <button className="text-red-500 hover:underline">Logout</button>
          </div>
        </div>
      </header>

      {/* Positive Prompt */}
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-6">
          🌞 Start your day with positivity and mindfulness!
        </h2>

        {/* Last 5 Entries Section */}
        <section className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Your Last 5 Entries</h3>
          <div className="space-y-3">
            {/* Map fetched entries here */}
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between">
                  <span className="font-medium">2025-08-0{idx + 1}</span>
                  <span className="text-yellow-500">Mood: {Math.floor(Math.random() * 5) + 1}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  This is a sample journal preview text...
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
