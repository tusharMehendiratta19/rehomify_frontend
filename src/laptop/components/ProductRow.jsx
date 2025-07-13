import React, { useRef } from "react";
import "../allStyles/productrow.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductRow = ({ title, type, allproducts }) => {
  const products = allproducts || [];
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = window.innerWidth / 2;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="product-row">
      <h2 className="product-row-title"><b>{title}</b></h2>
      <div className="scroll-button-container">
        <button
          className="scroll-button left"
          onClick={() => handleScroll("left")}
        >
          <FaChevronLeft />
        </button>
        <button
          className="scroll-button right"
          onClick={() => handleScroll("right")}
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="product-scroll-container" ref={scrollContainerRef}>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-actions">
              <button className="btn-outline" data-protected="true">
                Add to Cart
              </button>
              <button className="btn-primary" data-protected="true">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRow;
