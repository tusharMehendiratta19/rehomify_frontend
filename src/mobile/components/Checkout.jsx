import React, { useState, useEffect } from 'react';
import '../allStyles/checkout.css';
import Header from './Header';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fromCart = location.state?.fromCart || false;
  const totalItems = location.state?.totalItems || 0;
  const productId = location.state?.productId || null;
  const locationSubtotal = location.state?.total || 0;
  const qty = location.state?.qty || 1;

  const [product, setProduct] = useState(null);
  const [subtotal, setSubtotal] = useState(locationSubtotal);
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
  console.log("fromCart:", fromCart);
  console.log("subtotal:", subtotal);
  console.log("Product ID from location state:", productId);
  console.log("quantity:", qty);
  useEffect(() => {
    setSubtotal(locationSubtotal);
  }, [locationSubtotal]);

  useEffect(() => {
    if (fromCart && productId) {
      fetchProductDetails(productId);
      fetchCustomerDetails();
    } else if (fromCart) {
      fetchCustomerDetails();
    } else if (productId) {
      fetchProductDetails(productId);
    }
  }, [fromCart, productId]);

  // ✅ Fetch single product
  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`https://rehomify.in/v1/products/${id}`);
      const prod = response.data;
      setProduct(prod);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // ✅ Fetch customer details + cart products
  const fetchCustomerDetails = async () => {
    const custId = localStorage.getItem("custId");
    if (!custId) {
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Please login to proceed", type: "error" }
      }));
      return;
    }

    try {
      const response = await axios.get(`https://rehomify.in/v1/auth/getCustomerDetails/${custId}`);
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

        if (Array.isArray(customer.cart) && customer.cart.length > 0) {
          const productDetails = await Promise.all(
            customer.cart.map(async (item) => {
              try {
                const res = await axios.get(`https://rehomify.in/v1/products/${item.productId}`);
                return { ...res.data, quantity: item.quantity || 1 };
              } catch (err) {
                console.error("Error fetching product for ID:", item.productId, err);
                return null;
              }
            })
          );

          const validProducts = productDetails.filter(p => p !== null);
          setProduct(validProducts);

          // ✅ calculate subtotal from cart
          // const sum = validProducts.reduce((acc, p) => acc + (p.price * (p.quantity || 1)), 0);
          // setSubtotal(sum);
        } else {
          setProduct([]);
          // setSubtotal(0);
        }
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const addCustomerAddress = async (e) => {
    e.preventDefault();
    const { name, addressLine1, pinCode, city, state } = address;
    if (!name || !addressLine1 || !pinCode || !city || !state) {
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Please fill all required fields", type: "error" }
      }));
      return;
    }
    try {
      const response = await axios.post("https://rehomify.in/v1/auth/saveCustomerAddress", {
        custId: localStorage.getItem("custId"),
        ...address
      });
      if (response.data?.status) {
        setIsAddressValid(true);
        setShowAddressForm(false);
        setAddress(response.data.data.address || {});
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const placingOrder = async () => {
    const custId = localStorage.getItem("custId");
    if (!custId) return;
    if (!isAddressValid) return;

    try {
      const productsToOrder = Array.isArray(product) ? product : [product];
      for (const p of productsToOrder) {
        const response = await axios.post("https://rehomify.in/v1/orders/addOrder", {
          customerId: custId,
          productId: p.id,
          quantity: p.quantity || 1
        });
        if (response.data?.status) {
          await axios.post("https://rehomify.in/v1/auth/saveOrder", {
            customerId: custId,
            orderId: response.data.order._id
          });
        }
      }
      navigate('/home');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="mobile-checkout-layout">
        <h2 className="mobile-checkout-title">CHECK-OUT</h2>

        {/* ✅ Sidebar product summary */}
        <div className="mobile-checkout-sidebar">
          {Array.isArray(product) ? (
            product.map((p, index) => (
              <details key={index} className="mobile-product-accordion">
                <summary>{p.name}</summary>
                <img src={p.image} alt={p.name} className="mobile-accordion-image" />
                <p><strong>Color:</strong> {p.color}</p>
                <p><strong>Price:</strong> ₹{p.price}</p>
                <p><strong>Qty:</strong> {p.quantity || 1}</p>
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
          {/* ✅ Login + Address */}
          <div className="mobile-checkout-topper">
            <div className="mobile-checkout-section">
              <div className="mobile-checkout-section-header">LOGIN ✔</div>
              <div className="mobile-checkout-section-body">
                <span>{userPhone}</span>
              </div>
            </div>

            <div className="mobile-checkout-section">
              <div className="mobile-checkout-section-header">DELIVERY ADDRESS ✔</div>
              {isAddressValid && <div className="mobile-checkout-section-body">
                <span>
                  <strong>{address.name}</strong> {address.addressLine1}, {address.city}, {address.state} {address.pinCode}
                </span>
              </div>}
              {!isAddressValid && (
                <div className="mobile-checkout-section-body">
                  <span>Please fill in your address details.</span>
                  <button
                    className="mobile-change-btn"
                    onClick={() => setShowAddressForm(!showAddressForm)}
                  >
                    ADD ADDRESS
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ✅ Order summary */}
          <div className="mobile-order-summary">
            <h3>ORDER SUMMARY</h3>
            <div className="mobile-summary-details">
              <div className="mobile-summary-line">
                <span>Subtotal</span>
                <span>₹{subtotal * qty}</span>
              </div>
              <div className="mobile-summary-line">
                <span>Shipping</span>
                <span>Free shipping</span>
              </div>
              <div className="mobile-summary-line mobile-total">
                <span>Total</span>
                <span>₹{subtotal * qty}</span>
              </div>
            </div>
            <button className="mobile-payment-btn" onClick={placingOrder}>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
