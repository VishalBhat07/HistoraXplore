import React from "react";
import historyImage from "../../assets/history.jpeg"; // Ensure the correct path to your image

function HeroSection() {
  return (
    <section
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${historyImage})`, // Use the local image as background
      }}
    >
      <div className="flex justify-end">
        <div className="mt-20 md:mt-0 w-full md:w-1/2 py-40 px-10">
          <input
            type="text"
            placeholder="Start exploring ..."
            className="w-full p-4 text-lg border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
