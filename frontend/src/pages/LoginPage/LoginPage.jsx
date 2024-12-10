import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile, // Import the updateProfile method
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import heroImage from "../../assets/history.jpeg"; // Use the same background image for consistency

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignUpClick = () => setIsSignUp(true);
  const handleSignInClick = () => setIsSignUp(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Update the user's profile with the name after successful signup
        await updateProfile(userCredential.user, {
          displayName: name, // Set the displayName to the name entered by the user
        });

        console.log("Signup successful:", userCredential.user);
        toast.success("Signup successful!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Login successful:", userCredential.user);
        navigate("/");
        toast.success("Login successful!");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 md:p-20 rounded-lg shadow-xl max-w-md w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isSignUp ? (
            <>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Welcome Back
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full p-3 text-gray-800 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full p-3 text-gray-800 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md transition-all"
              >
                Sign In
              </button>
              <p className="text-center text-gray-700 mt-4">
                Not registered?{" "}
                <button
                  onClick={handleSignUpClick}
                  className="text-blue-500 hover:text-blue-600 font-bold"
                >
                  Register here
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Create an Account
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full p-3 text-gray-800 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full p-3 text-gray-800 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full p-3 text-gray-800 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md transition-all"
              >
                Sign Up
              </button>
              <p className="text-center text-gray-700 mt-4">
                Already registered?{" "}
                <button
                  onClick={handleSignInClick}
                  className="text-blue-500 hover:text-blue-600 font-bold"
                >
                  Sign in here
                </button>
              </p>
            </>
          )}
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default LoginPage;
