import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHistory, FaCompass, FaBook } from "react-icons/fa";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Animated Title */}
      <motion.h1
        className="text-5xl font-bold text-gray-900 mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Histora Xplorer
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg text-gray-700 text-center max-w-3xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Dive into the past and uncover the stories that shaped our present.
        Discover, learn, and connect with the threads of history.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <button
          onClick={() => navigate("/historypeople")}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95"
        >
          Explore History
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-700 hover:bg-gray-800 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95"
        >
          Login
        </button>
      </motion.div>

      {/* Dynamic Icons */}
      <motion.div
        className="flex space-x-8 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <motion.div
          className="text-blue-500 text-6xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FaHistory />
        </motion.div>
        <motion.div
          className="text-purple-500 text-6xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
        >
          <FaCompass />
        </motion.div>
        <motion.div
          className="text-pink-500 text-6xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
        >
          <FaBook />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
