import React, { useState, useEffect } from 'react';
import '../allStyles/checkout.css';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const productId = location.state?.productId;
  console.log("Product ID from location state:", productId);
  const [product, setProduct] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`https://rehomify.in/v1/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="mobile-checkout-layout">
        <h2 className="mobile-checkout-title">CHECK-OUT</h2>

        <div className="mobile-checkout-sidebar">
          {product && (
            <details className="mobile-product-accordion">
              <summary>{product.name}</summary>
              <img src={product.image} alt={product.name} className="mobile-accordion-image" />
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p>{product.description}</p>
            </details>
          )}
        </div>

        <div className="mobile-checkout-container">
          <div className="mobile-checkout-topper">
            <div className="mobile-checkout-section">
              <div className="mobile-checkout-section-header">LOGIN ✔</div>
              <div className="mobile-checkout-section-body">
                <span>{localStorage.getItem('userPhone') || '+91XXXXXXXXXX'}</span>
                <button className="mobile-change-btn">CHANGE</button>
              </div>
            </div>

            <div className="mobile-checkout-section">
              <div className="mobile-checkout-section-header">DELIVERY ADDRESS ✔</div>
              <div className="mobile-checkout-section-body">
                <span>
                  <strong>Harsh Gulati</strong> 50, Punjabi colony, Mehidpur Road, Madhya Pradesh - <strong>456440</strong>
                </span>
                <button
                  className="mobile-change-btn"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  CHANGE
                </button>
              </div>
            </div>
          </div>

          {showAddressForm && (
            <form className="mobile-address-form">
              <div className='mobile-checkout-address-form'>
                <input type="text" placeholder="First Name*" />
                <input type="text" placeholder="Middle Name" />
                <input type="text" placeholder="Last Name*" />
              </div>
              <input type="text" placeholder="Address Line_1" />
              <input type="text" placeholder="Address Line_2" />
              <input type="text" placeholder="Landmark" />
              <div className='mobile-checkout-address-form'>
                <input type="tel" maxLength={6} minLength={6} placeholder="Pin Code" />
                <input type="text" placeholder="City/Town" />
                <input type="text" placeholder="State" />
              </div>
            </form>
          )}

          <div className="mobile-payment-section">
            <div className="mobile-checkout-section-header">PAYMENT OPTIONS</div>
            <div className="mobile-payment-option"><label>Pay with UPI</label><input type="radio" name="payment" /></div>
            <div className="mobile-payment-option"><label>EMI</label><input type="radio" name="payment" /></div>
            <div className="mobile-payment-option"><label>Debit/Credit Cards</label><input type="radio" name="payment" /></div>
          </div>

          <div className="mobile-order-summary">
            <h3>ORDER SUMMARY</h3>
            <p>Your Order will be delivered in 3–5 working days.</p>
            <p><strong>Estimated Delivery Date:</strong> 29 May 2025</p>

            {product && (
              <div className="mobile-summary-details">
                <div>
                  <label>Quantity:</label>
                  <input type="number" defaultValue="1" min="1" />
                </div>
                <div className="mobile-summary-line"><span>Subtotal</span><span>₹{product.price}</span></div>
                <div className="mobile-summary-line"><span>Shipping</span><span>Free shipping</span></div>
                <div className="mobile-summary-line mobile-total"><span>Total</span><span>₹{product.price}</span></div>
              </div>
            )}

            <button className="mobile-payment-btn">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
