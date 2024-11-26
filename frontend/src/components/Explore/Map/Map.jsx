import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ height, width, output }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Initialize the map with a whole-world view
    const initMap = L.map("map").setView([20, 0], 2); // Center at the equator, zoom level 2
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 100,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(initMap);

    setMap(initMap);

    return () => {
      initMap.remove(); // Cleanup the map instance on unmount
    };
  }, []);

  useEffect(() => {
    if (map) {
      // Define the map click handler
      const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;

        // Update the output prop with the clicked location
        if (typeof output === "function") {
          output({ lat, lng });
        }

        // If a marker already exists, move it; otherwise, create a new marker
        if (marker) {
          marker.setLatLng([lat, lng]); // Move existing marker
        } else {
          const newMarker = L.marker([lat, lng]).addTo(map);
          setMarker(newMarker); // Store the new marker
        }

        // Zoom into the clicked location
        map.setView([lat, lng], 10); // Zoom level 10
      };

      // Attach the event listener
      map.on("click", handleMapClick);

      // Cleanup the event listener on unmount or map update
      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [map, marker, output]);

  return (
    <div
      id="map"
      style={{
        height: height || "500px",
        width: width || "100%",
      }}
    />
  );
};

export default MapComponent;
