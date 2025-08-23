import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import Footer from "../components/Footer";
import "../allStyles/products.css";
import ProductPage from "../components/ProductPage";
import { useNavigate } from "react-router-dom";
import dummyProducts from "../../data/dummyProductData";
import { AiFillHeart } from "react-icons/ai";    // Filled heart
import { FiHeart } from "react-icons/fi";     // Outline heart
import Loader from "../components/Loader";
import AddProductForm from "../sellers/components/MobileSellerAddProduct";

const categories = [
  "All Products",
  "Single Bed",
  "Double Bed",
  "Cupboard",
  "Tables",
  "Chairs",
];

const categoryMap = {
  "All Products": "all",
  "Single Bed": "single_bed",
  "Double Bed": "double_bed",
  "Cupboard": "cupboard",
  Tables: "tables",
  Chairs: "chairs"
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState('New');
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token") && !!localStorage.getItem("custId");

  const [allProducts, setAllProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const res = await axios.get('https://rehomify.in/v1/products/');
        setAllProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    const fetchCustomerDetails = async () => {
      try {
        const res = await axios.get(`https://rehomify.in/v1/auth/getCustomerDetails/${localStorage.getItem("custId")}`);
        if (res.data?.status) {
          const { cart = [], wishlist = [] } = res.data.data;
          setCartItems(cart.map(p => p.productId));
          setWishlist(wishlist.map(p => p.productId));
        }
      } catch (err) {
        console.error("Error fetching customer details:", err);
      }
    };

    fetchproducts();
    if (isLoggedIn) {
      fetchCustomerDetails();
    }
  }, []);

  const addToCart = async (productId) => {
    if (!isLoggedIn) {
      showSnackbar("Please login to add items to cart");
      return;
    }
    try {
      const response = await axios.post('https://rehomify.in/v1/cart/addToCart', {
        custId: localStorage.getItem("custId"),
        productId: productId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.status) {
        showSnackbar("Added to Cart");
        setCartItems(prev => [...prev, productId]);
      } else {
        showSnackbar("Error adding to Cart");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showSnackbar("Error adding to Cart");
    }
  }

  const buyNow = async (productId) => {
    if (!isLoggedIn) {
      showSnackbar("Please login to buy products");
      return;
    }
    try {
      const response = await axios.post('https://rehomify.in/v1/cart/addToCart', {
        custId: localStorage.getItem("custId"),
        productId: productId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.status) {
        navigate('/checkout', { state: { productId, fromCart: true } });
      } else {
        showSnackbar("Error proceeding to Buy Now");
      }
    } catch (error) {
      console.error('Error proceeding to Buy Now:', error);
      showSnackbar("Error proceeding to Buy Now");
    }
  }

  const addToWishlist = async (productId) => {
    if (!isLoggedIn) {
      showSnackbar("Please login to add items to wishlist");
      return;
    }
    try {
      const response = await axios.post('https://rehomify.in/v1/wishlist/addToWishlist', {
        custId: localStorage.getItem("custId"),
        productId: productId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.status) {
        setWishlist(prev => [...prev, productId]);
        showSnackbar("Added to Wishlist");
      } else if (response.message == "wishlisted already") {
        const removefromwishlist = await axios.post('https://rehomify.in/v1/wishlist/updateWishlist', {
          custId: localStorage.getItem("custId"),
          productId: productId,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (removefromwishlist.status) {
          setWishlist(wishlist.filter(item => item !== productId));
          showSnackbar("Removed from Wishlist");
        }
      } else {
        showSnackbar("Error adding to Wishlist");
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      showSnackbar("Error adding to Wishlist");
    }
  }

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setTimeout(() => setSnackbarOpen(false), 3000);
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getCategoryProducts = () => {
    const key = categoryMap[selectedCategory];
    let products = key === "all"
      ? Object.values(allProducts).flat()
      : allProducts[key] || [];

    products = products.filter((product) => {
      const price = product?.price ?? 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (selectedColor) {
      products = products.filter(
        (product) =>
          product?.color?.toLowerCase() === selectedColor.toLowerCase()
      );
    }

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
              <div className="mobile-toggle-buttons">
                <button
                  className={`mobile-toggle-btn ${selected === 'New' ? 'active' : ''}`}
                  onClick={() => setSelected('New')}
                >
                  New
                </button>
                <button
                  className={`mobile-toggle-btn ${selected === 'Refurbished' ? 'active' : ''}`}
                  onClick={() => setSelected('Refurbished')}
                >
                  Refurbished
                </button>
              </div>

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
            {filteredProducts.map((product) => (
              <div key={product.id} className="mobile-main-product-card">
                <div className="mobile-main-product-card-upper">
                  <div className="mobile-product-image-wrapper" onClick={() => handleProductClick(product.id)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mobile-product-image"
                    />
                    <button
                      className="wishlist-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(product.id);
                      }}
                    >
                      {wishlist.includes(product.id) ? (
                        <FiHeart />
                      ) : (
                        <AiFillHeart color="red" />
                      )}
                    </button>
                  </div>

                  <div className="mobile-product-info">
                    <h3 className="mobile-main-product-name" onClick={() => handleProductClick(product.id)}>{product.name}</h3>
                    <p className="mobile-product-description" onClick={() => handleProductClick(product.id)}>{product.description}</p>

                    {/* Updated price display */}

                  </div>
                </div>
                <div className="mobile-product-card-bottom">
                  <p className="mobile-product-price" onClick={() => handleProductClick(product.id)}>
                    Price: ₹
                    {product.varieties && product.varieties.length > 0
                      ? product.varieties[0].price
                      : product.price}
                  </p>
                  <div className="product-actions">
                    {cartItems.includes(product.id) ? (
                      <button
                        className="btn-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/cart");
                        }}
                      >
                        Go To Cart
                      </button>
                    ) : (
                      <button
                        className="btn-outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                      >
                        Add To Cart
                      </button>
                    )}

                    <button className="btn-primary" onClick={(e) => {
                      e.stopPropagation();
                      buyNow(product.id);
                    }}>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="addnewbycx">
            <span>Add Your Own Product: </span>
            <div className="mobile-add-product-btn" title="Add your own product" onClick={() => setShowFormPopup(true)}>
              +
            </div>
          </div>
        </main>
      </div>

      {snackbarOpen && (
        <div className="snackbar">{snackbarMessage}</div>
      )}

      {showFormPopup && (
        <div className="mobile-form-popup-overlay" onClick={() => setShowFormPopup(false)}>
          <div className="mobile-form-popup" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-popup-close" onClick={() => setShowFormPopup(false)}>×</button>
            <AddProductForm />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Products;
