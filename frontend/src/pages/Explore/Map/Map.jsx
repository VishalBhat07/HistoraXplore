// import React, { useState, useEffect } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const MapComponent = ({ height, width, output }) => {
//   const [map, setMap] = useState(null);
//   const [marker, setMarker] = useState(null);

//   useEffect(() => {
//     // Initialize the map with a whole-world view
//     const initMap = L.map("map").setView([20, 0], 2); // Center at the equator, zoom level 2
//     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 100,
//       attribution:
//         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     }).addTo(initMap);

//     setMap(initMap);

//     return () => {
//       initMap.remove(); // Cleanup the map instance on unmount
//     };
//   }, []);

//   useEffect(() => {
//     if (map) {
//       // Define the map click handler
//       const handleMapClick = async(e) => {
//         const { lat, lng } = e.latlng;
//         const response = await fetch('/api/coordinates', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ lat, lng })
//         });
    
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
    
//         const data = await response.json();
//         console.log('Server response:', data);
//         // Update the output prop with the clicked location
//         if (typeof output === "function") {
//           output({ lat, lng });
//         }

//         // If a marker already exists, move it; otherwise, create a new marker
//         if (marker) {
//           marker.setLatLng([lat, lng]); // Move existing marker
//         } else {
//           const newMarker = L.marker([lat, lng]).addTo(map);
//           setMarker(newMarker); // Store the new marker
//         }

//         // Zoom into the clicked location
//         map.setView([lat, lng], 10); // Zoom level 10
//       };

//       // Attach the event listener
//       map.on("click", handleMapClick);

//       // Cleanup the event listener on unmount or map update
//       return () => {
//         map.off("click", handleMapClick);
//       };
//     }
//   }, [map, marker, output]);

//   return (
//     <div
//       id="map"
//       style={{
//         height: height || "500px",
//         width: width || "100%",
//       }}
//     />
//   );
// };

//export default MapComponent;

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
