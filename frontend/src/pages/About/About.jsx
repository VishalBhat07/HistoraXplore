import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLightbulb } from "react-icons/fa"; // Example icons
import heroImage from "../../assets/history.jpeg"; // Same background image as the contact page
import "react-toastify/dist/ReactToastify.css";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-cover bg-center flex flex-col items-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 md:p-12 rounded-lg shadow-xl max-w-4xl w-full mt-16 mb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-lg text-gray-700">
            Welcome to Histora Xplore, your gateway to discovering and engaging
            with the rich tapestry of human history.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="section mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <FaLightbulb className="mr-3 text-indigo-600" />
            Our Mission
          </h2>
          <p className="text-gray-700">
            At <b>Histora Xplore</b>, our mission is to make learning about
            history interactive, accessible, and engaging for everyone. We aim
            to bring the past to life by providing a platform where users can
            explore historical events, timelines, and cultural milestones in an
            immersive way. Our goal is to inspire curiosity, foster a deeper
            understanding of the world, and help users connect with the stories
            that shaped our civilization. Whether you're a student, a history
            enthusiast, or a curious learner, History Explore is here to enrich
            your knowledge journey.
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="section mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <FaUser className="mr-3 text-indigo-600" />
            Our Team
          </h2>
          <div className="team-members grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="team-member text-center"
            >
              <img
                src="./pfp2.jpg"
                alt="Vishal K Bhat"
                className="rounded-full mx-auto mb-4 w-32 h-32 object-cover shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Vishal K Bhat
              </h3>
              <p className="text-gray-600">Team Lead</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="team-member text-center"
            >
              <img
                src="./pfp7.jpg"
                alt="V S Sreenivaas"
                className="rounded-full mx-auto mb-4 w-32 h-32 object-cover shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                V S Sreenivaas
              </h3>
              <p className="text-gray-600">Member</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="team-member text-center"
            >
              <img
                src="./pfp5.jpg"
                alt="Sushanth Joshi"
                className="rounded-full mx-auto mb-4 w-32 h-32 object-cover shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Sushanth Joshi
              </h3>
              <p className="text-gray-600">Member</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="section mb-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <FaEnvelope className="mr-3 text-indigo-600" />
            Get in Touch
          </h2>
          <p className="text-gray-700">
            Have a question or want to learn more about our project? Contact us
            at{" "}
            <a
              href="mailto:vishalkbhat.cs23@rvce.edu.in"
              className="text-blue-500 hover:text-blue-700"
            >
              vishalkbhat.cs23@rvce.edu.in
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
