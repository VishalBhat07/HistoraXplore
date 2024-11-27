import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-us">
      <div className="hero">
        <h1>About Us</h1>
        <p>
          Welcome to History Explore, your gateway to discovering and engaging
          with the rich tapestry of human history.
        </p>
      </div>
      <div className="section">
        <h1>Our Mission</h1>
        <p>
          At <b>History Explore</b>, our mission is to make learning about
          history interactive, accessible, and engaging for everyone. We aim to
          bring the past to life by providing a platform where users can explore
          historical events, timelines, and cultural milestones in an immersive
          way. Our goal is to inspire curiosity, foster a deeper understanding
          of the world, and help users connect with the stories that shaped our
          civilization. Whether you're a student, a history enthusiast, or a
          curious learner, History Explore is here to enrich your knowledge
          journey.
        </p>
      </div>
      <div className="section">
        <h2>Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="./pfp2.jpg" alt="Vishal K Bhat" />
            <h3>Vishal K Bhat</h3>
            <p>Team Lead</p>
          </div>
          <div className="team-member">
            <img src="./pfp4.jpg" alt="V S Sreenivaas" />
            <h3>V S Sreenivaas</h3>
            <p>Member </p>
          </div>
          <div className="team-member">
            <img src="./pfp5.jpg" alt="Sushanth Joshi" />
            <h3>Sushanth Joshi</h3>
            <p>Member</p>
          </div>
        </div>
      </div>
      <div className="section">
        <h2>Get in Touch</h2>
        <p>
          Have a question or want to learn more about our project? Contact us at{" "}
          <a href="mailto:vishalkbhat.cs23@rvce.edu.in">
            vishalkbhat.cs23@rvce.edu.in
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
