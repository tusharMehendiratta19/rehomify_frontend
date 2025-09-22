import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const custId = localStorage.getItem("custId");
  // Fetch cart count from API
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get(
          `https://rehomify.in/v1/auth/getCustomerDetails/${custId}`
        );
        console.log("Cart details response:", response);
        const data = response.data?.data?.cart?.length || 0;
        setCartCount(data);
      } catch (error) {
        setCartCount(0);
      }
    };
    fetchCartCount();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.get(
        `https://rehomify.in/v1/auth/getCustomerDetails/${custId}`
      );
      const data = response.data?.data?.cart?.length || 0;
      setCartCount(data);
    } catch (error) {
      setCartCount(0);
    }
  };

  const removeFromCart = async (productId) => {
    try {
        const response = await axios.get(
          `https://rehomify.in/v1/auth/getCustomerDetails/${custId}`
        );
        const data = response.data?.data?.cart?.length || 0;
        setCartCount(data);
      } catch (error) {
        setCartCount(0);
      }
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  // console.log("CartContext value:", ctx);
  return ctx;
};

