// src/pages/AnalysisPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { getWeeklyAnalyticsRoute } from "../../utils/apiRoutes";


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
  const [loading, setLoading] = useState(false);

  // Fetch data when timeframe changes
  

  const fetchAnalysis = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        getWeeklyAnalyticsRoute, 
        {withCredentials: true},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      // console.log(res.data)

      const data = res.data.data.map(e => {
        const day = new Date(e.date).toLocaleDateString("en-US", { weekday: "short" });
        return { day, mood: e.mood };
      });

      console.log(data)
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


      // setChartData({
      //   labels: res.data.labels,
      //   datasets: [
      //     {
      //       label: "Mood Score",
      //       data: res.data.moodScores,
      //       fill: false,
      //       borderColor: "#4F46E5",
      //       tension: 0.3,
      //     },
      //   ],
      // });

      // setAnalysis(res.data.aiSummary);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

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
        {loading ? (
          <p className="text-gray-500">Loading chart...</p>
        ) : (
          <Line data={chartData} />
        )}
      </div>

      {/* AI Summary Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">AI Insights</h2>
        {loading ? (
          <p className="text-gray-500">Generating analysis...</p>
        ) : analysis ? (
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
