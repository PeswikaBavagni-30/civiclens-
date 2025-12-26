import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function IssueAnalytics({ issues }) {
  const pendingCount = issues.filter(i => i.status === "pending").length;
  const resolvedCount = issues.filter(i => i.status === "resolved").length;

  const categoryCounts = {};
  issues.forEach(issue => {
    categoryCounts[issue.category] =
      (categoryCounts[issue.category] || 0) + 1;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
      {/* PIE CHART */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold text-center mb-4">
          Issues by Status
        </h3>
        <Pie
          data={{
            labels: ["Pending", "Resolved"],
            datasets: [
              {
                data: [pendingCount, resolvedCount],
                backgroundColor: ["#facc15", "#22c55e"],
              },
            ],
          }}
        />
      </div>

      {/* BAR CHART */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold text-center mb-4">
          Issues by Category
        </h3>
        <Bar
          data={{
            labels: Object.keys(categoryCounts),
            datasets: [
              {
                label: "Number of Issues",
                data: Object.values(categoryCounts),
                backgroundColor: "#3b82f6",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
