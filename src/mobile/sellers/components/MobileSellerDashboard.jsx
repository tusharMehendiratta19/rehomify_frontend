import React from "react";
import MobileSellerOverview from "./MobileSellerOverview";
import MobileSellerHeader from "./MobileSellerHeader";
import MobileSellerNav from "./MobileSellerNav";
import "../sellerstyles/seller-style.css";

import MobileSellerSalesProfit from "./MobileSellerSalesProfit";

function MobileSellerDashboard() {
  return (
    <>
      <div>
        <MobileSellerOverview />
        <MobileSellerSalesProfit />
      </div>
    </> 
  );
}

export default MobileSellerDashboard;
