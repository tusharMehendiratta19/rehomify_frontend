import React from "react";
import SellerNav from "./SellerNav";
import SellerHeader from "./SellerHeader";
import Home from "src/pages/Home";

const SellerHome = () => {
  return (
    <div>
      <SellerHeader />
      <SellerNav />
      <div className="sellerHome">
        <Home />
      </div>
    </div>
  );
};

export default SellerHome;
