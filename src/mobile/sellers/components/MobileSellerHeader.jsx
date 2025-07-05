import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import "./../sellerstyles/sellerHeader.css";

const MobileSellerHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout logic here
    navigate("/login");
  };

  return (
    <header className="mobile-seller-header">
      <button className="mobile-burger-btn" onClick={toggleSidebar}>
        <Menu size={22} />
      </button>
      <div className="mobile-seller-title">Rehomify's Seller Hub</div>
      <button className="mobile-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default MobileSellerHeader;
