import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import your images
import historyImage3 from "../../assets/history.jpeg";
import historyImage4 from "../../assets/history3.jpg";
import historyImage5 from "../../assets/history4.jpg";
import historyImage6 from "../../assets/history5.jpeg";
import historyImage7 from "../../assets/history6.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const images = [
    historyImage3,
    historyImage4,
    historyImage5,
    historyImage6,
    historyImage7,
  ];

  // Automatic image change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
        animate-gradient-x opacity-50"
      />

      {/* Image Carousel with Tailwind Animations */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out 
            ${
              currentImage === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              zIndex: currentImage === index ? 10 : 0,
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-70 p-8 md:p-20 rounded-lg shadow-xl max-w-5xl w-full">
          <div className="text-gray-800 text-center md:text-left">
            <h1
              className="text-3xl md:text-5xl font-bold mb-6 
              animate-fade-in-down"
            >
              Journey Through Time: Discover the Stories That Shaped Us.
            </h1>

            <div
              className="flex flex-col md:flex-row gap-4 mb-6 
              animate-fade-in-up delay-200"
            >
              <button
                onClick={() => navigate("/explore")}
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md 
                transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-gray-700 hover:bg-gray-800 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md 
                transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Login
              </button>
            </div>

            <div
              className="relative w-full md:w-120 
              animate-fade-in-up delay-400"
            >
              <input
                type="text"
                placeholder="Start exploring ..."
                className="text-gray-800 w-full p-4 text-lg border-2 border-blue-300 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg 
                transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-gray-500">
                <button
                  onClick={handleSearch}
                  className="hover:scale-110 transition-transform duration-300"
                >
                  <i className="fas fa-search"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
