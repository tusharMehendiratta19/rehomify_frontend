import React from "react";
import "../allStyles/testimonials.css"; // Importing the CSS file for styling

const testimonials = [
  {
    id: "ORD12345",
    name: "Priya Sharma",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    feedback: "Excellent service and super fast delivery. Highly recommend!",
  },
  {
    id: "ORD12346",
    name: "Rahul Verma",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    feedback: "Very satisfied with the product quality and support.",
  },
  {
    id: "ORD12347",
    name: "Anjali Mehta",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    feedback: "Good experience overall, though packaging could be improved.",
  },
];

const Testimonials = () => {
  return (
    <div className="mobile-seller-testimonials-container">
      <h4 className="mobile-seller-testimonials-title">Customer Testimonials</h4>
      <div className="mobile-seller-testimonials-scroll">
        {testimonials.map((t, index) => (
          <div className="mobile-seller-testimonial-card" key={index}>
            <img
              src={t.image}
              alt={t.name}
              className="mobile-seller-testimonial-img"
            />
            <h3 className="mobile-seller-testimonial-name">{t.name}</h3>
            <p className="mobile-seller-testimonial-order">Order ID: {t.id}</p>
            <div className="mobile-seller-testimonial-rating">
              {"★".repeat(t.rating)}
              {"☆".repeat(5 - t.rating)}
            </div>
            <p className="mobile-seller-testimonial-feedback">"{t.feedback}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
