import React, { useState, useEffect } from "react";
import "../allStyles/cartcard.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import CartSummary from "./CartSummary"; // Assuming CartSummary is in the same directory

const CartCard = () => {
  const [cartItems, setCartItems] = useState([]);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.post("https://rehomify.in/v1/cart/getCartItems", {
        custId: localStorage.getItem("custId"),
      });
      console.log("Cart items fetched:", res.data);
      setCartItems(res.data || []);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  const handleProductClick = (id) => {
    console.log("Product clicked with ID:", id);
    navigate(`/product/${id}`);
  };

  const handleRemove = (id) => async () => {
    try {
      await axios.post("https://rehomify.in/v1/cart/removeFromCart", {
        custId: localStorage.getItem("custId"),
        productId: id,
      });
      setCartItems((prev) => prev.filter(item => item.id !== id));
      showSnackbar("Product removed from cart");
    } catch (e) {
      console.error("Remove failed", e);
    }
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const showSnackbar = msg => {
    setSnackbarMsg(msg);
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="empty-cart">Your cart is empty!</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="cart-wrapper">
        {Array.isArray(cartItems) ? cartItems.map(item => (
          <div className="laptop-cart-card" key={item.id}>
            <img src={item.imageUrl} alt={item.name} onClick={() => handleProductClick(item.id)} />
            <div className="laptop-cart-info">
              <h2 onClick={() => handleProductClick(item.id)}>{item.name}</h2>
              <br/>
              <p>{item.description}</p>
              <br/>
              <p><strong>Price:</strong> ₹{item.price}</p>

              <div className="laptop-quantity-control">
                <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, +1)}>+</button>
              </div>
              <br />
              <button className="laptop-remove-btn" onClick={handleRemove(item.id)}>
                Remove
              </button>
            </div>
          </div>
        )) : <div>Your Cart is Empty</div>}

        {/* Summary and coupon section */}
        <CartSummary items={cartItems} showSnackbar={showSnackbar} navigate={navigate} />
      </div>

      {snackbarVisible && (
        <div className="snackbar">
          {snackbarMsg}
        </div>
      )}

      <Footer />
    </>
  );
};

export default CartCard;
