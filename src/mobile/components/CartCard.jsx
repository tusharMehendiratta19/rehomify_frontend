import React, { useState } from "react";
import "../allStyles/cartcard.css"; // Importing the CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const CartCard = () => {
  const product = {
    id: "PRD001",
    name: "Wooden Chair",
    description: "Portable speaker with 10W output, 8h battery life.",
    price: 1499,
    image:
      "https://images.pexels.com/photos/31519049/pexels-photo-31519049/free-photo-of-rustic-wooden-chair-in-outdoor-garden-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  };

  const [quantity, setQuantity] = useState(1);
  const [couponListVisible, setCouponListVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const navigate = useNavigate();

  const availableCoupons = [
    {
      id: 1,
      type: "Bank Offer",
      description: "Get 10% off with HDFC Credit Cards",
      code: "HDFC10",
      percentage: 10,
    },
    {
      id: 2,
      type: "Bank Offer",
      description: "5% cashback on ICICI Debit Cards",
      code: "ICICI5",
      percentage: 5,
    },
    { id: 3, type: "Bank Offer", description: "No Cost EMI on SBI Cards", code: "SBIEMI" },
    {
      id: 4,
      type: "Wallet Offer",
      description: "Flat ₹100 off with Paytm Wallet",
      code: "PAYTM100",
      amount: 100,
    },
    {
      id: 5,
      type: "Wallet Offer",
      description: "Extra ₹50 cashback with PhonePe",
      code: "PHONEPE50",
      amount: 50,
    },
    {
      id: 6,
      type: "Wallet Offer",
      description: "20% off using Amazon Pay",
      code: "AMAZONPAY20",
      percentage: 20,
    },
    {
      id: 7,
      type: "New User Offer",
      description: "₹150 off for new users on first purchase",
      code: "FIRST150",
      amount: 150,
    },
    {
      id: 8,
      type: "New User Offer",
      description: "Sign-up bonus of ₹200 for new users",
      code: "SIGNUP200",
      amount: 200,
    },
    {
      id: 9,
      type: "Website Offer",
      description: "Extra 15% off on ReHomify exclusive sale",
      code: "NEW15",
      percentage: 15,
    },
    {
      id: 10,
      type: "Website Offer",
      description: "Get ₹500 off on orders above ₹4999",
      code: "EXTRA500",
      amount: 500,
    },
  ];

  const totalProductPrice = product.price * quantity;
  const deliveryCharge = 40;

  const handleRemoveFromCart = () => {
    alert("Product removed from cart!");
    // Add logic to remove item from cart state here
  };

  const handleCouponSelect = (coupon) => {
    setSelectedCoupon(coupon.code);
    setAppliedCoupon(coupon);
    setCouponListVisible(false);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.amount) {
      return appliedCoupon.amount;
    } else if (appliedCoupon.percentage) {
      return Math.round((totalProductPrice * appliedCoupon.percentage) / 100);
    }
    return 0;
  };

  const discountAmount = calculateDiscount();
  const totalAmount = totalProductPrice + deliveryCharge - discountAmount;

  return (
    <div>
      <Header />
      <div className="cart-wrapper">
        <div className="cart-card">
          <img src={product.image} alt={product.name} />
          <div className="cart-info">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>

            <div className="quantity-control">
              <button onClick={() => setQuantity((q) => Math.max(q - 1, 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <button className="remove-btn" onClick={handleRemoveFromCart}>
              Remove
            </button>
          </div>
        </div>

        <div className="cart-additional">
          <div className="apply-offer">
            <label>Apply Offer Code</label>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={selectedCoupon}
              onChange={(e) => setSelectedCoupon(e.target.value)}
              onFocus={() => setCouponListVisible(true)}
              onBlur={() => setTimeout(() => setCouponListVisible(false), 200)}
            />

            {couponListVisible && (
              <ul className="coupon-list">
                {availableCoupons.map((coupon) => (
                  <li
                    key={coupon.code}
                    onClick={() => handleCouponSelect(coupon)}
                    className="coupon-item"
                  >
                    <strong>{coupon.code}</strong> – {coupon.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="price-details">
            <h5>Price Details</h5>
            <p>Product Price: ₹{totalProductPrice}</p>
            <p>Delivery Charges: ₹{deliveryCharge}</p>
            {appliedCoupon && (
              <p className="discount-text">
                Discount ({appliedCoupon.code}): −₹{discountAmount}
              </p>
            )}
            <p>
              <strong>Total: ₹{totalAmount}</strong>
            </p>
          </div>

          <div className="address-section">
            <label>Delivery Address</label>
            <textarea rows={3} placeholder="Enter your address here"></textarea>
          </div>

          <button className="payment-btn" onClick={() => navigate("/checkout")}>Continue to Payment</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartCard;
