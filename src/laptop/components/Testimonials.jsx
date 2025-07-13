import React from "react";
import "../allStyles/testimonials.css"; // Importing the CSS file for styling


const Testimonials = ({reviews}) => {
  const testimonials = reviews
  console.log(testimonials)
  return (
    <div className="seller-testimonials-container">
      <h2 className="seller-testimonials-title">Customer Testimonials</h2>
      <div className="seller-testimonials-row">
        {testimonials.map((t, index) => (
          <div className="seller-testimonial-card" key={index}>
            <img
              src={t.imageUrl}
              alt={t.customerName}
              className="seller-testimonial-img"
            />
            <h3 className="seller-testimonial-name">{t.customerName}</h3>
            <p className="seller-testimonial-order">Order ID: {t.orderId}</p>
            <div className="seller-testimonial-rating">
              {"★".repeat(t.rating)}
              {"☆".repeat(5 - t.rating)}
            </div>
            <p className="seller-testimonial-feedback">"{t.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
