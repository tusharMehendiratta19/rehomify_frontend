// components/Loader.js
import React from "react";
import "../allStyles/loader.css"; // We'll define styles here

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
