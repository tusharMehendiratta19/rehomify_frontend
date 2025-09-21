import React, { useState } from "react";
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
      <h2 className="offers-title"><b>Special Furniture Offers</b></h2>
      <div className="product-offer-row">
        {furnitureOffer.map((id) => (
          <div className="product-offer-card" key={`product-offer-${id.id}`}>

            <img
              src={id.image}
              alt="Furniture Offer"
              className="product-offer-image"
            />
            <div className="product-offer-header">{id.type}</div>
            <div className="product-offer-desc">{id.description}</div>
            <div
              className="product-offer-price"
              onClick={() => setShowPopup(true)} // ✅ open popup
              style={{ cursor: "pointer" }}
            >
              {id.emi}
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="laptop-popup-overlay">
          <div className="laptop-popup-box">
            <p>This feature will be rolled out soon</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export default SpecialFurnitureOffer;