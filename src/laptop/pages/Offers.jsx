import React, { useState, useEffect } from "react";
import axios from "axios";
import "../allStyles/offers.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExploreCategories from "../components/ExploreCategories";
import SpecialFurnitureOffer from "../components/SpecialFurnitureOffer";

const OffersMobile = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("https://rehomify.in/v1/offers/");

        if (Array.isArray(res.data)) {
          // ✅ Filter only active offers
          const activeOffers = res.data.filter((offer) => offer.isActive);
          setOffers(activeOffers);
        } else {
          setOffers([]); // fallback if response is not array
        }
      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setOffers([]);
      }
    };

    fetchOffers();
  }, []);


  const offersData = offers;

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied code: ${code}`);
  };

  return (
    <div className="offers-main">
      <Header />
      <div className="offers-container">
        <h2 className="offers-title">Available Offers</h2>
        <div className="offers-row">
          {offersData.map((offer) => (
            <div className="offer-card" key={offer.id}>
              <img src={offer.image} alt={offer.type} className="offer-image" />
              <div>
                <div className="offer-top">
                  <span
                    className="offer-code-box"
                    onClick={() => copyToClipboard(offer.code)}
                  >
                    {offer.code}
                  </span>

                </div>
                <div className="offer-discount">{offer.description}</div>
                {/* <div className="offer-tagline">{offer.description}</div> */}
              </div>
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
