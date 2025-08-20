import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import Footer from "../components/Footer";
import "../allStyles/products.css";
import ProductPage from "../components/ProductPage";
import { useNavigate } from "react-router-dom";
import dummyProducts from "../../data/dummyProductData";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import AddProductForm from "../sellers/components/SellerAddProduct";

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
  "Cup board": "cup_board",
  Tables: "tables",
  Chairs: "chairs",
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState("New");
  const [expanded, setExpanded] = useState({}); // description toggle per product

  // --- Added from mobile ---
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const isLoggedIn =
    !!localStorage.getItem("token") && !!localStorage.getItem("custId");
  // -------------------------

  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);

  const toggleDescription = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const res = await axios.get("https://rehomify.in/v1/products/");
        setAllProducts(res.data);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
      }
    };

    const fetchCustomerDetails = async () => {
      try {
        const res = await axios.get(
          `https://rehomify.in/v1/auth/getCustomerDetails/${localStorage.getItem(
            "custId"
          )}`
        );
        if (res.data?.status) {
          const { cart = [], wishlist = [] } = res.data.data || {};
          setCartItems(cart.map((p) => p.productId));
          setWishlist(wishlist.map((p) => p.productId));
        }
      } catch (err) {
        console.error("Error fetching customer details:", err);
      }
    };

    fetchproducts();
    if (isLoggedIn) {
      fetchCustomerDetails();
    }
  }, [isLoggedIn]);

  // --- Actions brought from mobile ---
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setTimeout(() => setSnackbarOpen(false), 3000);
  };

  const addToCart = async (productId) => {
    if (!isLoggedIn) {
      showSnackbar("Please login to add items to cart");
      return;
    }
    try {
      const response = await axios.post(
        "https://rehomify.in/v1/cart/addToCart",
        {
          custId: localStorage.getItem("custId"),
          productId: productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status) {
        showSnackbar("Added to Cart");
        setCartItems((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
      } else {
        showSnackbar("Error adding to Cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showSnackbar("Error adding to Cart");
    }
  };

  const buyNow = async (productId) => {
    if (!isLoggedIn) {
      showSnackbar("Please login to buy products");
      return;
    }
    try {
      const response = await axios.post(
        "https://rehomify.in/v1/cart/addToCart",
        {
          custId: localStorage.getItem("custId"),
          productId: productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status) {
        navigate("/checkout", { state: { productId, fromCart: true } });
      } else {
        showSnackbar("Error proceeding to Buy Now");
      }
    } catch (error) {
      console.error("Error proceeding to Buy Now:", error);
      showSnackbar("Error proceeding to Buy Now");
    }
  };

  const addToWishlist = async (productId) => {
    if (!isLoggedIn) {
      showSnackbar("Please login to add items to wishlist");
      return;
    }
    try {
      const response = await axios.post(
        "https://rehomify.in/v1/wishlist/addToWishlist",
        {
          custId: localStorage.getItem("custId"),
          productId: productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status) {
        setWishlist((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
        showSnackbar("Added to Wishlist");
      } else if (response.message === "wishlisted already") {
        // toggle off
        const remove = await axios.post(
          "https://rehomify.in/v1/wishlist/updateWishlist",
          {
            custId: localStorage.getItem("custId"),
            productId: productId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (remove.status) {
          setWishlist((prev) => prev.filter((id) => id !== productId));
          showSnackbar("Removed from Wishlist");
        }
      } else {
        showSnackbar("Error adding to Wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      showSnackbar("Error adding to Wishlist");
    }
  };
  // -----------------------------------

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getCategoryProducts = () => {
    const key = categoryMap[selectedCategory];
    let products =
      key === "all" ? Object.values(allProducts).flat() : allProducts[key] || [];

    // Apply price filter
    products = products.filter((product) => {
      const price =
        (product?.varieties && product.varieties[0]?.price) ??
        product?.price ??
        0;
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
      const aPrice =
        (a?.varieties && a.varieties[0]?.price) ?? a?.price ?? 0;
      const bPrice =
        (b?.varieties && b.varieties[0]?.price) ?? b?.price ?? 0;

      if (sortOrder === "plh") return aPrice - bPrice;
      if (sortOrder === "phl") return bPrice - aPrice;
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
                className={`laptop-category-item ${
                  selectedCategory === cat ? "laptop-active-category" : ""
                }`}
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
                    className={`toggle-btn ${selected === "New" ? "active" : ""}`}
                    onClick={() => setSelected("New")}
                  >
                    New
                  </button>
                  <button
                    className={`toggle-btn ${
                      selected === "Refurbished" ? "active" : ""
                    }`}
                    onClick={() => setSelected("Refurbished")}
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
            {getCategoryProducts().map((product) => {
              const displayPrice =
                (product?.varieties && product.varieties[0]?.price) ??
                product?.price ??
                0;

              return (
                <div
                  key={product.id}
                  className="laptop-product-card"
                  onClick={() => handleProductClick(product.id)}
                >
                  {/* image + wishlist */}
                  <div
                    className="laptop-product-image-wrapper"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="laptop-product-image"
                    />
                    <button
                      className="laptop-wishlist-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(product.id);
                      }}
                      title={
                        wishlist.includes(product.id)
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"
                      }
                    >
                      {wishlist.includes(product.id) ? (
                        <AiFillHeart color="red" />
                      ) : (
                        <FiHeart />
                      )}
                    </button>
                  </div>

                  <div className="laptop-product-info">
                    <h3
                      className="laptop-product-name"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {product.name}
                    </h3>

                    {/* Description with Read More (60 chars default) */}
                    <p
                      className="laptop-product-description"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {expanded[product.id]
                        ? product.description
                        : product.description.length > 60
                        ? product.description.substring(0, 60) + "... "
                        : product.description}

                      {product.description.length > 60 && (
                        <span
                          className="read-more"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDescription(product.id);
                          }}
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          {expanded[product.id] ? " Show Less" : " Read More"}
                        </span>
                      )}
                    </p>

                    {/* Price + Color */}
                    <div className="laptop-price-color">
                      <p className="laptop-product-price">Price: ₹{displayPrice}</p>
                      <p className="laptop-product-color">Color: {product.color}</p>
                    </div>

                    {/* Buttons */}
                    <div className="laptop-product-actions">
                      {cartItems.includes(product.id) ? (
                        <button
                          className="laptop-btn-outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/cart");
                          }}
                        >
                          Go To Cart
                        </button>
                      ) : (
                        <button
                          className="laptop-btn-outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product.id);
                          }}
                        >
                          Add to Cart
                        </button>
                      )}

                      <button
                        className="laptop-btn-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          buyNow(product.id);
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Your Own Product (from mobile, styled for laptop) */}
          <div className="laptop-addnewbycx">
            <span>Add Your Own Product:</span>
            <div
              className="laptop-add-product-btn"
              title="Add your own product"
              onClick={() => setShowFormPopup(true)}
            >
              +
            </div>
          </div>
        </main>
      </div>

      {/* Snackbar */}
      {snackbarOpen && <div className="snackbar">{snackbarMessage}</div>}

      {/* Add Product Popup */}
      {showFormPopup && (
        <div
          className="laptop-form-popup-overlay"
          onClick={() => setShowFormPopup(false)}
        >
          <div
            className="laptop-form-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="laptop-popup-close"
              onClick={() => setShowFormPopup(false)}
            >
              ×
            </button>
            <AddProductForm />
          </div>
        </div>
      )}

      <Footer />
      <ProductPage />
    </div>
  );
};

export default Products;
