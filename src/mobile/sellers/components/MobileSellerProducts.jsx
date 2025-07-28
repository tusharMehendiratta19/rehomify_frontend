import React, { useEffect, useState } from "react";
import axios from "axios";
import "../sellerstyles/sellerProducts.css";

const categories = ["All", "Chair", "Table", "Single Bed", "Double Bed", "Cupboard"];

const categoryMapping = {
  Chair: ["chairs"],
  Table: ["tables", "table"],
  Sofa: ["sofas"],
  "Single Bed": ["single_bed"],
  "Double Bed": ["double_bed"],
  Cupboard: ["cup_board"],
};

const MobileSellerProducts = () => {
  const [activeBtn, setActiveBtn] = useState("All");
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://rehomify.in/v1/products/");
        const productsByCategory = res.data;

        // Flatten all products into one array with added 'tag' field
        const flatProducts = Object.entries(productsByCategory).flatMap(
          ([key, items]) => {
            return items.map((item) => ({
              ...item,
              tag: key,
            }));
          }
        );

        setAllProducts(flatProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      activeBtn === "All" ||
      (categoryMapping[activeBtn] &&
        categoryMapping[activeBtn].includes(product.tag));
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mobile-seller-products-container">
      <div className="mobile-category-grid">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`mobile-seller-nav-btn ${activeBtn === cat ? "mobile-active" : ""}`}
            onClick={() => setActiveBtn(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="mobile-search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="mobile-products-grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="mobile-product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p style={{ color: "#777" }}>{p.color}</p>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSellerProducts;
