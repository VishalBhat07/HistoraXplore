import React, { useState } from "react";

const TimelineScroller = ({ minYear = 1900, maxYear = 2100, output }) => {
  const [year, setYear] = useState(minYear);

  // Handle slider or input value change
  const handleChange = (newYear) => {
    if (newYear < minYear || newYear > maxYear) return; // Ensure year stays in range
    setYear(newYear);

    // Update the output prop if it's a function
    if (typeof output === "function") {
      output(newYear);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width:"100%" }}>
      <label htmlFor="timeline-slider" >
        Year: 
      </label>

      {/* Slider input */}
      <input
        id="timeline-slider"
        type="range"
        min={minYear}
        max={maxYear}
        step={1} // Prevent decimals
        value={year}
        onChange={(e) => handleChange(Number(e.target.value))}
        style={{ width: "100%", marginBottom: "8px" }}
      />

      {/* Number input */}
      <input
        type="number"
        min={minYear}
        max={maxYear}
        step={1} // Prevent decimals
        value={year}
        onChange={(e) => handleChange(Number(e.target.value))}
        style={{ width: "100px", textAlign: "center" }}
      />
    </div>
  );
};

export default TimelineScroller;
