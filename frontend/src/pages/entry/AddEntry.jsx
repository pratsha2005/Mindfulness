import React, { useState } from "react";

export default function AddEntry() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Replace with Axios POST request
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
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
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
