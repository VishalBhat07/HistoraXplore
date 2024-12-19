import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css"; // Import external CSS file if needed for custom styles

const MapComponent = ({ height, width, output }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize the map
  useEffect(() => {
    const initMap = L.map("map").setView([20, 0], 2);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(initMap);

    setMap(initMap);

    return () => {
      if (map) map.remove();
    };
  }, []);

  // Handle map clicks
  useEffect(() => {
    if (map) {
      const handleMapClick = async (e) => {
        const { lat, lng } = e.latlng;
        console.log("Clicked coordinates:", { lat, lng });

        if (marker) {
          marker.setLatLng([lat, lng]);
        } else {
          const newMarker = L.marker([lat, lng]).addTo(map);
          setMarker(newMarker);
        }

        showLoadingPopup(marker);

        setLoading(true);
        try {
          const data = await fetchHistoricalData(lat, lng);
          setHistoricalData(data);
          updateMarkerPopup(marker, data);
          map.setView([lat, lng], 10);
          if (typeof output === "function") output({ lat, lng });
        } catch (error) {
          console.error("Error in map click handling:", error);
          showErrorPopup(marker);
        } finally {
          setLoading(false);
        }
      };

      map.on("click", handleMapClick);
      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [map, marker, output]);

  const fetchHistoricalData = async (lat, lng) => {
    const response = await fetch("http://localhost:3000/api/coordinates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lng, year: 2000 }),
    });

    if (!response.ok) throw new Error("Server response was not OK");
    return await response.json();
  };

  const showLoadingPopup = (marker) => {
    marker
      .bindPopup(
        `<div class="popup-loading">
        <div class="spinner"></div>
        Loading historical summary...
      </div>`
      )
      .openPopup();
  };

  const updateMarkerPopup = (marker, data) => {
    const popupContent = `
      <div class="popup-content">
        <h3>Historical Summary</h3>
        <p>${data.summaries}</p>
        <h4>Related Links:</h4>
        <ul>
          ${data.book_links.Open_Library.map(
            (link) => `<li><a href="${link}" target="_blank">${link}</a></li>`
          ).join("")}
        </ul>
      </div>
    `;
    marker.setPopupContent(popupContent);
  };

  const showErrorPopup = (marker) => {
    marker.setPopupContent(
      `<div class="popup-error">
        Failed to load data. Please try again.
      </div>`
    );
  };

  return (
    <div
      className="map-container flex gap-5"
      style={{ height: height || "500px", width: width || "100%" }}
    >
      <div id="map" className="map w-2/3 h-[500px] rounded-lg shadow-lg" />
      <div className="data-display w-1/3 p-5 bg-gray-50 rounded-lg shadow-lg flex flex-col gap-5">
        {loading ? (
          <div className="loading-message flex items-center justify-center text-gray-600">
            <div className="spinner w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mr-3" />
            Loading data...
          </div>
        ) : historicalData ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {`Historical Summary for ${new Date().getFullYear()}`}
            </h3>
            <p className="text-gray-700">{historicalData.summaries}</p>
            <h4 className="text-lg font-medium text-gray-600 mt-4">
              Related Links:
            </h4>
            <ul className="list-disc pl-5">
              {historicalData.book_links.Open_Library.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="skeleton-loader w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg" />
        )}
      </div>
    </div>
  );
};

export default MapComponent;
