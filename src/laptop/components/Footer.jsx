import React from "react";
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

  return (
    <div className="main-layout">
      <div className="footer-columns">
        {/* First Column - FAQ, About Us, Contact Us */}
        <div className="main-column">
          <div className="footer-section">
            <h4 onClick={() => navigate('/faq')} style={{ cursor: 'pointer' }}>FAQs</h4>
          </div>

          <div className="footer-section">
            <h4 onClick={() => navigate('/aboutus')} style={{ cursor: 'pointer' }}>About Us</h4>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: support@rehomify.com</p>
          </div>
        </div>

        {/* Second Column - Social Media Links */}
        <div className="social-media-column">
          <h4>Follow Us</h4><br />
          <div className="social-links">
            <a href="https://instagram.com/re_homify/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram size={20} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaXTwitter size={20} />
            </a>
            <a href="https://in.pinterest.com/Rehomify/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaPinterest size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>

        {/* Third Column - Become a Seller */}
        <div className="become-seller-column">
          <h4>Become a Seller</h4>
          <p>Interested in selling furniture on ReHomify? Join us today!</p>
          <button className="become-seller-btn" onClick={() => navigate("/signup")}>Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
