import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUserCircle,
    FaShoppingCart,
    FaBars
} from "react-icons/fa";
import "../allstyles/header.css"; // You can create this CSS file

const slogans = ["Table", "Chair", "Sofa", "Bed", "Cupboard"];

const MobileHeader = ({ isLoggedIn = true, handleLogout }) => {
    const [index, setIndex] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slogans.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleSideNav = () => setSideNavOpen(!sideNavOpen);

    const handleOptionClick = (option) => {
        setDropdownOpen(false);
        if (option === "logout") {
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
        <div className="mobile-header-container">
            {/* Side Navbar */}
            {sideNavOpen && (
                <div className="mobile-side-nav">
                    {/* <div className="side-nav-header">
                        <span className="close-btn" onClick={toggleSideNav}>✕</span>
                    </div> */}
                    <div className="side-nav-links">
                        <Link to="/" onClick={toggleSideNav} className="nav-link">Home</Link>
                        <Link to="/products" onClick={toggleSideNav} className="nav-link">Products</Link>
                        <Link to="/resell" onClick={toggleSideNav} className="nav-link">Resell</Link>
                        <Link to="/offers" onClick={toggleSideNav} className="nav-link">Offers</Link>
                        <Link to="/trends" onClick={toggleSideNav} className="nav-link">Tips & Ideas</Link>
                        <Link to="/sellOptions" onClick={toggleSideNav} className="nav-link">Sell Your Furniture</Link>
                    </div>
                </div>
            )}


            {/* Top Bar */}
            <div className="mobile-top-bar">
                <img src="public\logo_rehomify.png" alt="Logo" className="mobile-logo-img" />
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
                    <button onClick={() => handleOptionClick("profile")}>Profile</button>
                    <button onClick={() => handleOptionClick("orders")}>Orders</button>
                    {/* <button onClick={() => handleOptionClick("returns")}>Resold</button> */}
                    <button onClick={() => handleOptionClick("logout")}>Logout</button>
                </div>
            )}

            {/* Bottom Bar */}
            <div className="mobile-bottom-bar">
                <FaBars size={20} onClick={toggleSideNav} className="burger-icon" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="mobile-search-input"
                />
                <button className="mobile-resell-button" onClick={() => navigate("/sellOptions")}>
                    {"RESELL".split("").map((char, i) => (
                        <span key={i} className="resell-letter" style={{ animationDelay: `${i * 0.1}s` }}>
                            {char}
                        </span>
                    ))}
                </button>
                <Link to="/cart" className="mobile-cart-link">
                    <FaShoppingCart className="mobile-cart-icon" size={20} />
                </Link>
            </div>
        </div>
    );
};

export default MobileHeader;
