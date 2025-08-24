// src/pages/AnalysisPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { getWeeklyAnalyticsRoute, analysisRoute } from "../../utils/apiRoutes";

export default function AnalysisPage() {
  const [timeframe, setTimeframe] = useState("weekly");
  const [analysis, setAnalysis] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Mood Score",
        data: [],
        fill: false,
        borderColor: "#4F46E5",
        tension: 0.3,
      },
    ],
  });
  const [loading, setLoading] = useState(true); // initially true

  const fetchAnalysis = async () => {
    try {
      const res = await axios.get(
        getWeeklyAnalyticsRoute,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = res.data.data.map((e) => {
        const day = new Date(e.date).toLocaleDateString("en-US", {
          weekday: "short",
        });
        return { day, mood: e.mood };
      });

      setChartData({
        labels: data.map((e) => e.day),
        datasets: [
          {
            label: "Mood Score",
            data: data.map((e) => e.mood),
            fill: false,
            borderColor: "#4F46E5",
            backgroundColor: "rgba(79, 70, 229, 0.5)",
            tension: 0.3,
          },
        ],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchai = async () => {
    try {
      const res = await axios.get(analysisRoute, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAnalysis(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchAnalysis();
      await fetchai();
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    // ✅ Full page loading screen
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mood & Journal Analysis</h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm focus:ring focus:ring-indigo-300"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Mood Trend</h2>
        <Line data={chartData} />
      </div>

      {/* AI Summary Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">AI Insights</h2>
        {analysis ? (
          <p className="text-gray-700">{analysis}</p>
        ) : (
          <p className="text-gray-500 italic">
            No analysis available for this period.
          </p>
        )}
      </div>
    </div>
  );
}
