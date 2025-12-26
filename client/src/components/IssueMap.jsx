import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* -------- CUSTOM MARKER ICONS -------- */

// Pending Issue → Yellow
const pendingIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Resolved Issue → Green
const resolvedIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function IssueMap({ issues }) {
  return (
    <MapContainer
      center={[17.385, 78.4867]} // Default center (Hyderabad)
      zoom={12}
      style={{ height: "400px", width: "100%" }}
      className="rounded shadow mb-6"
    >
      {/* -------- MAP TILES -------- */}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* -------- ISSUE MARKERS -------- */}
      {issues.map((issue) => {
        if (!issue.location) return null;

        return (
          <Marker
            key={issue._id}
            position={[issue.location.lat, issue.location.lng]}
            icon={issue.status === "resolved" ? resolvedIcon : pendingIcon}
          >
            <Popup>
              <div style={{ minWidth: "200px" }}>
                <h3 style={{ fontWeight: "bold", marginBottom: "4px" }}>
                  {issue.title}
                </h3>
                <p style={{ fontSize: "14px", marginBottom: "4px" }}>
                  {issue.description}
                </p>
                <p style={{ fontSize: "13px" }}>
                  <b>Category:</b> {issue.category}
                </p>
                <p style={{ fontSize: "13px" }}>
                  <b>Status:</b>{" "}
                  <span
                    style={{
                      color:
                        issue.status === "resolved" ? "green" : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {issue.status}
                  </span>
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
