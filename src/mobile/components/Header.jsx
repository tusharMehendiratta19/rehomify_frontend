import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaShoppingCart,
  FaBars
} from "react-icons/fa";
import axios from "axios";
import "../allstyles/header.css";

const slogans = ["Table", "Chair", "Sofa", "Bed", "Cupboard"];

const MobileHeader = () => {
  const [index, setIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.get("https://rehomify.in/v1/products/all")
      .then(res => setAllProducts(res.data.data || []))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSideNav = () => setSideNavOpen(!sideNavOpen);

  const handleProtectedRoute = (path) => {
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
      case "returns":
        navigate("/returns");
        break;
      case "wishlist":
        navigate("/wishlist");
        break;
      case "logout":
        localStorage.removeItem("token");
        localStorage.removeItem("custId");
        window.dispatchEvent(new CustomEvent("snackbar", {
          detail: { message: "Logged out successfully.", type: "success" }
        }));
        setTimeout(() => navigate("/login"), 1000);
        break;
      default:
        break;
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = allProducts.filter(
      (product) =>
        product.name?.toLowerCase().includes(value.toLowerCase()) ||
        product.category?.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSearchSubmit = () => {
    if (!searchText.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="mobile-header-container">
      {/* Side Navbar */}
      {sideNavOpen && (
        <div className="mobile-side-nav">
          <div className="side-nav-links">
            <Link to="/home" onClick={toggleSideNav} className="nav-link">Home</Link>
            <Link to="/products" onClick={toggleSideNav} className="nav-link">Products</Link>
            <span onClick={() => { toggleSideNav(); handleProtectedRoute("/resell"); }} className="nav-link">
              Resell
            </span>
            <Link to="/offers" onClick={toggleSideNav} className="nav-link">Offers</Link>
            <Link to="/trends" onClick={toggleSideNav} className="nav-link">Tips & Ideas</Link>
            <Link to="/sellOptions" onClick={toggleSideNav} className="nav-link">Sell Your Furniture</Link>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="mobile-top-bar">
        <img src="/logo_rehomify.png" alt="Logo" className="mobile-logo-img" onClick={() => navigate("/home")}/>
        <div className="mobile-logo-slogan">
          <div className="mobile-logo">ReHomify</div>
          <div className="mobile-slogan">
            Buy '{slogans[index]}' on easy EMIs
          </div>
        </div>
        <FaUserCircle size={22} onClick={toggleDropdown} className="mobile-user-icon" />
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="mobile-dropdown-menu">
          {isLoggedIn ? (
            <>
              <button onClick={() => handleOptionClick("profile")}>Profile</button>
              <button onClick={() => handleOptionClick("orders")}>Orders</button>
              <button onClick={() => handleOptionClick("wishlist")}>Wishlist</button>
              <button onClick={() => handleOptionClick("logout")}>Logout</button>
            </>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      )}

      {/* Bottom Bar */}
      <div className="mobile-bottom-bar" style={{ position: "relative" }}>
        <FaBars size={20} onClick={toggleSideNav} className="burger-icon" />
        <input
          type="text"
          placeholder="Search..."
          className="mobile-search-input"
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <button className="mobile-resell-button" onClick={() => navigate("/sellOptions")}> {
          "RESELL".split("").map((char, i) => (
            <span key={i} className="resell-letter" style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
          ))
        }</button>
        <span onClick={() => handleProtectedRoute("/cart")} className="mobile-cart-link">
          <FaShoppingCart className="mobile-cart-icon" size={20} />
        </span>

        {/* Suggestions Box */}
        {searchText && suggestions.length > 0 && (
          <div className="mobile-search-suggestions">
            {suggestions.map(item => (
              <div
                key={item._id}
                className="mobile-suggestion-item"
                onClick={() => {
                  navigate(`/product/${item._id}`);
                  setSearchText("");
                  setSuggestions([]);
                }}
              >
                {item.name} – <span style={{ fontStyle: "italic", color: "#888" }}>{item.category}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
