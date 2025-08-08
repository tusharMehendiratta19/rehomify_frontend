import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Undo2,
  MessageCircle,
  StickyNote,
  ReceiptText,
} from 'lucide-react';
import "../sellerstyles/sellerNav.css";


const SellerNav = () => {
  return (
    <div className="seller-layout">
      <aside className="seller-sidebar">
        <nav className="seller-nav-main">
          <Link to="/seller/addProduct" className="nav-link">
            <Home size={18} className="nav-icon" />
            Add Product
          </Link>
          <Link to="/seller/dashboard" className="nav-link">
            <LayoutDashboard size={18} className="nav-icon" />
            Dashboard
          </Link>
          <Link to="/seller/products" className="nav-link">
            <Package size={18} className="nav-icon" />
            My Products
          </Link>
          <Link to="/seller/orders" className="nav-link">
            <ShoppingCart size={18} className="nav-icon" />
            My Orders
          </Link>
          <Link to="/seller/returns" className="nav-link">
            <Undo2 size={18} className="nav-icon" />
            Resell Request
          </Link>
          <Link to="/seller/transactions" className="nav-link">
            <ReceiptText size={18} className="nav-icon" />
            Transaction History
          </Link>
          <Link to="/seller/reviews" className="nav-link">
            <MessageCircle size={18} className="nav-icon" />
            Customer Reviews
          </Link>
          <Link to="/seller/note" className="nav-link">
            <StickyNote size={18} className="nav-icon" />
            Note for Admin
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default SellerNav;
