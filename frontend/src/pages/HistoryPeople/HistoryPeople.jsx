import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const HistoryPeople = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      try {
        const response = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`
        );

        const filteredBirthdays = (response.data.births || [])
          .filter((person) => person.year < 1900)
          .slice(0, 5);

        const filteredEvents = (response.data.events || []).slice(0, 10);

        setBirthdays(filteredBirthdays);
        setEvents(filteredEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Wikipedia data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-purple-100"
      >
        <motion.p
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            repeatType: "reverse",
          }}
          className="text-2xl font-semibold text-indigo-700"
        >
          Exploring History...
        </motion.p>
      </motion.div>
    );
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCard(null);
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 120,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 md:p-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Today in History
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the lives and contributions of influential individuals born
            on this date and significant historical events that shaped our
            world.
          </p>
        </motion.div>

        {/* Famous Birthdays Section */}
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl font-bold text-orange-500 mb-6"
        >
          Famous Birthdays
        </motion.h2>
        <motion.div
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {birthdays.map((person, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="cursor-pointer"
              onClick={() => handleCardClick(person)}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-xl font-bold text-indigo-900 mb-2">
                  {person.text}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Born in {person.year}
                </p>
                <p className="text-gray-700 line-clamp-3">
                  {person.pages[0]?.extract || "Details unavailable."}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Famous Historical Events Section */}
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl font-bold text-orange-500 mb-6"
        >
          Famous Events
        </motion.h2>
        <motion.div
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="cursor-pointer"
              onClick={() => handleCardClick(event)}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <h3 className="text-xl font-bold text-indigo-900 mb-2">
                  {event.year}
                </h3>
                <p className="text-gray-700 line-clamp-3">{event.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl"
              >
                &times;
              </button>
              <h3 className="text-3xl font-bold text-indigo-900 mb-4">
                {selectedCard.text || selectedCard.year}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                {selectedCard.pages
                  ? selectedCard.pages[0]?.extract || "Details unavailable."
                  : selectedCard.text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HistoryPeople;
