import React from "react";
import "../../App.css";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="about-wrapper">
        <div className="about-left">
          <img
            src="https://images.pexels.com/photos/26607971/pexels-photo-26607971/free-photo-of-photographer.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Founder"
            className="founder-img"
          />
          <div className="social-links">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        <div className="about-right">
          <h2>About ReHomify</h2>
          <p>
            ReHomify is a modern platform designed to simplify the process of
            buying and selling pre-loved furniture. Whether you're a student,
            family, or individual relocating, ReHomify helps you discover great
            furniture deals in your city. Our mission is to reduce furniture
            waste and promote sustainability through convenient, secure, and
            smart transactions.
          </p>

          <h3>Meet Our Founder</h3>
          <p>
            Our founder, John Doe, envisioned a platform that would bridge the
            gap between people looking for affordable, quality furniture and
            those seeking to responsibly pass theirs on. With a background in
            product design and a deep passion for circular economy, he built
            ReHomify to encourage mindful living through technology.
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AboutUs;
