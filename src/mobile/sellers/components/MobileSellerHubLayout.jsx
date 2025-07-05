// src/layouts/MobileSellerHubLayout.js
import React, { useState } from 'react';
import MobileSellerNav from './MobileSellerNav';
import MobileSellerHeader from './MobileSellerHeader';
import { Outlet } from 'react-router-dom';
import "../sellerstyles/seller-style.css";

const MobileSellerHubLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <MobileSellerHeader toggleSidebar={toggleSidebar} />
      <MobileSellerNav isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="mobile-seller-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MobileSellerHubLayout;
