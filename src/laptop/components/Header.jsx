import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../allStyles/header.css";
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

const Header = () => {
  const [index, setIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token"); // adjust if your key is different

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleProtectedRoute = (path) => {
    console.log("isLoggedIn: ", isLoggedIn)
    console.log("path: ", path)
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleOptionClick = (option) => {
    setDropdownOpen(false);

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    switch (option) {
      case "profile":
        navigate("/profile");
        break;
      case "orders":
        navigate("/orders");
        break;
      case "resell":
        navigate("/resell");
        break;
      case "logout":
        localStorage.removeItem("token");
        navigate("/login");
        break;
      default:
        break;
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
          <span onClick={() => handleProtectedRoute("/cart")}>
            <FaShoppingCart className="cart-icon" size={22} />
          </span>
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            {isLoggedIn ? (
              <>
                <button onClick={() => handleOptionClick("profile")}>Profile</button>
                <button onClick={() => handleOptionClick("orders")}>Orders</button>
                <button onClick={() => handleOptionClick("returns")}>Resold</button>
                <button onClick={() => handleOptionClick("logout")}>Logout</button>
              </>
            ) : (
              <button onClick={() => handleOptionClick("login")}>Login</button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Header */}
      <div className="bottom-header">
        <nav className="nav-links">
          <Link to="/home">
            <FaHome className="nav-icons" /> Home
          </Link>
          <Link to="/products">
            <FaBoxOpen className="nav-icons" /> Products
          </Link>
          <span className="span-link" onClick={() => handleProtectedRoute("/resell")}>
            <FaRecycle className="nav-icons" /> Resell
          </span>

          <Link to="/offers">
            <FaTags className="nav-icons" /> Offers
          </Link>
          <Link to="/trends">
            <FaLightbulb className="nav-icons" /> Tips & Ideas
          </Link>
        </nav>

        <div className="search-cart">
          <input type="text" placeholder="Search..." className="search-input" />
          <h4 className="becomeSeller" onClick={() => navigate("/sellOptions")}>
            Sell Your Furniture
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Header;
