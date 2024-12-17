import React from "react";
import { useNavigate } from "react-router-dom";

// Import your images
import historyImage1 from "../../assets/history3.jpg";

const HistoryPeople = () => {
  const navigate = useNavigate();

  // Hardcoded data for famous historical places and people
  const historyData = [
    {
      title: "The Pyramids of Giza",
      description:
        "One of the Seven Wonders of the Ancient World, the Pyramids of Giza are a testament to the incredible architectural feats of ancient Egypt. These ancient tombs were built for the Pharaohs and have stood for thousands of years.",
      image: historyImage1,
      link: "/explore/pyramids-of-giza",
    },
    {
      title: "The Great Wall of China",
      description:
        "Stretching over 13,000 miles, the Great Wall of China is a marvel of ancient engineering. Originally built to protect against invasions, it is now a symbol of China's strength and endurance throughout history.",
      image: historyImage1,
      link: "/explore/great-wall-of-china",
    },
    {
      title: "Leonardo da Vinci",
      description:
        "Leonardo da Vinci was an Italian polymath of the Renaissance who made lasting contributions in fields such as art, science, engineering, and anatomy. His works, including 'Mona Lisa' and 'The Last Supper,' continue to influence the world today.",
      image: historyImage1,
      link: "/explore/leonardo-da-vinci",
    },
    {
      title: "The Colosseum",
      description:
        "The Colosseum in Rome, Italy, is an ancient amphitheater built in the 1st century AD. It was used for gladiatorial contests and public spectacles. Today, it is one of the most recognized symbols of Roman architectural and engineering prowess.",
      image: historyImage1,
      link: "/explore/colosseum",
    },
    {
      title: "Cleopatra",
      description:
        "Cleopatra VII was the last active ruler of the Ptolemaic Kingdom of Egypt. Known for her intelligence, beauty, and political acumen, she formed powerful alliances with Roman leaders such as Julius Caesar and Mark Antony.",
      image: historyImage1,
      link: "/explore/cleopatra",
    },
    {
      title: "Machu Picchu",
      description:
        "Machu Picchu is a 15th-century Inca citadel located in the Andes Mountains of Peru. It is one of the most well-preserved archaeological sites in South America and a UNESCO World Heritage site.",
      image: historyImage1, // You can replace this with another relevant image
      link: "/explore/machu-picchu",
    },
    {
      title: "Albert Einstein",
      description:
        "Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics. His famous equation, E=mc², revolutionized the understanding of energy and matter.",
      image: historyImage1, // Replace with a relevant image
      link: "/explore/albert-einstein",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-300 p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Famous Historical Places and People
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Explore the history of some of the world's most iconic places and
          individuals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {historyData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <button
                onClick={() => navigate(item.link)}
                className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPeople;
