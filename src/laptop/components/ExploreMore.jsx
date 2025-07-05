import React from "react";
import "../allStyles/exploremore.css"; // Importing the CSS file for styling

const categories = [
  {
    name: "Tables",
    price: "2499",
    image: "Dining Table.png",
  },
  {
    name: "Single Beds",
    price: "4999",
    image: "Single bed.png",
  },
  {
    name: "Double Beds",
    price: "7999",
    image: "Double bed.png",
  },
  {
    name: "Cupboard",
    price: "5999",
    image: "wardrobe.jpeg",
  },
  {
    name: "Combos",
    price: "4499",
    image: "montage.jpeg",
  },
];

const ExploreMore = () => {
  return (
    <div className="explore-wrapper">
      <h2 className="explore-heading"><b>Explore By Categories</b></h2>
      <div className="explore-cards-container">
        {categories.map((item, index) => (
          <div className="explore-card" key={index}>
            <img
              src={`${item.image}?auto=compress&cs=tinysrgb&w=600`}
              alt={item.name}
            />
            <div className="hover-btn">
              {item.name} under {item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
