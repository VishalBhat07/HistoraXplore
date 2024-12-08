import React, { useState } from "react";
import "./Timeline.css";

const TimelineScroller = ({ minYear = 1900, maxYear = 2100, output }) => {
  const [year, setYear] = useState(minYear);

  const handleChange = (newYear) => {
    if (newYear < minYear || newYear > maxYear) return;
    setYear(newYear);

    if (typeof output === "function") {
      output(newYear);
    }
  };

  return (
    <div className="timeline-container">
      <div className="timeline-label">
        <label htmlFor="timeline-slider">Year:</label>
        <span className="year-display">{year}</span>
      </div>

      {/* Slider Input */}
      <input
        id="timeline-slider"
        type="range"
        min={minYear}
        max={maxYear}
        step={1}
        value={year}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="timeline-slider"
        aria-label="Year selection slider"
      />

      {/* Number Input */}
      <input
        type="number"
        min={minYear}
        max={maxYear}
        step={1}
        value={year}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="timeline-number-input"
        aria-label="Year selection number input"
      />
    </div>
  );
};

export default TimelineScroller;
