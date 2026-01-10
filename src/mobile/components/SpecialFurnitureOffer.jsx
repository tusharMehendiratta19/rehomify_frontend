import { useState } from "react";
import "../allStyles/specialfurnitureoffer.css";

const SpecialFurnitureOffer = () => {
  const [showPopup, setShowPopup] = useState(false);

  const furnitureOffer = [
    {
      id: 1,
      type: "Offer On Tables",
      description: "Own any table in EMIs",
      image: "table.jpeg",
      emi: "OWN AT ₹499/MONTH",
    },
    {
      id: 2,
      type: "Offer On Beds",
      description: "Sleep Well, Pay in EMIs",
      image: "bed.jpeg",
      emi: "OWN AT ₹699/MONTH",
    },
    {
      id: 3,
      type: "Offer On Cupboards",
      description: "Own Cupboards in EMIs",
      image: "cupboard.jpeg",
      emi: "OWN AT ₹599/MONTH",
    },
    {
      id: 4,
      type: "Offer On Combos",
      description: "Pay for Combos in EMIs",
      image: "offercombo.jpeg",
      emi: "OWN AT ₹449/MONTH",
    },
  ];

  return (
    <>
      <h4 className="mobile-offers-title-special">Special Furniture Offers</h4>
      <div className="mobile-product-offer-row">
        {furnitureOffer.map((item) => (
          <div
            className="mobile-product-offer-card"
            key={`product-offer-${item.id}`}
          >
            <img
              src={item.image}
              alt="Furniture Offer"
              className="mobile-product-offer-image"
            />
            <div className="mobile-product-offer-header">{item.type}</div>
            <div className="mobile-product-offer-desc">{item.description}</div>
            <div
              className="mobile-product-offer-price"
              onClick={() => setShowPopup(true)} // ✅ open popup
              style={{ cursor: "pointer" }}
            >
              {item.emi}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>This feature will be rolled out soon</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SpecialFurnitureOffer;
