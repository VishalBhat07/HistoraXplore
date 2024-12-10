import React, { useState } from "react";
import historyImage from "../../assets/history.jpeg";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    console.log(searchQuery);
    if (!searchQuery.trim()) {
      alert("Type something first !!");
      return;
    }
    try {
      const response = await fetch("https://example.com/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      console.log("Search Results:", data);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${historyImage})`,
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 md:p-20 rounded-lg shadow-xl max-w-5xl w-full">
        <div className="text-gray-800 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Journey Through Time: Discover the Stories That Shaped Us.
          </h1>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button
              onClick={() => navigate("/explore")}
              className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md transition-all"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-700 hover:bg-gray-800 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md transition-all"
            >
              Login
            </button>
          </div>
          <div className="relative w-full md:w-120">
            <input
              type="text"
              placeholder="Start exploring ..."
              className="text-gray-800 w-full p-4 text-lg border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute inset-y-0 right-4 flex items-center text-gray-500">
              <button onClick={handleSearch}>
                <i className="fas fa-search"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
