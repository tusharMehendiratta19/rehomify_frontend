// src/layouts/SellerHubLayout.js
import React from 'react';
import SellerNav from './SellerNav';
import SellerHeader from './SellerHeader';
import { Outlet } from 'react-router-dom';
import "./seller-style.css";

const SellerHubLayout = () => {
  return (
    <div>
      <SellerHeader />
      <SellerNav />
      <div className="seller-content">
        <Outlet /> {/* This renders the child route content */}
      </div>
    </div>
  );
};

export default SellerHubLayout;
