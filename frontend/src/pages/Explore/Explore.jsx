import React, { useState } from "react";
import Map from "./Map/Map";
import TimelineScroller from "./Timeline/Timeline";
import "./Explore.css";

const Explore = () => {
  const [clickedLocation, setClickedLocation] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleLocation = (location) => {
    setClickedLocation(location);
  };

  const handleYear = (year) => {
    setSelectedYear(year);
  }; 
  
  return (
    <div className="explore">
      <div className="map-search-container">
        {/* Map Section */}
        <div className="map-container shadow-lg">
          <Map height="100%" width="100%" output={handleLocation} />
        </div>

        {/* Search Sidebar */}
        <div className="search-container">
          <div className="info-section">
            {clickedLocation ? (
              <div className="location">
                <h2>Clicked Location</h2>
                <p>Latitude: {clickedLocation.lat}</p>
                <p>Longitude: {clickedLocation.lng}</p>
              </div>
            ) : (
              <p className="placeholder">Select a location on the map</p>
            )}

            <div className="year">
              <p>
                <strong>Selected Year:</strong> {selectedYear || "None"}
              </p>
            </div>
          </div>
          <button className="search-button">Search</button>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-container">
        <TimelineScroller minYear={1200} maxYear={2024} output={handleYear} />
      </div>
    </div>
  );
};

export default Explore;
