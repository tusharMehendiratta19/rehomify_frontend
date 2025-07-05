import React from "react";
import SellerOverview from "./SellerOverview";
import SellerHeader from "./SellerHeader";
import SellerNav from "./SellerNav";
import "./seller-style.css";
import SellerSalesProfit from "./SellerSalesProfit";

function SellerDashboard() {
  return (
    <>
      <SellerHeader />
      <SellerNav />
      <div>
        <SellerOverview />
        <SellerSalesProfit />
      </div>
    </> 
  );
}

export default SellerDashboard;
