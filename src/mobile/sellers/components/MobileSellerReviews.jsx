// src/pages/seller/Reviews.js
import React from "react";
import MobileSellerNav from "./MobileSellerNav";
import MobileSellerHeader from "./MobileSellerHeader";
import "../sellerstyles/sellerReview.css";


const reviews = [
  { order: "ORD1234", rating: 4, desc: "Great product, fast delivery!" },
  { order: "ORD5678", rating: 5, desc: "Excellent quality, will buy again." },
  { order: "ORD9101", rating: 3, desc: "Good but packaging was not great." },
  { order: "ORD1121", rating: 5, desc: "Perfect product, very satisfied." },
];

const MobileSellerReviews = () => (
  <>
    
    <div className="seller-reviews-container">
      <div>
        {reviews.map((r, i) => (
          <div key={i} className="review-card">
            <h4>Order: {r.order}</h4>
            <p className="rating">Rating: {"⭐".repeat(r.rating)}</p>
            <p>{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default MobileSellerReviews;
