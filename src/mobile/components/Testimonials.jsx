import React from "react";
import "../allStyles/testimonials.css"; // Importing the CSS file for styling

const Testimonials = ({reviews}) => {
  const testimonials = reviews
  return (
    <div className="mobile-seller-testimonials-container">
      <h4 className="mobile-seller-testimonials-title">Customer Testimonials</h4>
      <div className="mobile-seller-testimonials-scroll">
        {testimonials.map((t, index) => (
          <div className="mobile-seller-testimonial-card" key={index}>
            <img
              src={t.imageUrl}
              alt={t.customerName}
              className="mobile-seller-testimonial-img"
            />
            <h3 className="mobile-seller-testimonial-name">{t.customerName}</h3>
            <p className="mobile-seller-testimonial-order">Order ID: {t.orderId}</p>
            <div className="mobile-seller-testimonial-rating">
              {"★".repeat(t.rating)}
              {"☆".repeat(5 - t.rating)}
            </div>
            <p className="mobile-seller-testimonial-feedback">"{t.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
