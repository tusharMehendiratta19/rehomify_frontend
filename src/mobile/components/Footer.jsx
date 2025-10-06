import React, { useState } from "react";
import "../allStyles/footer.css";
import {
  FaInstagram,
  FaXTwitter,
  FaPinterest,
  FaFacebookF,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="mobile-main-layout">
      <div className="mobile-footer-columns">
        {/* First Column - FAQ, About Us, Contact Us */}
        <div className="mobile-social-media-column">
          <h5>Follow Us</h5>
          <div className="mobile-social-links">
            <a href="https://instagram.com/re_homify/" target="_blank" rel="noopener noreferrer" className="mobile-social-icon">
              <FaInstagram size={15} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="mobile-social-icon">
              <FaXTwitter size={15} />
            </a>
            <a href="https://in.pinterest.com/Rehomify/" target="_blank" rel="noopener noreferrer" className="mobile-social-icon">
              <FaPinterest size={15} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mobile-social-icon">
              <FaFacebookF size={15} />
            </a>
          </div>
        </div>
        <div className="mobile-main-column">
          <div className="mobile-footer-section">
            <h5 onClick={() => navigate('/faq')}>FAQs</h5>
          </div>

          <div className="mobile-footer-section">
            <h5 onClick={() => navigate('/aboutus')}>About Us</h5>
          </div>
          <div className="mobile-footer-section">
            <h5>Resell Calculator</h5>
          </div>
          <div className="mobile-footer-section" onClick={() => navigate("/tnc")}>
            <h5>T&C</h5>
          </div>

          <div className="mobile-footer-section">
            <h5>Contact Us</h5>
            <p>admin@rehomify.in</p>
            <p>9131175240</p>
          </div>

        </div>

        <div className="mobile-become-seller-column">
          {/* <h5>Become a Seller</h5> */}
          <p>Want to sell on ReHomify? </p>
          <button className="mobile-become-seller-btn" onClick={() => setShowPopup(true)}>Apply Now</button>
        </div>


      </div>

      {showPopup && (
        <div className="mobile-footer-popup-overlay">
          <div className="mobile-footer-popup-box">
            <p>
              Please share your query and contact details on <br />
              <b>admin@rehomify.in</b> <br />
              <b>OR</b> <br />
              <b>9131175240</b> <br />
              Our team will contact you.
            </p>
            <button className="mobile-footer-close-btn" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
