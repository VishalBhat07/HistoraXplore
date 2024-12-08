import React from "react";
import historyImage from "../../assets/history.jpeg";

function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-500 to-[#1c1c1c]">
      <div className="section-container min-h-screen flex flex-col md:flex-row gap-10 items-center justify-center">
        <div className="left-section text-white text-center md:text-left p-8 md:p-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Journey Through Time: Discover the Stories That Shaped Us.
          </h1>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button className="bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md transition-all">
              Get Started
            </button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md transition-all">
              Login
            </button>
          </div>
          <input
            type="text"
            placeholder="Start exploring ..."
            className="w-full md:w-120 p-4 text-lg border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
          />
        </div>
        <div className="right-section p-8 md:p-20">
          <img
            src={historyImage}
            alt="History Image"
            className="rounded-lg shadow-lg w-full md:w-[1500px] h-auto transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
