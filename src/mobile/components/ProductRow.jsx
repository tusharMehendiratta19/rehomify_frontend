import React, { useRef, useState, useEffect } from "react";
import "../allStyles/productrow.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductRow = ({ title, type, allproducts }) => {
  const scrollContainerRef = useRef(null);
  const products = allproducts || [];
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const isLoggedIn = !!localStorage.getItem("token") && !!localStorage.getItem("custId");

  useEffect(() => {
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

    if (isLoggedIn) {
      fetchCustomerDetails();
    }
  }, []);

  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
    setTimeout(() => setSnackbar({ open: false, message: "" }), 3000);
  };

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = window.innerWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const addToCart = async (productId) => {
    if (!isLoggedIn) return showSnackbar("Please login to add items to cart");
    try {
      const res = await axios.post("https://rehomify.in/v1/cart/addToCart", {
        custId: localStorage.getItem("custId"),
        productId
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status) {
        setCartItems(prev => [...prev, productId]);
        showSnackbar("Added to Cart");
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
      showSnackbar("Error adding to Cart");
    }
  };

  const buyNow = async (productId, price) => {
    if (!isLoggedIn) return showSnackbar("Please login to proceed");

    try {
      navigate("/checkout", { state: { productId, fromCart: true, total: price } });
    } catch (err) {
      console.error("Buy Now failed:", err);
      showSnackbar("Error proceeding to Buy Now");
    }
  };

  const toggleWishlist = async (productId) => {
    if (!isLoggedIn) return showSnackbar("Please login to wishlist");

    if (wishlist.includes(productId)) {
      try {
        const res = await axios.post("https://rehomify.in/v1/wishlist/updateWishlist", {
          custId: localStorage.getItem("custId"),
          productId,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status) {
          setWishlist(wishlist.filter(id => id !== productId));
          showSnackbar("Removed from Wishlist");
        }
      } catch (err) {
        console.error("Remove from wishlist error:", err);
        showSnackbar("Error removing from Wishlist");
      }
    } else {
      try {
        const res = await axios.post("https://rehomify.in/v1/wishlist/addToWishlist", {
          custId: localStorage.getItem("custId"),
          productId,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status) {
          setWishlist(prev => [...prev, productId]);
          showSnackbar("Added to Wishlist");
        }
      } catch (err) {
        console.error("Add to wishlist error:", err);
        showSnackbar("Error adding to Wishlist");
      }
    }
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
          <div key={product._id} className="pr-mobile-product-cardproduct-card">
            <div className="pr-mobile-product-cardproduct-card-upper">
              <div className="mobile-product-image-wrapper" onClick={() => handleProductClick(product._id)}>
                <img src={product.image} alt={product.name} className="pr-mobile-product-cardproduct-image" />
                <button
                  className="wishlist-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product._id);
                  }}
                >
                  {wishlist.includes(product._id) ? <AiFillHeart color="red" /> : <FiHeart />}
                </button>
              </div>
              <h3 className="mobile-product-name" onClick={() => handleProductClick(product._id)}>{product.name}</h3>
            </div>

            <div className="mobile-product-info">
              <p className="mobile-product-description" onClick={() => handleProductClick(product._id)}>Color: {product.color}</p>
              <p className="mobile-product-price" onClick={() => handleProductClick(product._id)}>Price: ₹{product.price}</p>
              <div className="product-actions">
                {cartItems.includes(product._id) ? (
                  <button className="btn-outline" onClick={(e) => { e.stopPropagation(); navigate("/cart"); }}>
                    Go To Cart
                  </button>
                ) : (
                  <button className="btn-outline" onClick={(e) => { e.stopPropagation(); addToCart(product._id); }}>
                    Add To Cart
                  </button>
                )}

                <button className="btn-primary" onClick={(e) => { e.stopPropagation(); buyNow(product._id, product.price); }}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {snackbar.open && <div className="snackbar">{snackbar.message}</div>}
    </div>
  );
};

export default ProductRow;
