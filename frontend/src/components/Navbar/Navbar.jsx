import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="bg-orange-500 p-4 flex justify-between items-center border-black">
        <div className="font-bold text-5xl text-gray-950">Histora Xplore</div>
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/" className="text-gray-950 text-xl font-semibold px-4">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/explore"
              className="text-gray-950 text-xl font-semibold px-4"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to="/discuss"
              className="text-gray-950 text-xl font-semibold px-4"
            >
              Discuss
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-950 text-xl font-semibold px-4"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-950 text-xl font-semibold px-4"
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
