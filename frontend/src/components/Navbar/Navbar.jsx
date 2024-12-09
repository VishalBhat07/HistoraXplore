import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="bg-black p-4 flex justify-between items-center border-black">
        {/* Updated logo color to orange */}
        <div className="font-bold text-5xl text-orange-500">Histora Xplore</div>
        <ul className="flex items-center space-x-4">
          {/* Added hover effect to the tabs */}
          <li>
            <Link
              to="/"
              className="text-white text-xl font-semibold px-4 hover:text-orange-500 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/explore"
              className="text-white text-xl font-semibold px-4 hover:text-orange-500 transition-colors"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to="/discuss"
              className="text-white text-xl font-semibold px-4 hover:text-orange-500 transition-colors"
            >
              Discuss
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white text-xl font-semibold px-4 hover:text-orange-500 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white text-xl font-semibold px-4 hover:text-orange-500 transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="w-full border-t border-black"></div>
    </header>
  );
};

export default Navbar;
