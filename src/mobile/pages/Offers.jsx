import React,{useState,useEffect} from "react";
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
    <div className="mobile-offers-main">
      <Header />
      <div className="mobile-offers-container">
        <h2 className="mobile-offers-title">Available Offers</h2>
        <div className="mobile-offers-row">
          {offersData.map((offer) => (
            <div className="mobile-offer-card" key={offer.id}>
              <img src={offer.image} alt={offer.type} className="mobile-offer-image" />
              <div>
                <div className="mobile-offer-top">
                  <span
                    className="mobile-offer-code-box"
                    onClick={() => copyToClipboard(offer.code)}
                  >
                    {offer.code}
                  </span>

                </div>
                <div className="mobile-offer-discount">{offer.description}</div>
                {/* <div className="mobile-offer-tagline">{offer.description}</div> */}
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
