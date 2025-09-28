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
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AboutUs;
