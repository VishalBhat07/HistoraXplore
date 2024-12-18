// import React, { useState } from "react";
// import { User, Globe, Award, BookOpen } from "lucide-react";

// const HistoryPeople = () => {
//   const [activeCategory, setActiveCategory] = useState("All");

//   // Hardcoded data for famous historical people
//   const historyPeople = [
//     {
//       category: "Leaders",
//       name: "Nelson Mandela",
//       era: "20th Century",
//       description:
//         "Anti-apartheid revolutionary and South Africa's first democratically elected president. He spent 27 years in prison and became a global symbol of peace and reconciliation.",
//       impact:
//         "Transformed South Africa's political landscape and fought against racial oppression.",
//       icon: <Globe className="w-10 h-10 text-blue-600" />,
//     },
//     {
//       category: "Scientists",
//       name: "Marie Curie",
//       era: "Late 19th/Early 20th Century",
//       description:
//         "Pioneering physicist and chemist who conducted groundbreaking research on radioactivity. First woman to win a Nobel Prize and the first person to win Nobel Prizes in two scientific fields.",
//       impact:
//         "Revolutionized our understanding of radiation and paved the way for cancer treatments.",
//       icon: <Award className="w-10 h-10 text-green-600" />,
//     },
//     {
//       category: "Artists",
//       name: "Frida Kahlo",
//       era: "20th Century",
//       description:
//         "Renowned Mexican painter known for her vibrant self-portraits and works inspired by nature and Mexican culture. She challenged traditional artistic and social norms.",
//       impact:
//         "Became an icon of feminism, indigenous Mexican culture, and artistic innovation.",
//       icon: <BookOpen className="w-10 h-10 text-purple-600" />,
//     },
//     {
//       category: "Leaders",
//       name: "Mahatma Gandhi",
//       era: "Early 20th Century",
//       description:
//         "Indian independence leader who pioneered non-violent civil disobedience. His philosophy of peaceful resistance inspired civil rights movements worldwide.",
//       impact:
//         "Led India to independence and influenced global peaceful protest movements.",
//       icon: <User className="w-10 h-10 text-red-600" />,
//     },
//     {
//       category: "Scientists",
//       name: "Alan Turing",
//       era: "20th Century",
//       description:
//         "Brilliant mathematician and computer scientist who was crucial in breaking the Nazi Enigma code during World War II and is considered a pioneer of computer science.",
//       impact:
//         "Fundamental to the development of modern computing and artificial intelligence.",
//       icon: <Award className="w-10 h-10 text-green-600" />,
//     },
//     {
//       category: "Artists",
//       name: "Leonardo da Vinci",
//       era: "Renaissance",
//       description:
//         "Polymath of the Renaissance, excelling in art, science, engineering, and anatomy. Created iconic works like the Mona Lisa and made groundbreaking scientific drawings.",
//       impact:
//         "Epitomized the Renaissance ideal of human potential and interdisciplinary knowledge.",
//       icon: <BookOpen className="w-10 h-10 text-purple-600" />,
//     },
//   ];

//   // Filter categories
//   const categories = [
//     "All",
//     ...new Set(historyPeople.map((person) => person.category)),
//   ];

//   // Filter people based on selected category
//   const filteredPeople =
//     activeCategory === "All"
//       ? historyPeople
//       : historyPeople.filter((person) => person.category === activeCategory);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-12">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Legends of History
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Discover the extraordinary individuals who shaped our world,
//             challenged boundaries, and inspired generations.
//           </p>
//         </div>

//         {/* Category Filters */}
//         <div className="flex justify-center mb-8 space-x-2">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
//               ${
//                 activeCategory === category
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* People Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredPeople.map((person, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
//             >
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   {person.icon}
//                   <div className="ml-4">
//                     <h3 className="text-xl font-bold text-gray-900">
//                       {person.name}
//                     </h3>
//                     <p className="text-sm text-gray-500">{person.era}</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 mb-4">{person.description}</p>
//                 <div className="border-t pt-4">
//                   <h4 className="font-semibold text-gray-800 mb-2">
//                     Historical Impact
//                   </h4>
//                   <p className="text-gray-600 text-sm">{person.impact}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoryPeople;
import React, { useState, useEffect } from "react";
import axios from "axios";

const HistoryPeople = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const month = today.getMonth() + 1; // Months are 0-indexed
      const day = today.getDate();

      try {
        const response = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`
        );

        // Filter and limit the data
        const filteredBirthdays = (response.data.births || [])
          .filter((person) => person.year < 1900) // Born before 1970
          .slice(0, 5); // Limit to 5 entries

        const filteredEvents = (response.data.events || [])
          .slice(0, 5); // Limit to 5 entries

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
    return <p>Loading data...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Today in History
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the lives and contributions of influential individuals born
            on this date and significant historical events that shaped our
            world.
          </p>
        </div>

        {/* Famous Birthdays Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Famous Birthdays</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {birthdays.map((person, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {person.text}
                </h3>
                <p className="text-gray-500 text-sm mb-4">Born in {person.year}</p>
                <p className="text-gray-700">
                  <strong>Contribution:</strong>{" "}
                  {person.pages[0]?.extract || "Details unavailable."}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Famous Historical Events Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Famous Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {event.year}
                </h3>
                <p className="text-gray-700">{event.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPeople;
