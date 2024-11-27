import React, { useState } from "react";
import ReactDOM from "react-dom";
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
        <div className="map-container">
          <Map height="100%" width="100%" output={handleLocation} />
        </div>
        <div className="search-container">
          {clickedLocation && (
            <div className="location">
              <h2>Clicked Location</h2>
              <p>Latitude: {clickedLocation.lat}</p>
              <p>Longitude: {clickedLocation.lng}</p>
            </div>
          )}
          <div className="year"><p>Selected Year: {selectedYear}</p></div>
          <button className="search-button">Search</button>
        </div>
      </div>
      <div className="timeline-container">
        <TimelineScroller minYear={1200} maxYear={2024} output={handleYear} />
      </div>
    </div>
  );
};

export default Explore;
