import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import your images
import historyImage3 from "../../assets/history.jpeg";
import historyImage4 from "../../assets/history3.jpg";
import historyImage5 from "../../assets/history4.jpg";
import historyImage6 from "../../assets/history5.jpeg";
import historyImage7 from "../../assets/history6.jpg";

const HeroSection = () => {
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

  return (
    <div className="relative h-screen overflow-hidden">
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
      <div className="relative z-20 h-full flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-2xl text-center max-w-2xl w-full">
          <h1
            className="text-4xl font-bold mb-8 text-gray-900 
            animate-fade-in-down"
          >
            Uncover the Threads of History
          </h1>

          <p
            className="text-xl text-gray-700 mb-10 
            animate-fade-in-up delay-200"
          >
            Embark on a journey through time, exploring the stories, people, and
            moments that have shaped our world.
          </p>

          <div
            className="flex justify-center space-x-4 
            animate-fade-in-up delay-400"
          >
            <button
              onClick={() => navigate("/historypeople")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold 
              py-3 px-8 rounded-lg shadow-md transition-all duration-300 
              hover:scale-105 active:scale-95"
            >
              Explore History
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-700 hover:bg-gray-800 text-white text-lg font-semibold 
              py-3 px-8 rounded-lg shadow-md transition-all duration-300 
              hover:scale-105 active:scale-95"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
