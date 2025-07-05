// src/pages/seller/SellerLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SellerHeader from './SellerHeader';
import SellerNav from './SellerNav';
import "../sellerstyles/seller-style.css";


const SellerLayout = () => {
  return (
    <div className="seller-layout">
      <SellerHeader />
      <SellerNav />
      <div className="seller-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;
