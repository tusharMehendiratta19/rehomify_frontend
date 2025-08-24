import React from "react";
import "../allStyles/explorecategories.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Product under 5k",
    image: "Product under 5000(2).png",
    buttonText: "Shop Now",
  },
  {
    title: "Popular right now",
    image: "Popular right now.png",
    buttonText: "Explore",
  },
  {
    title: "Deep discounts",
    image: "https://media.istockphoto.com/id/1419880946/photo/graph-of-real-estate-market-where-arrowhead-is-falling.jpg?b=1&s=612x612&w=0&k=20&c=1vxDtf55BU5WL8dkiaGv1TuR_mJQZy8gNo-zexr4cgI=",
    buttonText: "Grab Deals",
  },
  {
    title: "Clearance sale",
    image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=600",
    buttonText: "View Offers",
  },
  // {
  //   title: "Flash delivery",
  //   image: "https://images.pexels.com/photos/6214450/pexels-photo-6214450.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   buttonText: "Order Now",
  // },
];

const ExploreCategories = () => {
  const navigate = useNavigate();

  const handleExploreClick = (categoryTitle) => {
    const categorySlug = encodeURIComponent(categoryTitle);
    navigate(`/category/${categorySlug}`);
  };

  return (
    <div className="mobile-explore-section">
      <h4 className="mobile-explore-title">Explore More Categories</h4>
      <div className="mobile-category-cards">
        {categories.map((cat, index) => (
          <div className="mobile-category-card" key={index}>
            <img src={cat.image} alt={cat.title} className="mobile-category-image" />
            <h3 className="mobile-category-title">{cat.title}</h3>
            <button className="mobile-explore-category-button"
              onClick={() => handleExploreClick(cat.title)}
            >{cat.buttonText}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCategories;
