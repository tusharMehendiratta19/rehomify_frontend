import React from "react";
import SellerOverview from "./SellerOverview";
import SellerHeader from "./SellerHeader";
import SellerNav from "./SellerNav";
import "../sellerstyles/seller-style.css";

import SellerSalesProfit from "./SellerSalesProfit";

function SellerDashboard() {
  return (
    <>
      <div>
        <SellerOverview />
        <SellerSalesProfit />
      </div>
    </> 
  );
}

export default SellerDashboard;
