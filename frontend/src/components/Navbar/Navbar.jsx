import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header>
      <nav className="bg-orange-500 p-4 flex justify-between">
        <div className="font-bold text-5xl">Histora Xplore</div>
        <ul className="flex justify-center items-center space-x-8">
          <li>
            <Link to={"/"} className="text-grey-950 text-xl font-semibold p-5">
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/explore"}
              className="text-grey-950 text-xl font-semibold p-5"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to={"/discuss"}
              className="text-grey-950 text-xl font-semibold p-5"
            >
              Discuss
            </Link>
          </li>
          <li>
            <Link
              to={"/about"}
              className="text-grey-950 text-xl font-semibold p-5"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={"/contact"}
              className="text-grey-950 text-xl font-semibold p-5"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
