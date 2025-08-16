import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addEntryRoute, getAllEntriesRoute } from "../../utils/apiRoutes";
import axios from "axios";



export default function AddEntry() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    mood: "",
    journalText: "",
    activities: [],
    sleepHours: "",
    waterIntake: "",
  });

  const activitiesList = [
    "exercise",
    "work",
    "study",
    "read",
    "meditation",
    "socialize",
    "music",
    "nature",
    "screenTime",
    "rest",
  ];

  // const getEntries = async () => {
  //   try {
  //     // ✅ Check cache first
  //     const cachedEntries = localStorage.getItem("entries");
  //     if (cachedEntries) {
  //       setEntries(JSON.parse(cachedEntries));
  //       return;
  //     }

  //     const token = localStorage.getItem("token");
  //     const res = await axios.get(getAllEntriesRoute, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setEntries(res.data.data);

  //     // ✅ Save to cache
  //     localStorage.setItem("entries", JSON.stringify(res.data.data));
  //   } catch (error) {
  //     console.error("Error fetching entries:", error);
  //   }
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (activity) => {
    setForm((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        addEntryRoute,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // getEntries()
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
            <p className="mt-3 text-lg text-indigo-600 font-medium">Saving entry...</p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="bg-white shadow-lg w-64 border-r border-black">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <Link to="/dashboard" className="text-xl font-bold text-purple-700">
              MindTrack
            </Link>
          </div>
          <nav className="p-4 space-y-4 flex-1">
            <Link
              to="/add-entry"
              className="block p-2 rounded-lg bg-purple-100 text-purple-700 font-medium"
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
        <header className="bg-white shadow-sm p-4 flex justify-center items-center relative">
          <h1 className="text-6xl font-bold text-indigo-600">Add Entry</h1>
          <img
            src="https://via.placeholder.com/40"
            alt="User Profile"
            className="w-10 h-10 rounded-full border absolute right-4"
          />
        </header>

        {/* Form */}
        <main className="p-6 flex-1 flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-6 text-indigo-600">
              Add Today’s Journal Entry
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mood */}
              <div>
                <label className="block font-medium mb-1">Mood (1-5)</label>
                <input
                  type="number"
                  name="mood"
                  value={form.mood}
                  min="1"
                  max="5"
                  onChange={handleChange}
                  required
                  className="border p-2 w-full rounded-md"
                />
              </div>

              {/* Journal Text */}
              <div>
                <label className="block font-medium mb-1">Journal Text</label>
                <textarea
                  name="journalText"
                  value={form.journalText}
                  onChange={handleChange}
                  placeholder="How was your day?"
                  rows="4"
                  className="border p-2 w-full rounded-md"
                />
              </div>

              {/* Activities */}
              <div>
                <label className="block font-medium mb-2">Activities</label>
                <div className="grid grid-cols-2 gap-2">
                  {activitiesList.map((activity) => (
                    <label key={activity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={form.activities.includes(activity)}
                        onChange={() => handleCheckboxChange(activity)}
                      />
                      <span>{activity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sleep Hours */}
              <div>
                <label className="block font-medium mb-1">Sleep Hours</label>
                <input
                  type="number"
                  name="sleepHours"
                  value={form.sleepHours}
                  min="0"
                  max="24"
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>

              {/* Water Intake */}
              <div>
                <label className="block font-medium mb-1">Water Intake (Liters)</label>
                <input
                  type="number"
                  name="waterIntake"
                  value={form.waterIntake}
                  min="0"
                  max="10"
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 disabled:opacity-50"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
