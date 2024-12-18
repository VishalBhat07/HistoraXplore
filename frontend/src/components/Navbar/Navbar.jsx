import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseFunctions/firebaseConfig"; // Import Firebase Auth
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Successfully signed out!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <header>
        <nav className="bg-black p-4 flex justify-between items-center border-black">
          {/* Updated logo color to orange */}
          <div className="font-bold text-5xl text-orange-500">
            Histora Xplore
          </div>
          <ul className="flex items-center space-x-4">
            {/* Navigation Links */}
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
                to="/historypeople"
                className="text-white text-xl font-semibold px-4 hover:text-orange-500 transition-colors"
              >
                Trending
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

            {/* Conditionally Render Login or User Dropdown */}
            {!user ? (
              <li>
                <Link
                  to="/login"
                  className="text-white text-xl font-semibold px-4 hover:text-orange-500 transition-colors"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="relative group">
                <button className="text-white text-xl font-semibold px-4 hover:text-orange-500 transition-colors flex items-center">
                  <i
                    className="fas fa-user text-white text-xl"
                    style={{ marginRight: "7px" }}
                  ></i>
                  {user.displayName || user.email}{" "}
                  <i className="fas fa-chevron-down ml-2"></i>
                </button>
                {/* Dropdown Menu */}
                <ul
                  style={{ zIndex: "1000" }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity"
                >
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-black hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-user mr-2"></i> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full text-left px-4 py-2 text-black hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </nav>
        <div className="w-full border-t border-black"></div>
      </header>
    </>
  );
};

export default Navbar;
