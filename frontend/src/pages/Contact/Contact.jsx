import React, { useState } from "react";
import heroImage from "../../assets/history.jpeg"; // Use the same background image for consistency
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbz1nMjDY70SiRcTa_0gbndUqrnmJV6K9QHgO4-pGQreG4_PxF2sBFCx1DUdv-Awp5xZJA/exec";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    fetch(scriptURL, { method: "POST", body: new FormData(e.target) })
      .then((response) => {
        setMessage("Message sent successfully");
        setTimeout(() => {
          setMessage("");
        }, 5000);
        e.target.reset();
        setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error!", error.message);
        setSubmitting(false);
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 md:p-12 rounded-lg shadow-xl max-w-4xl w-full">
        <form onSubmit={handleSubmit} name="submit-to-google-sheet" className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-center text-gray-700 mb-6">
            Have questions, feedback, or inquiries? Get in touch with us, and we'll get back to you as soon as possible.
          </p>
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
                name="Name"
                placeholder="Your name"
                required
                className="w-full p-3 text-gray-800 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
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
                name="Email"
                placeholder="Your email"
                required
                className="w-full p-3 text-gray-800 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Message
              </label>
              <textarea
                name="Message"
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 text-gray-800 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              ></textarea>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md transition-all disabled:bg-gray-400"
              disabled={submitting}
            >
              {submitting ? (
                <span>
                  Submitting... <i className="fas fa-spinner fa-spin"></i>
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        <span
          id="msg"
          className="mt-4 block text-center text-green-500"
        >
          {message}
        </span>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Contact;
