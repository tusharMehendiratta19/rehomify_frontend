import React, { useState, useEffect } from "react";
import axios from "axios";
import "../allStyles/offers.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExploreCategories from "../components/ExploreCategories";
import SpecialFurnitureOffer from "../components/SpecialFurnitureOffer";

const Offers = () => {

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get('https://rehomify.in/v1/offers/');
        // console.log("response: ",res.data.products)
        setOffers(res.data);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
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
              <div className="offer-top">
                <div
                  className="offer-code-box"
                  onClick={() => copyToClipboard(offer.code)}
                >
                  {offer.code}
                </div>
                <img src={offer.image} alt={offer.type} className="offer-image" />
              </div>
              <div className="offer-discount">{offer.code}</div>
              <div className="offer-tagline">{offer.description}</div>
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

export default Offers;
