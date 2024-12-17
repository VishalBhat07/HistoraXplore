import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ height, width, output }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

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
        try {
          const { lat, lng } = e.latlng;

          console.log("Clicked coordinates:", { lat, lng });

          const point = map?.latLngToContainerPoint([lat, lng]);
          console.log("Container point calculated:", point);

          setCardPosition({ x: point?.x || 0, y: point?.y || 0 });

          // Create or move marker and show loading animation
          if (marker) {
            marker.setLatLng([lat, lng]);
          } else {
            const newMarker = L.marker([lat, lng]).addTo(map);
            setMarker(newMarker);
          }

          marker
            .bindPopup(`<div style="text-align: center; font-weight: bold;">
                          <div class="spinner" style="margin-bottom: 5px;"></div>
                          Loading historical summary...
                        </div>`)
            .openPopup();

          // Spinner animation style
          const spinnerStyle = document.createElement("style");
          spinnerStyle.innerHTML = `
            .spinner {
              border: 4px solid rgba(255, 255, 255, 0.3);
              width: 24px;
              height: 24px;
              border-radius: 50%;
              border-top-color: #3498db;
              animation: spin 1s infinite linear;
              display: inline-block;
            }

            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `;
          document.head.appendChild(spinnerStyle);

          // Fetch data from the backend
          const response = await fetch("http://localhost:5000/api/coordinates", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat,
              lng,
              year: 2000, // Change dynamically if needed
            }),
          });

          console.log("Response from server:", response);

          if (!response.ok) {
            throw new Error("Server response was not OK");
          }

          const data = await response.json();
          console.log("Data received from server:", data);

          setHistoricalData(data);

          // Format popup content dynamically
          const popupContent = `
            <div style="max-width: 300px;">
              <h3 style="margin-bottom: 8px;">Historical Summary</h3>
              <p style="font-size: 14px;">${data.summaries}</p>
              <h4 style="margin-top: 10px;">Related Links:</h4>
              <ul style="padding-left: 18px;">
                ${data.book_links.Open_Library
                  .map(
                    (link) =>
                      `<li style="font-size: 12px;"><a href="${link}" target="_blank">${link}</a></li>`
                  )
                  .join("")}
              </ul>
            </div>
          `;

          // Update marker popup with the fetched data
          marker.setPopupContent(popupContent);

          // Set map view
          map.setView([lat, lng], 10);

          // Output coordinates if output function exists
          if (typeof output === "function") {
            output({ lat, lng });
          }
        } catch (error) {
          console.error("Error in map click handling:", error);

          // Show error message in the popup
          if (marker) {
            marker.setPopupContent(
              `<div style="color: red; text-align: center; font-weight: bold;">
                 Failed to load data. Please try again.
               </div>`
            );
          }
        }
      };

      // Add map click listener
      map.on("click", handleMapClick);

      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [map, marker, output]);

  return (
    <div
      style={{
        position: "relative",
        height: height || "500px",
        width: width || "100%",
        overflow: "hidden",
      }}
    >
      {/* Map container */}
      <div
        id="map"
        style={{
          height: "100%",
          width: "100%",
        }}
      />
        </div>
  );
};

export default MapComponent;
