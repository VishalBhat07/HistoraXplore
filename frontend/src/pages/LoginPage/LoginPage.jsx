import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null); // State for error messages

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const apiUrl = "http://localhost:5000"; // backend URL
      const userData = {
        name: isSignUp ? name : "", // Include name only for signup
        email,
        password,
      };

      if (isSignUp) {
        const response = await axios.post(`${apiUrl}/register`, userData);
        console.log("Signup response:", response.data);
        alert(response.data.message); // Display success message

        // Clear the form after successful signup
        setName("");
        setEmail("");
        setPassword("");
      } else {
        const response = await axios.post(`${apiUrl}/login`, userData);
        console.log("Login response:", response.data);
        alert(response.data.message); // Display login success/failure message
        // Handle successful login (e.g., redirect to protected page)
        // ...
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.status === 401) {
        setError("Invalid email or password!"); // Handle invalid credentials
      } else {
        setError(error.response?.data?.message || "An error occurred!");
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        {!isSignUp && (
          <>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">Sign In</button>
            <p>
              Not registered?{" "}
              <Link to="/signup" onClick={handleSignUpClick}>
                Register here
              </Link>
            </p>
            {error && <p className="error-message">{error}</p>}
          </>
        )}
        {isSignUp && (
          <>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">Sign Up</button>
            <p>
              Already registered?{" "}
              <a href="/login" onClick={handleSignInClick}>
                Sign in here
              </a>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
