import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../allStyles/products.css";
import ProductPage from "../components/ProductPage";
import { useNavigate } from "react-router-dom";
import dummyProducts from "../../data/dummyProductData";

const categories = [
  "All Products",
  "Single Bed",
  "Double Bed",
  "Cup board",
  "Tables",
  "Chairs",
  "Sofas",
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
  const [selected, setSelected] = useState('New');
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

  return (
    <div>
      <Header />
      <div className="laptop-products-page">
        {/* Sidebar */}
        <aside className="laptop-sidebar">
          <h2 className="laptop-sidebar-title">Categories</h2>
          <ul className="laptop-category-list">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`laptop-category-item ${selectedCategory === cat ? "laptop-active-category" : ""}`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <main className="laptop-product-content">
          <div className="laptopfilterandsort">
            <div className="laptop-category-toolbar">
              <h2 className="laptop-category-heading">{selectedCategory}</h2>
              <div className="laptop-filter-sort-controls">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="laptop-sort-select"
                >
                  <option value="plh">Sort by Price - Low to High</option>
                  <option value="phl">Sort by Price - High to Low</option>
                  <option value="dtlm">Delivery Time - Less to More</option>
                  <option value="dlml">Delivery Time - More to Less</option>
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="laptop-btn-outline-filters"
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

              <div className="toggle-wrapper">
                <div className="toggle-buttons">
                  <button
                    className={`toggle-btn ${selected === 'New' ? 'active' : ''}`}
                    onClick={() => setSelected('New')}
                  >
                    New
                  </button>
                  <button
                    className={`toggle-btn ${selected === 'Refurbished' ? 'active' : ''}`}
                    onClick={() => setSelected('Refurbished')}
                  >
                    Refurbished
                  </button>
                </div>
                <p className="toggle-status">
                  Showing <span className="highlight">{selected}</span>
                </p>
              </div>

            </div>

            {showFilters && (
              <div className="laptop-filter-panel">
                <div className="laptop-filter-group-1">
                  <label>Price Range:</label>
                  <select
                    onChange={(e) => {
                      const [min, max] = e.target.value
                        .split("-")
                        .map((v) =>
                          v === "Infinity" ? Infinity : parseInt(v, 10)
                        );
                      setPriceRange([min, max]);
                    }}
                  >
                    <option value="0-Infinity">All</option>
                    <option value="0-2000">Below ₹2000</option>
                    <option value="2000-4000">₹2000 - ₹4000</option>
                    <option value="4000-Infinity">Above ₹4000</option>
                  </select>
                </div>

                <div className="laptop-filter-group-2">
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
          </div>

          {/* Product Listing */}
          <div className="laptop-product-list">
            {getCategoryProducts().map((product) => (
              <div
                key={product.id}
                className="laptop-product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="laptop-product-image"
                />
                <div className="laptop-product-info">
                  <h3 className="laptop-product-name">{product.name}</h3>
                  <p className="laptop-product-description">
                    {product.description}
                  </p>
                  <p className="laptop-product-price">Price: ₹{product.price}</p>
                  <p className="laptop-product-color">Color: {product.color}</p>
                  <p className="laptop-product-deliveryTime">
                    Delivery Time: {product.deliveryTime} days
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
      <ProductPage />
    </div>
  );
};

export default Products;
