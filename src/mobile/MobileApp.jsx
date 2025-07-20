// src/LaptopApp.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Page imports
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProductPage from "./components/ProductPage";
import Products from "./pages/Products";
import ForgotPassword from "./pages/ForgotPassword";
import CartCard from "./components/CartCard";
import ResellOrders from "./components/ResellOrders";
import Offers from "./pages/Offers";
import Trends from "./components/Trends";
import Orders from "./components/Orders";
import Returns from "./components/Returns";
import Profile from "./components/Profile";
import FAQ from "./components/FAQ";
import AboutUs from "./components/AboutUs";
import Checkout from "./components/Checkout";
import ExploreMoreProductsPage from "./components/ExploreMoreProductsPage";
import SellOption from "./components/SellOption";
import Wishlist from "./components/Wishlist";

// Seller-related imports
import MobileSellerHubLayout from "./sellers/components/MobileSellerHubLayout";
import MobileSellerLayout from "./sellers/components/MobileSellerLayout"; // if used elsewhere
import MobileSellerHome from "./sellers/components/MobileSellerHome";
import MobileSellerDashboard from "./sellers/components/MobileSellerDashboard";
import MobileSellerProducts from "./sellers/components/MobileSellerProducts";
import MobileSellerOrders from "./sellers/components/MobileSellerOrders";
import MobileSellerReturns from "./sellers/components/MobileSellerReturns";
import MobileSellerTransactions from "./sellers/components/MobileSellerTransactions";
import MobileSellerReviews from "./sellers/components/MobileSellerReviews";
import MobileSellerNote from "./sellers/components/MobileSellerNote";
import MobileSellerOverview from "./sellers/components/MobileSellerOverview"; // if used elsewhere

function MobileApp() {
  const [userType, setUserType] = useState(null);

  const handleLogin = (username) => {
    const role = username.toLowerCase();
    if (role === "seller" || role === "customer") {
      setUserType(role);
    } else {
      alert("Invalid user. Please use 'seller' or 'customer'");
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/cart" element={<CartCard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/resell" element={<ResellOrders />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sellOptions" element={<SellOption />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/category/:categoryName" element={<ExploreMoreProductsPage />} />

        {/* Role-Based Redirect from /dashboard */}
        <Route
          path="/dashboard"
          element={
            userType === "seller" ? (
              <Navigate to="/seller/dashboard" />
            ) : userType === "customer" ? (
              <Home />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Seller Routes under MobileSellerHubLayout */}
        <Route path="/seller" element={<MobileSellerHubLayout />}>
          <Route path="home" element={<MobileSellerHome />} />
          <Route path="dashboard" element={<MobileSellerDashboard />} />
          <Route path="products" element={<MobileSellerProducts />} />
          <Route path="orders" element={<MobileSellerOrders />} />
          <Route path="returns" element={<MobileSellerReturns />} />
          <Route path="transactions" element={<MobileSellerTransactions />} />
          <Route path="reviews" element={<MobileSellerReviews />} />
          <Route path="note" element={<MobileSellerNote />} />
          {/* Optional: If MobileSellerOverview is needed */}
          <Route path="overview" element={<MobileSellerOverview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default MobileApp;
