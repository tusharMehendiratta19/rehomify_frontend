import React, { useState, useEffect } from 'react';
import '../allStyles/checkout.css';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const fromCart = location.state?.fromCart;
  console.log("From Cart:", fromCart);
  const productId = location.state?.productId;
  console.log("Product ID from location state:", productId);
  const [product, setProduct] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [address, setAddress] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    pinCode: '',
    city: '',
    state: ''
  });

  const [isAddressValid, setIsAddressValid] = useState(false);
  useEffect(() => {
    if (fromCart && productId) {
      fetchProductDetails(productId);
      fetchCustomerDetails();
    } else if (fromCart) {
      fetchCustomerDetails();
    }
  }, [fromCart, productId]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`https://rehomify.in/v1/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchCustomerDetails = async () => {
    const custId = localStorage.getItem("custId");
    if (!custId) {
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Please login to proceed", type: "error" }
      }));
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/v1/auth/getCustomerDetails/${custId}`);

      if (response.data?.status) {
        const customer = response.data.data;
        setUserPhone(customer.mobileNo);
        customer.address ? setIsAddressValid(true) : setIsAddressValid(false);

        setAddress({
          name: customer.address?.name || '',
          addressLine1: customer.address?.addressLine1 || '',
          addressLine2: customer.address?.addressLine2 || '',
          landmark: customer.address?.landmark || '',
          pinCode: customer.address?.pinCode || '',
          city: customer.address?.city || '',
          state: customer.address?.state || ''
        });

        // ✅ Fetch product details for all items in cart
        if (Array.isArray(customer.cart) && customer.cart.length > 0) {
          const productDetails = await Promise.all(
            customer.cart.map(async (item) => {
              try {
                const res = await axios.get(`https://rehomify.in/v1/products/${item.productId}`);
                return res.data;
              } catch (err) {
                console.error("Error fetching product for ID:", item.productId, err);
                return null; // or skip/handle as needed
              }
            })
          );

          // Filter out null responses in case of errors
          const validProducts = productDetails.filter(p => p !== null);
          setProduct(validProducts); // Set the fetched array
        } else {
          setProduct([]); // Empty cart
        }
      } else {
        window.dispatchEvent(new CustomEvent("snackbar", {
          detail: { message: "Failed to fetch customer details", type: "error" }
        }));
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Error fetching customer details", type: "error" }
      }));
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const addCustomerAddress = async (e) => {
    e.preventDefault();
    const { name, addressLine1, addressLine2, landmark, pinCode, city, state } = address;
    if (!name || !addressLine1 || !pinCode || !city || !state) {
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Please fill all required fields", type: "error" }
      }));
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/v1/auth/saveCustomerAddress", {
        custId: localStorage.getItem("custId"),
        name,
        addressLine1,
        addressLine2,
        landmark,
        pinCode,
        city,
        state
      });
      if (response.data?.status) {
        window.dispatchEvent(new CustomEvent("snackbar", {
          detail: { message: "Address added successfully", type: "success" }
        }));
        setIsAddressValid(true);
        setShowAddressForm(false);
        setAddress({
          name: response.data.data.address.name || '',
          addressLine1: response.data.data.address.addressLine1 || '',
          addressLine2: response.data.data.address.addressLine2 || '',
          landmark: response.data.data.address.landmark || '',
          pinCode: response.data.data.address.pinCode || '',
          city: response.data.data.address.city || '',
          state: response.data.data.address.state || ''
        });
      } else {
        window.dispatchEvent(new CustomEvent("snackbar", {
          detail: { message: "Failed to add address", type: "error" }
        }));
      }
    } catch (error) {
      console.error('Error adding address:', error);
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Error adding address", type: "error" }
      }));
    }
  };

  return (
    <>
      <Header />
      <div className="mobile-checkout-layout">
        <h2 className="mobile-checkout-title">CHECK-OUT</h2>

        <div className="mobile-checkout-sidebar">
          {Array.isArray(product) ? (
            product.map((p, index) => (
              <details key={index} className="mobile-product-accordion">
                <summary>{p.name}</summary>
                <img src={p.image} alt={p.name} className="mobile-accordion-image" />
                <p><strong>Price:</strong> ₹{p.price}</p>
                <p>{p.description}</p>
              </details>
            ))
          ) : (
            product && (
              <details className="mobile-product-accordion">
                <summary>{product.name}</summary>
                <img src={product.image} alt={product.name} className="mobile-accordion-image" />
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p>{product.description}</p>
              </details>
            )
          )}
        </div>


        <div className="mobile-checkout-container">
          <div className="mobile-checkout-topper">
            <div className="mobile-checkout-section">
              <div className="mobile-checkout-section-header">LOGIN ✔</div>
              <div className="mobile-checkout-section-body">
                <span>{userPhone}</span>
                <button className="mobile-change-btn">CHANGE</button>
              </div>
            </div>

            <div className="mobile-checkout-section">
              <div className="mobile-checkout-section-header">DELIVERY ADDRESS ✔</div>
              {isAddressValid && <div className="mobile-checkout-section-body">
                <span>
                  <strong>{address.name}</strong> {address.addressLine1} {address.addressLine2} {address.city} {address.state} <strong>{address.pinCode}</strong> <br />
                  Landmark: {address.landmark}
                </span>
                <button
                  className="mobile-change-btn"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  CHANGE
                </button>
              </div>}
              {!isAddressValid && <div className="mobile-checkout-section-body">
                <span>Please fill in your address details.</span>
                <button
                  className="mobile-change-btn"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  ADD ADDRESS
                </button>
              </div>}
            </div>
          </div>

          {showAddressForm && (
            <form className="mobile-address-form" onSubmit={addCustomerAddress}>
              <div className='mobile-checkout-address-form'>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name*"
                  value={address.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1 *"
                value={address.addressLine1}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2 *"
                value={address.addressLine2}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={address.landmark}
                onChange={handleInputChange}
              />
              <div className='mobile-checkout-address-form'>
                <input
                  type="tel"
                  name="pinCode"
                  placeholder="Pin Code *"
                  value={address.pinCode}
                  onChange={handleInputChange}
                  maxLength={6}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City/Town *"
                  value={address.city}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State *"
                  value={address.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className='addadrsbtn'>ADD ADDRESS</button>
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

            {Array.isArray(product) && product.length > 0 ? (
              <div className="mobile-summary-details">
                {product.map((item, index) => (
                  <div key={index} className="mobile-summary-product">
                    <p><strong>{item.name}</strong></p>
                    <div>
                      <label>Quantity:</label>
                      <input
                        type="number"
                        defaultValue={1}
                        min="1"
                        className="product-quantity-input"
                        onChange={(e) => {
                          const updated = [...product];
                          updated[index].quantity = parseInt(e.target.value, 10) || 1;
                          setProduct(updated);
                        }}
                      />
                    </div>
                    <div className="mobile-summary-line">
                      <span>Price</span>
                      <span>₹{item.price}</span>
                    </div>
                    <hr />
                  </div>
                ))}

                {/* Calculate total */}
                <div className="mobile-summary-line">
                  <span>Subtotal</span>
                  <span>
                    ₹{product.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0)}
                  </span>
                </div>
                <div className="mobile-summary-line">
                  <span>Shipping</span>
                  <span>Free shipping</span>
                </div>
                <div className="mobile-summary-line mobile-total">
                  <span>Total</span>
                  <span>
                    ₹{product.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0)}
                  </span>
                </div>
              </div>
            ) : product && (
              <div className="mobile-summary-details">
                <div>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    defaultValue="1"
                    min="1"
                    onChange={(e) => {
                      const updated = { ...product, quantity: parseInt(e.target.value, 10) || 1 };
                      setProduct(updated);
                    }}
                  />
                </div>
                <div className="mobile-summary-line">
                  <span>Subtotal</span>
                  <span>₹{product.price}</span>
                </div>
                <div className="mobile-summary-line">
                  <span>Shipping</span>
                  <span>Free shipping</span>
                </div>
                <div className="mobile-summary-line mobile-total">
                  <span>Total</span>
                  <span>₹{product.price}</span>
                </div>
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
