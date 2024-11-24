import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="container mx-auto px-8 lg:px-32 grid grid-cols-1 md:grid-cols-2 gap-40">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-orange-400">
            About the Project
          </h3>
          <p className="text-sm text-gray-400">
            History Explore is a platform designed to bring the past to life.
            Discover historical events, famous figures, and untold stories that
            shaped the world.
          </p>
        </div>

        <div className="flex flex-row space-x-20">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-sm hover:text-orange-300 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm hover:text-orange-300 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#explore"
                  className="text-sm hover:text-orange-300 transition-colors"
                >
                  Explore
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm hover:text-orange-300 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Team Info</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <span className="text-orange-300">Vishal Bhat</span>
              </li>
              <li className="text-sm">
                <span className="text-orange-300">V S Sreenivaas</span>
              </li>
              <li className="text-sm">
                <span className="text-orange-300">Sushanth Joshi</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        <p>© 2024 History Explore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
