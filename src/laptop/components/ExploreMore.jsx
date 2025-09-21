import React, { useState } from "react";
import "../allStyles/exploremore.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "Table", name: "Tables", price: "2499", image: "Dining Table.png" },
  { id: "Single Bed", name: "Single Beds", price: "4999", image: "Single bed.png" },
  { id: "Double Bed", name: "Double Beds", price: "7999", image: "Double bed.png" },
  { id: "Cupboard", name: "Cupboard", price: "5999", image: "wardrobe.jpeg" },
  { id: "Combo", name: "Combos", price: "4499", image: "montage.jpeg" },
  // {
  //   name: "Chairs",
  //   price: "2999",
  //   image:
  //     "https://cdn.pixabay.com/photo/2015/06/19/21/33/beach-815303_1280.jpg",
  // },
];

const ExploreMore = () => {
  const navigate = useNavigate()

  return (
    <div className="explore-wrapper">
      <h4 className="explore-heading">Explore By Categories</h4>
      <div className="explore-cards-container">
        {categories.map((item, index) => (
          <div className="explore-card" key={index} onClick={() => navigate("/products", { state: { selectedCategory: item.id } })}>
            <img
              src={`${item.image}?auto=compress&cs=tinysrgb&w=600`}
              alt={item.name}
              className="explore-image"
            />
            <div className="hover-btn">
              {item.name} under ₹{item.price}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ExploreMore;
