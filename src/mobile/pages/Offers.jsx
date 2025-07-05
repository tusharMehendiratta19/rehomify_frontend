import React from "react";
import "../allStyles/offers.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExploreCategories from "../components/ExploreCategories";
import SpecialFurnitureOffer from "../components/SpecialFurnitureOffer";

const offersData = [
  { id: 1, type: "Bank Offer", description: "Get 10% off with HDFC Credit Cards", code: "HDFC10", image: "offer1.jpeg", offerHead: "Get 10% OFF" },
  { id: 2, type: "Bank Offer", description: "5% cashback on ICICI Debit Cards", code: "ICICI5", image: "offer2.jpeg", offerHead: "5% Cashback" },
  { id: 3, type: "Bank Offer", description: "No Cost EMI on SBI Cards", code: "SBIEMI", image: "offer3.jpeg", offerHead: "No Cost EMI" },
  { id: 4, type: "Wallet Offer", description: "Flat ₹100 off with Paytm Wallet", code: "PAYTM100", image: "offer4.jpeg", offerHead: "Flat ₹100 OFF" },
  { id: 5, type: "Wallet Offer", description: "Extra ₹50 cashback with PhonePe", code: "PHONEPE50", image: "offer1.jpeg", offerHead: "Extra ₹50 Cashback" },
  { id: 6, type: "Wallet Offer", description: "20% off using Amazon Pay", code: "AMZNPAY20", image: "offer2.jpeg", offerHead: "20% OFF" },
  { id: 7, type: "New User Offer", description: "₹150 off for new users on first purchase", code: "FIRST150", image: "offer3.jpeg", offerHead: "₹150 OFF" },
  { id: 8, type: "New User Offer", description: "Sign-up bonus of ₹200 for new users", code: "SIGNUP200", image: "offer4.jpeg", offerHead: "₹200 Sign-up Bonus" }
];

const OffersMobile = () => {
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied code: ${code}`);
  };

  return (
    <div className="mobile-offers-main">
      <Header />
      <div className="mobile-offers-container">
        <h2 className="mobile-offers-title">Available Offers</h2>
        <div className="mobile-offers-row">
          {offersData.map((offer) => (
            <div className="mobile-offer-card" key={offer.id}>
              <div className="mobile-offer-top">
                <span
                  className="mobile-offer-code-box"
                  onClick={() => copyToClipboard(offer.code)}
                >
                  {offer.code}
                </span>
                <img src={offer.image} alt={offer.type} className="mobile-offer-image" />
              </div>
              <div className="mobile-offer-discount">{offer.offerHead}</div>
              <div className="mobile-offer-tagline">{offer.description}</div>
            </div>
          ))}
        </div>
      </div>
      <SpecialFurnitureOffer />
      <ExploreCategories />
      <Footer />
    </div>
  );
};

export default OffersMobile;
