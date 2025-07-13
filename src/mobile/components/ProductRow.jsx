import React, { useRef } from "react";
import "../allStyles/productrow.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const ProductRow = ({ title, type, allproducts }) => {
  const scrollContainerRef = useRef(null);
  const products = allproducts || [];

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = window.innerWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="pr-mobile-product-cardproduct-row">
      <h4 className="pr-mobile-product-cardproduct-row-title">{title}</h4>

      <div className="pr-mobile-product-cardscroll-btns">
        <button className="pr-mobile-product-cardscroll-btn left" onClick={() => handleScroll("left")}>
          <FaChevronLeft />
        </button>
        <button className="pr-mobile-product-cardscroll-btn right" onClick={() => handleScroll("right")}>
          <FaChevronRight />
        </button>
      </div>

      <div className="pr-mobile-product-cardproduct-scroll-container" ref={scrollContainerRef}>
        {products.map((product) => (
          <div key={product.id} className="pr-mobile-product-cardproduct-card">
            <img src={product.image} alt={product.name} className="pr-mobile-product-cardproduct-image" />
            <h3 className="pr-mobile-product-cardproduct-name">{product.name}</h3>
            <p className="pr-mobile-product-cardproduct-description">{product.description}</p>
            <div className="pr-mobile-product-cardproduct-actions">
              <button className="pr-mobile-product-cardbtn-outline">Add to Cart</button>
              <button className="pr-mobile-product-cardbtn-primary">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRow;
