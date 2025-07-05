import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Undo2,
  MessageCircle,
  StickyNote,
  ReceiptText,
} from "lucide-react";
import "../sellerstyles/sellerNav.css";

const MobileSellerNav = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`mobile-seller-sidebar ${isOpen ? "open" : ""}`}>
      <nav className="mobile-seller-nav-main">
        <Link to="/seller/home" onClick={toggleSidebar} className="mobile-nav-link">
          <Home size={18} className="mobile-nav-icon" />
          Home
        </Link>
        <Link to="/seller/dashboard" onClick={toggleSidebar} className="mobile-nav-link">
          <LayoutDashboard size={18} className="mobile-nav-icon" />
          Dashboard
        </Link>
        <Link to="/seller/products" onClick={toggleSidebar} className="mobile-nav-link">
          <Package size={18} className="mobile-nav-icon" />
          My Products
        </Link>
        <Link to="/seller/orders" onClick={toggleSidebar} className="mobile-nav-link">
          <ShoppingCart size={18} className="mobile-nav-icon" />
          My Orders
        </Link>
        <Link to="/seller/returns" onClick={toggleSidebar} className="mobile-nav-link">
          <Undo2 size={18} className="mobile-nav-icon" />
          Resell Request
        </Link>
        <Link to="/seller/transactions" onClick={toggleSidebar} className="mobile-nav-link">
          <ReceiptText size={18} className="mobile-nav-icon" />
          Transaction History
        </Link>
        <Link to="/seller/reviews" onClick={toggleSidebar} className="mobile-nav-link">
          <MessageCircle size={18} className="mobile-nav-icon" />
          Customer Reviews
        </Link>
        <Link to="/seller/note" onClick={toggleSidebar} className="mobile-nav-link">
          <StickyNote size={18} className="mobile-nav-icon" />
          Note for Admin
        </Link>
      </nav>
    </div>
  );
};

export default MobileSellerNav;
