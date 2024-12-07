import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import InfoCards from "./InfoCards";

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
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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
  
          const response = await fetch("/api/coordinates", {
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
  
          if (marker) {
            marker.setLatLng([lat, lng]);
          } else {
            const newMarker = L.marker([lat, lng]).addTo(map);
            setMarker(newMarker);
          }
  
          map.setView([lat, lng], 10);
  
          if (typeof output === "function") {
            output({ lat, lng });
          }
        } catch (error) {
          console.error("Error in map click handling:", error);
        }
      };
  
      map.on("click", handleMapClick);
  
      return () => {
        map.off("click", handleMapClick);
      };
    }
  }, [map, marker, output]);

  return (
    <div style={{ position: "relative", height: height || "500px", width: width || "100%", overflow: "hidden" }}>
      {/* Map container */}
      <div
        id="map"
        style={{
          height: "100%",
          width: "100%",
        }}
      />

      {/* Conditional rendering for InfoCards */}
      {historicalData && (
        <div
          style={{
            position: "absolute",
            top: cardPosition.y,
            left: cardPosition.x,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none", // Allow map clicks even when InfoCards is rendered
          }}
        >
          <InfoCards data={historicalData} />
        </div>
      )}
    </div>
  );
};

export default MapComponent;
