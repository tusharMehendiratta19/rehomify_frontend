import React, { useState } from "react";
// import "../allStyles/cartsummary.css";
import { useNavigate } from "react-router-dom";


const CartSummary = ({ items, showSnackbar, navigate }) => {
  const [couponVisible, setCouponVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [applied, setApplied] = useState(null);

  const coupons = [
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
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const delivery = 40;
  const discount = applied
    ? applied.amount ?? Math.round((subtotal * applied.percentage) / 100)
    : 0;
  const total = subtotal + delivery - discount;

  const applyCoupon = code => {
    const c = coupons.find(c => c.code === code);
    setApplied(c);
    setSelectedCode(code);
    showSnackbar(c ? "Coupon applied" : "Invalid code");
  };

  return (
    <div className="cart-additional">
      <div className="apply-offer">
        <label>Apply Offer Code</label>
        <input
          value={selectedCode}
          onChange={e => setSelectedCode(e.target.value)}
          onFocus={() => setCouponVisible(true)}
          onBlur={() => setTimeout(() => setCouponVisible(false), 200)}
          placeholder="Enter coupon code"
        />
        {couponVisible && (
          <ul className="coupon-list">
            {coupons.map(c => (
              <li
                key={c.code}
                onClick={() => applyCoupon(c.code)}
                className="coupon-item"
              >
                <strong>{c.code}</strong> – {c.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="price-details">
        <h5>Price Details</h5>
        <p>Product: ₹{subtotal}</p>
        <p>Delivery: Free</p>
        {applied && (
          <p className="discount-text">Discount ({applied.code}): −₹{discount}</p>
        )}
        <p><strong>Total: ₹{total}</strong></p>
      </div>
{/* 
      <div className="address-section">
        <label>Delivery Address</label>
        <textarea rows={3} placeholder="Enter your address" />
      </div> */}

      <button className="payment-btn" onClick={() => navigate("/checkout")}>
        Continue to Payment
      </button>
    </div>
  );
};


export default CartSummary;