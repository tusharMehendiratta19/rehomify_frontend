import React, { useState } from "react";
import MobileSellerHeader from "./MobileSellerHeader";
import MobileSellerNav from "./MobileSellerNav";
import { Outlet } from "react-router-dom";

const MobileSellerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <MobileSellerHeader toggleSidebar={toggleSidebar} />
      <MobileSellerNav isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="mobile-seller-content">
        <Outlet />
      </div>
    </>
  );
};

export default MobileSellerLayout;
