import { useEffect, useState } from "react";
import { getAllIssues, createIssue } from "../services/issueService";
import api from "../services/api";

import IssueMap from "../components/IssueMap";
import IssueAnalytics from "../components/IssueAnalytics";
import MunicipalityPanel from "../components/MunicipalityPanel";

const role = localStorage.getItem("role");

export default function Issues() {
  // ---------------- STATE ----------------
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("all");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  // ---------------- FETCH ISSUES ----------------
  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const data = await getAllIssues();
      setIssues(data.issues);
    } catch (error) {
      alert("Failed to fetch issues");
    }
  };

  // ---------------- GPS LOCATION ----------------
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          reject("Location permission denied");
        }
      );
    });
  };

  // ---------------- CREATE ISSUE (USER ONLY) ----------------
  const handleCreateIssue = async () => {
    if (!title || !description || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      const location = await getCurrentLocation();

      await createIssue({
        title,
        description,
        category,
        image,
        location,
      });

      alert("Issue reported successfully");

      setTitle("");
      setDescription("");
      setCategory("");
      setImage(null);

      fetchIssues();
    } catch (error) {
      alert(error || "Failed to get location");
    }
  };

  // ---------------- ADMIN: RESOLVE ISSUE ----------------
  const handleResolve = async (id) => {
    try {
      await api.put(`/issues/${id}/status`, {
        status: "resolved",
      });

      alert("Issue marked as resolved");
      fetchIssues();
    } catch (error) {
      alert("Only admin can resolve issues");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-2">
        CivicLens – Issues Dashboard
      </h1>

      <p className="text-center text-gray-600 mb-6">
        Logged in as: <b>{role}</b>
      </p>

      {/* ================= USER ONLY ================= */}
      {role === "user" && (
        <>
          <MunicipalityPanel />

          <div className="bg-white p-6 rounded shadow mb-8 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Report an Issue</h2>

            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="Issue Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full mb-3 p-2 border rounded"
              placeholder="Issue Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="Category (Road, Garbage, Water...)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              className="w-full mb-4 p-2 border rounded"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button
              onClick={handleCreateIssue}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit Issue
            </button>
          </div>
        </>
      )}

      {/* ================= ADMIN DASHBOARD ================= */}
      {role === "admin" && (
        <>
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="font-bold">Total Issues</h3>
              <p className="text-xl">{issues.length}</p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="font-bold">Pending</h3>
              <p className="text-xl">
                {issues.filter(i => i.status === "pending").length}
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow text-center">
              <h3 className="font-bold">Resolved</h3>
              <p className="text-xl">
                {issues.filter(i => i.status === "resolved").length}
              </p>
            </div>
          </div>

          <IssueAnalytics issues={issues} />
          <IssueMap issues={issues} />
        </>
      )}

      {/* ================= ISSUE LIST ================= */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Reported Issues</h2>

          <select
            className="p-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {issues
          .filter(issue => filter === "all" || issue.status === filter)
          .map((issue) => (
            <div key={issue._id} className="border-b py-4">
              <h3 className="font-bold">{issue.title}</h3>
              <p>{issue.description}</p>

              {issue.image && (
                <img
                  src={`http://localhost:5000${issue.image}`}
                  alt="Issue"
                  className="mt-3 w-full max-h-64 object-cover rounded"
                />
              )}

              <span
                className={`inline-block px-2 py-1 mt-2 text-xs text-white rounded ${
                  issue.status === "resolved"
                    ? "bg-green-600"
                    : "bg-yellow-600"
                }`}
              >
                {issue.status}
              </span>

              {role === "admin" && issue.status !== "resolved" && (
                <button
                  onClick={() => handleResolve(issue._id)}
                  className="ml-3 bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
