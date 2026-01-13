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
import ResellOrderDetails from "./components/ResellOrderCard";
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
import { CartProvider } from "../data/CartContext"

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
import MobileSellerAddProduct from "./sellers/components/MobileSellerAddProduct";
import Snackbar from "./components/Snackbar";
import OrdersPage from "./components/OrdersPage";
import TNC from "./components/TNC";
import ChooseWardrobe from "./components/ChooseWardrobe";
import FurnishMumbai from "./components/FurnishMumbai";
import RentingVsBuying from "./components/RentingvsBuying";
import BudgetFriendly from "./components/BudgetFriendly";
import DoubleBedBlog from "./components/DoubleBedBlog";
import SingleBedBlog from "./components/SingleBedBlog";
import TableBlog from "./components/TableBlogs";
import BuybackPolicy from "./components/BuybackPolicy";

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
    
    <CartProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tnc" element={<TNC />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/cart" element={<CartCard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/resell" element={<ResellOrders />} />
          <Route path="/resellOrderPage" element={<ResellOrderDetails />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/ordersPage" element={<OrdersPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sellOptions" element={<SellOption />} />
          <Route path="/bbp" element={<BuybackPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/blogs/furnish" element={<FurnishMumbai />} />
          <Route path="/blogs/wardrobe" element={<ChooseWardrobe />} />
          <Route path="/blogs/rentVsBuy" element={<RentingVsBuying />} />
          <Route path="/blogs/budgetFriendly" element={<BudgetFriendly />} />
          <Route path="/blogs/doubleBed" element={<DoubleBedBlog />} />
          <Route path="/blogs/singleBed" element={<SingleBedBlog />} />
          <Route path="/blogs/table" element={<TableBlog />} />
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
            <Route path="addProduct" element={<MobileSellerAddProduct />} />
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
      <Snackbar />
    </CartProvider>
  );
}

export default MobileApp;
