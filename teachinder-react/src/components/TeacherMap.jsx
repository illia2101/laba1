import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function TeacherMap({ latitude, longitude }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const lat = Number(latitude);
    const lng = Number(longitude);

    if (
      latitude == null ||
      longitude == null ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lng) ||
      !containerRef.current
    ) {
      return;
    }

    const map = L.map(containerRef.current).setView([lat, lng], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([lat, lng]).addTo(map);

    requestAnimationFrame(() => {
      map.invalidateSize();
    });

    return () => {
      map.remove();
    };
  }, [latitude, longitude]);

  return (
    <div
      ref={containerRef}
      className="teacher-map"
      style={{ width: "100%", height: "250px", minHeight: "250px" }}
    />
  );
}

export default TeacherMap;
