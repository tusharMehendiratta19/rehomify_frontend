import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { FaUserCircle, , FaSearch } from "react-icons/fa";
import "../allStyles/header.css"; // Ensure this is already imported
import {
  FaUserCircle,
  FaShoppingCart,
  FaSearch,
  FaHome,
  FaBoxOpen,
  FaRecycle,
  FaTags,
  FaLightbulb
} from "react-icons/fa";

const slogans = ["Table", "Chair", "Sofa", "Bed", "Cupboard"];

const Header = ({ isLoggedIn = true, handleLogout }) => {
  const [index, setIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleOptionClick = (option) => {
    setDropdownOpen(false);
    if (option === "logout") {
      // handleLogout();
      navigate("/login");
    } else if (option === "profile") {
      navigate("/profile");
    } else if (option === "orders") {
      navigate("/orders");
    } else if (option === "returns") {
      navigate("/returns");
    }
  };

  return (
    <div className="header-container">
      {/* Top Header */}
      <div className="top-header">
        <div className="logo">ReHomify</div>
        <div className="slogan">
          Don’t just rent, buy '{slogans[index]}' on easy EMIs
        </div>
        <FaUserCircle size={28} onClick={toggleDropdown} className="userIcon" />
        <div className="cartBtn">
          <Link to="/cart">
            <FaShoppingCart className="cart-icon" size={22} />
          </Link>
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={() => handleOptionClick("profile")}>
              Profile
            </button>
            <button onClick={() => handleOptionClick("orders")}>Orders</button>
            <button onClick={() => handleOptionClick("returns")}>
              Resold
            </button>
            <button onClick={() => handleOptionClick("logout")}>Logout</button>
          </div>
        )}
      </div>

      {/* Second Header */}
      <div className="bottom-header">
        <nav className="nav-links">
          <Link to="/">
            <FaHome className="nav-icons" /> Home
          </Link>
          <Link to="/products">
            <FaBoxOpen className="nav-icons" /> Products
          </Link>
          <Link to="/resell">
            <FaRecycle className="nav-icons" /> Resell
          </Link>
          <Link to="/offers">
            <FaTags className="nav-icons" /> Offers
          </Link>
          <Link to="/trends">
            <FaLightbulb className="nav-icons" /> Tips & Ideas
          </Link>
        </nav>

        <div className="search-cart">
          <input type="text" placeholder="Search..." className="search-input" />
          <h4 className="becomeSeller" onClick={() => navigate("/sellOptions")}>Sell Your Furniture</h4>
        </div>
      </div>
    </div>
  );
};

export default Header;
