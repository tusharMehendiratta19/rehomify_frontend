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
import SellerHubLayout from "./sellers/components/SellerHubLayout";
import SellerHome from "./sellers/components/SellerHome";
import SellerDashboard from "./sellers/components/SellerDashboard";
import SellerProducts from "./sellers/components/SellerProducts";
import SellerOrders from "./sellers/components/SellerOrders";
import SellerReturns from "./sellers/components/SellerReturns";
import SellerTransactions from "./sellers/components/SellerTransactions";
import SellerReviews from "./sellers/components/SellerReviews";
import SellerNote from "./sellers/components/SellerNote";
import SellerOverview from "./sellers/components/SellerOverview"; // if used elsewhere
import AddProductForm from "./sellers/components/SellerAddProduct";

function LaptopApp() {
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
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/orders" element={<Orders />} />
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

        {/* Seller Routes under SellerHubLayout */}
        <Route path="/seller" element={<SellerHubLayout />}>
          <Route path="addProduct" element={<AddProductForm />} />
          <Route path="home" element={<SellerHome />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="returns" element={<SellerReturns />} />
          <Route path="transactions" element={<SellerTransactions />} />
          <Route path="reviews" element={<SellerReviews />} />
          <Route path="note" element={<SellerNote />} />
          {/* Optional: If SellerOverview is needed */}
          <Route path="overview" element={<SellerOverview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default LaptopApp;
