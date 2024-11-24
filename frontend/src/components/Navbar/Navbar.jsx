import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav className="bg-orange-600 p-4 flex justify-between">
        <div className="font-bold text-5xl">Histora Xplore</div>
        <ul className="flex justify-center items-center space-x-8">
          <li>
            <a href="#home" className="text-grey-950 text-lg font-semibold p-5">
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-grey-950 text-lg font-semibold p-5"
            >
              Explore
            </a>
          </li>
          <li>
            <a
              href="#explore"
              className="text-grey-950 text-lg font-semibold p-5"
            >
              Discuss
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-grey-950 text-lg font-semibold p-5"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-grey-950 text-lg font-semibold p-5"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
