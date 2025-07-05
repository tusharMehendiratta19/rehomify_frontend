import React, { useState } from 'react';
import '../allStyles/checkout.css';
import Header from './Header';
import Footer from './Footer';

const orderedProducts = [
  {
    id: 1,
    name: "Modern Sofa",
    price: "₹12,999",
    description: "Comfortable 3-seater with soft fabric.",
    image: "https://media.istockphoto.com/id/2089126618/photo/leather-sofa-with-an-empty-beige-wall-for-mockup.jpg?b=1&s=612x612&w=0&k=20&c=Nft5dLAbzxdKqmmlS7sKkdzZ8ZfKqyzAnDPWdT5kvPc=",
  },
  {
    id: 2,
    name: "Dining Table",
    price: "₹7,499",
    description: "4-seater wooden dining table set.",
    image: "https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Office Chair",
    price: "₹5,999",
    description: "Push-back recliner with padded armrest.",
    image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const Checkout = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);

  return (
    <>
      <Header />
      <div className="mobile-checkout-layout">

        <h2 className="mobile-checkout-title">CHECK-OUT</h2>

        <div className="mobile-checkout-sidebar">
          {orderedProducts.map((product) => (
            <details key={product.id} className="mobile-product-accordion">
              <summary>{product.name}</summary>
              <img src={product.image} alt={product.name} className="mobile-accordion-image" />
              <p><strong>Price:</strong> {product.price}</p>
              <p>{product.description}</p>
            </details>
          ))}
        </div>

        <div className="mobile-checkout-container">
          <div className="mobile-checkout-topper">
            <div className="mobile-checkout-section">
              <div className="mobile-checkout-section-header">LOGIN ✔</div>
              <div className="mobile-checkout-section-body">
                <span>+919981058546</span>
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

            <div className="mobile-payment-option">
              <label>Pay with UPI</label>
              <input type="radio" name="payment" />
            </div>
            <div className="mobile-payment-option">
              <label>EMI</label>
              <input type="radio" name="payment" />
            </div>
            <div className="mobile-payment-option">
              <label>Debit/Credit Cards</label>
              <input type="radio" name="payment" />
            </div>
            <div className="mobile-payment-option">
              <label>Cash on Delivery</label>
              <input type="radio" name="payment" />
            </div>
          </div>

          <div className="mobile-order-summary">
            <h3>ORDER SUMMARY</h3>
            <p>Your Order will be delivered in 3–5 working days.</p>
            <p><strong>Estimated Delivery Date:</strong> 29 May 2025</p>
            <div className="mobile-summary-details">
              <div>
                <label>Quantity:</label>
                <input type="number" defaultValue="1" min="1" />
              </div>
              <div className="mobile-summary-line"><span>Subtotal</span><span>₹1,500.00</span></div>
              <div className="mobile-summary-line"><span>Shipping</span><span>Free shipping</span></div>
              <div className="mobile-summary-line mobile-total"><span>Total</span><span>₹1,500.00</span></div>
            </div>
            <button className="mobile-payment-btn">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
