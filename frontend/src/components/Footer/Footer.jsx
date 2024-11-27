import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <p>
            Dive into the rich tapestry of history with <strong>Histora Xplore</strong>. Our platform brings the past to
            life, offering immersive insights into historical events, cultures,
            and places.
            <br />
            <br />
            Join us as we connect stories from the past with the present, making
            history accessible, engaging, and informative for everyone. Let's
            explore the journey of humanity together!
          </p>
          <div className="footer-social-icons">
            <a
              href="https://www.instagram.com/vishalbhat07/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/vishalbhat07/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/VishalBhat07/Histora-Xplore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>EXPLORE</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Explore History</li>
            <li>Terms & Policies</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>CONTACT US</h2>
          <ul>
            <li>+91 7975806665</li>
            <li>vishalkbhat.cs23@rvce.edu.in</li>
            <li>vssreenivaas.cs23@rvce.edu.in</li>
            <li>sushanthjoshi.cs23@rvce.edu.in</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; HistoraExplore.com - All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
