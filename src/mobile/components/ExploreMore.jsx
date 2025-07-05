import React, { useState } from "react";
import "../allStyles/exploremore.css";

const categories = [
  { name: "Tables", price: "2499", image: "Dining Table.png" },
  { name: "Single Beds", price: "4999", image: "Single bed.png" },
  { name: "Double Beds", price: "7999", image: "Double bed.png" },
  { name: "Cupboard", price: "5999", image: "wardrobe.jpeg" },
  {
    name: "Chairs",
    price: "2999",
    image:
      "https://cdn.pixabay.com/photo/2015/06/19/21/33/beach-815303_1280.jpg",
  },
  { name: "Combos", price: "4499", image: "montage.jpeg" },
];

const ExploreMore = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleCards = showAll ? categories : categories.slice(0, 4); // 2.5 rows = 5 cards

  return (
    <div className="mobile-explore-wrapper">
      <h4 className="mobile-explore-heading">Explore By Categories</h4>
      <div className="mobile-explore-cards-container">
        {visibleCards.map((item, index) => (
          <div className="mobile-explore-card" key={index}>
            <img
              src={`${item.image}?auto=compress&cs=tinysrgb&w=600`}
              alt={item.name}
              className="mobile-explore-image"
            />
            <div className="mobile-hover-btn">
              {item.name} under ₹{item.price}
            </div>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="mobile-explore-show-more-container">
          <button
            className="mobile-explore-show-more-btn"
            onClick={() => setShowAll(true)}
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreMore;
