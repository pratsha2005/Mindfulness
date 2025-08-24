import React, { useState, useEffect } from "react";
import { getAllEntriesRoute, positiveRoute, logoutRoute } from "../../utils/apiRoutes";
import axios from "axios";
import { ReactTyped } from "react-typed";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [positive, setPositive] = useState("");
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const getEntries = async () => {
    try {
      // ✅ Check cache first
      // 
      

      const token = localStorage.getItem("token");
      const res = await axios.get(getAllEntriesRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEntries(res.data.data);

      // ✅ Save to cache
      localStorage.setItem("entries", JSON.stringify(res.data.data));
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const navigate = useNavigate()

  const handleLogout = async() => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(logoutRoute, {}, {
        withCredentials: true
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      localStorage.removeItem('token')
      localStorage.removeItem('entries')
      localStorage.removeItem('positivePrompt')

      navigate('/')


      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  const positivePrompt = async () => {
    try {
      // ✅ Check cache first
      const cachedPositive = localStorage.getItem("positivePrompt");
      if (cachedPositive) {
        setPositive(cachedPositive);
        setLoading(false);
        return; // stop API call if cached
      }

      const res = await axios.get(positiveRoute, { withCredentials: true });
      setPositive(res.data.message);

      // ✅ Save to cache
      localStorage.setItem("positivePrompt", res.data.message);
    } catch (error) {
      console.error("Error fetching positive prompt:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
  

  // const cachedEntries = localStorage.getItem("entries");
  // if (cachedEntries) {
  //   setEntries(JSON.parse(cachedEntries));
  // } else {
    getEntries();
  // }
  
  positivePrompt();
}, []);


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
          <h1 className="text-6xl font-bold text-indigo-600">Dashboard</h1>
          <button
  onClick={handleLogout}
  className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
>
  Log Out
</button>

        </header>

        {/* Positive Prompt */}
        <main className="p-6 flex-1 flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold text-purple-600 text-center">
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
          {/* Last 5 Entries */}
<section className="bg-white shadow rounded-lg p-4 w-full max-w-5xl">
  <h3 className="text-lg font-semibold mb-4">Your Last 5 Entries</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {entries.length > 0 ? (
  entries.slice(0, 5).map((entry, idx) => {
    const formattedDate = entry.date
      ? new Date(entry.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Unknown Date";

    return (
      <div
        key={idx}
        className="border rounded-xl p-4 shadow-md bg-purple-50 hover:shadow-lg hover:bg-purple-100 transition-all duration-200 flex flex-col justify-between"
        style={{ height: "200px" }}
      >
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-purple-700">
              {formattedDate}
            </span>
            <span className="text-yellow-600 font-medium">
              Mood: {entry.mood || "N/A"}
            </span>
          </div>
          <p className="text-gray-700 text-2xl font-bold">
            {entry.journalText?.slice(0, 60) || "No preview available"}...
          </p>
        </div>
      </div>
    );
  })
) : (
  <p className="text-gray-500">No entries found.</p>
)}

  </div>
</section>

        </main>
      </div>
    </div>
  );
}
