import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../allStyles/products.css";
import ProductPage from "../components/ProductPage";
import { useNavigate } from "react-router-dom";
import dummyProducts from "../../data/dummyProductData";
import { FaSortAmountDownAlt, FaFilter } from "react-icons/fa";

const categories = [
  "All Products",
  "Single Bed",
  "Double Bed",
  "Cup board",
  "Tables",
  "Chairs",
];

const categoryMap = {
  "All Products": "all",
  "Single Bed": "single_bed",
  "Double Bed": "double_bed",
  "Cup board": "cupboard",
  Tables: "table",
  Chairs: "chair",
  Sofas: "sofa",
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getCategoryProducts = () => {
    const key = categoryMap[selectedCategory];
    let products =
      key === "all" ? Object.values(dummyProducts).flat() : dummyProducts[key] || [];

    // Apply price filter
    products = products.filter((product) => {
      const price = product?.price ?? 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply color filter
    if (selectedColor) {
      products = products.filter(
        (product) =>
          product?.color?.toLowerCase() === selectedColor.toLowerCase()
      );
    }

    // Apply sorting
    products.sort((a, b) => {
      if (sortOrder === "plh") return a.price - b.price;
      if (sortOrder === "phl") return b.price - a.price;
      if (sortOrder === "dtlm") return (a.deliveryTime ?? 0) - (b.deliveryTime ?? 0);
      if (sortOrder === "dlml") return (b.deliveryTime ?? 0) - (a.deliveryTime ?? 0);
      return 0;
    });

    return products;
  };

  const filteredProducts = getCategoryProducts();

  return (
    <div>
      <Header />
      <div className="mobile-products-page">
        <main className="mobile-product-content">
          <div className="mobile-filterandsort">
            <div className="mobile-category-scroll">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`mobile-category-btn ${selectedCategory === cat ? "mobile-active-category" : ""
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mobile-filter-sort-controls">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="mobile-sort-select"
              >
                <option value="">--Sort By--</option>
                <option value="plh">₹ Low to High</option>
                <option value="phl">₹ High to Low</option>
                <option value="dtlm">Fastest Delivery</option>
                <option value="dlml">Slowest Delivery</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="mobile-btn-outline-filters"
              >
                {showFilters ? "Hide" : "Filters"}
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mobile-filter-panel">
              <div className="mobile-filter-group">
                <label>Price:</label>
                <select
                  onChange={(e) => {
                    const [min, max] = e.target.value
                      .split("-")
                      .map((v) => (v === "Infinity" ? Infinity : parseInt(v, 10)));
                    setPriceRange([min, max]);
                  }}
                >
                  <option value="0-Infinity">All</option>
                  <option value="0-2000">Below ₹2000</option>
                  <option value="2000-4000">₹2000 - ₹4000</option>
                  <option value="4000-Infinity">Above ₹4000</option>
                </select>
              </div>

              <div className="mobile-filter-group">
                <label>Color:</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Brown">Brown</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Grey">Grey</option>
                </select>
              </div>
            </div>
          )}
          <div className="mobile-product-list">
            {getCategoryProducts().map((product) => (
              <div
                key={product.id}
                className="mobile-product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="mobile-product-image"
                />
                <div className="mobile-product-info">
                  <h3 className="mobile-product-name">{product.name}</h3>
                  <p className="mobile-product-description">
                    {product.description}
                  </p>
                  <p className="mobile-product-price">Price: ₹{product.price}</p>
                  <p className="mobile-product-color">Color: {product.color}</p>
                  <p className="mobile-product-deliveryTime">
                    Delivery Time: {product.deliveryTime} days
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Product Page section */}
          <ProductPage products={filteredProducts} onProductClick={handleProductClick} />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
