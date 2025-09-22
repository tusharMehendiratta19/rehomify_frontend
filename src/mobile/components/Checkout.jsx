import React, { useState, useEffect } from "react";
import "../allStyles/checkout.css";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fromCart = location.state?.fromCart || false;
  const productId = location.state?.productId || null;
  const locationSubtotal = location.state?.total || 0;
  const qty = location.state?.qty || 1;

  const [product, setProduct] = useState(null);
  const [subtotal, setSubtotal] = useState(locationSubtotal);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [address, setAddress] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    pinCode: "",
    city: "",
    state: "",
  });
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [couponVisible, setCouponVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [isDiscount, setIsDiscount] = useState(false);
  const [discount, setDiscount] = useState("");
  const [applied, setApplied] = useState(null);
  const [isPincodeServiceable, setIsPincodeServiceable] = useState(false); // ✅ new state

  // ✅ Function to apply discount and update total
  const applyDiscount = (coupon) => {
    if (!coupon) return;

    let discountValue = 0;

    if (coupon.amount) {
      discountValue = coupon.amount;
    } else if (coupon.percentage) {
      discountValue = Math.round((subtotal * coupon.percentage) / 100);
    }

    if (discountValue > 0) {
      setIsDiscount(true);
      setDiscount(discountValue);
      setSubtotal((prev) => prev - discountValue);
    }
  };

  const applyCoupon = (code) => {
    const c = coupons.find((c) => c.code === code);
    setApplied(c);
    setSelectedCode(code);
    if (c) applyDiscount(c);
  };


  const coupons = [
    {
      id: 1,
      type: "New User Offer",
      description: "₹150 off for new users on first purchase",
      code: "FIRST150",
      amount: 150,
    },
    {
      id: 2,
      type: "New User Offer",
      description: "Sign-up bonus of ₹200 for new users",
      code: "SIGNUP200",
      amount: 200,
    },
    {
      id: 3,
      type: "Website Offer",
      description: "Extra 15% off on ReHomify exclusive sale",
      code: "NEW15",
      percentage: 15,
    },
    {
      id: 3,
      type: "Website Offer",
      description: "Get ₹500 off on orders above ₹4999",
      code: "EXTRA500",
      amount: 500,
    },
  ];

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
      const prod = { ...response.data, quantity: qty };
      setProduct(prod);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // ✅ Fetch customer details + cart products
  const fetchCustomerDetails = async () => {
    const custId = localStorage.getItem("custId");
    if (!custId) {
      window.dispatchEvent(
        new CustomEvent("snackbar", {
          detail: { message: "Please login to proceed", type: "error" },
        })
      );
      return;
    }

    try {
      const response = await axios.get(
        `https://rehomify.in/v1/auth/getCustomerDetails/${custId}`
      );
      if (response.data?.status) {
        const customer = response.data.data;
        setUserPhone(customer.mobileNo);
        customer.address ? setIsAddressValid(true) : setIsAddressValid(false);

        setAddress({
          name: customer.address?.name || "",
          addressLine1: customer.address?.addressLine1 || "",
          addressLine2: customer.address?.addressLine2 || "",
          landmark: customer.address?.landmark || "",
          pinCode: customer.address?.pinCode || "",
          city: customer.address?.city || "",
          state: customer.address?.state || "",
        });

        if (Array.isArray(customer.cart) && customer.cart.length > 0) {
          const productDetails = await Promise.all(
            customer.cart.map(async (item) => {
              try {
                const res = await axios.get(
                  `https://rehomify.in/v1/products/${item.productId}`
                );
                return { ...res.data, quantity: item.quantity || 1 };
              } catch (err) {
                console.error(
                  "Error fetching product for ID:",
                  item.productId,
                  err
                );
                return null;
              }
            })
          );

          const validProducts = productDetails.filter((p) => p !== null);
          setProduct(validProducts);

          // ✅ calculate subtotal
          const sum = validProducts.reduce(
            (acc, p) => acc + p.price * (p.quantity || 1),
            0
          );
          setSubtotal(sum);
        } else {
          // setProduct([]);
          setSubtotal(locationSubtotal);
        }
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
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
      window.dispatchEvent(
        new CustomEvent("snackbar", {
          detail: { message: "Please fill all required fields", type: "error" },
        })
      );
      return;
    }
    try {
      const response = await axios.post(
        "https://rehomify.in/v1/auth/saveCustomerAddress",
        {
          custId: localStorage.getItem("custId"),
          ...address,
        }
      );
      if (response.data?.status) {
        setIsAddressValid(true);
        setIsPincodeServiceable(true); // ✅ pincode is serviceable
        setShowAddressForm(false);
        setAddress(response.data.data.address || {});
        window.dispatchEvent(
          new CustomEvent("snackbar", {
            detail: { message: "Pincode is serviceable", type: "error" },
          })
        );
      } else {
        setIsPincodeServiceable(false); // ❌ pincode not serviceable
        window.dispatchEvent(
          new CustomEvent("snackbar", {
            detail: { message: "Pincode is not serviceable", type: "error" },
          })
        );
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const updateQuantity = (index, change) => {
    if (Array.isArray(product)) {
      const updatedProducts = [...product];
      const newQty = Math.max(1, updatedProducts[index].quantity + change);
      updatedProducts[index].quantity = newQty;
      setProduct(updatedProducts);
      const newSubtotal = updatedProducts.reduce(
        (acc, p) => acc + p.price * (p.quantity || 1),
        0
      );
      setSubtotal(newSubtotal);
    } else if (product) {
      const newQty = Math.max(1, (product.quantity || 1) + change);
      const updatedProduct = { ...product, quantity: newQty };
      setProduct(updatedProduct);
      setSubtotal(updatedProduct.price * newQty);
    }
  };


  const placingOrder = async () => {
    const custId = localStorage.getItem("custId");
    if (!custId) return;
    if (!isAddressValid) return;

    try {
      const productsToOrder = Array.isArray(product) ? product : [product];
      for (const p of productsToOrder) {
        const response = await axios.post(
          "https://rehomify.in/v1/orders/addOrder",
          {
            customerId: custId,
            productId: p.id,
            quantity: p.quantity || 1,
          }
        );
        if (response.data?.status) {
          await axios.post("https://rehomify.in/v1/auth/saveOrder", {
            customerId: custId,
            orderId: response.data.order._id,
          });
        }
      }
      navigate("/home");
    } catch (error) {
      console.error("Error placing order:", error);
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
                <img
                  src={p.image}
                  alt={p.name}
                  className="mobile-accordion-image"
                />
                <p>
                  <strong>Color:</strong> {p.color}
                </p>
                <p>
                  <strong>Price:</strong> ₹{p.price}
                </p>
                <div className="quantity-controls">
                  <p>Quantity: </p>
                  <div className="qty-buttons">
                    <button onClick={() => updateQuantity(index, -1)}>-</button>
                    <p>{p.quantity}</p>
                    <button onClick={() => updateQuantity(index, 1)}>+</button>
                  </div>
                </div>
              </details>
            ))
          ) : (
            product && (
              <details className="mobile-product-accordion">
                <summary>{product.name}</summary>
                <img
                  src={product.image}
                  alt={product.name}
                  className="mobile-accordion-image"
                />
                <p>
                  <strong>Price:</strong> ₹{product.price}
                </p>
                <p>
                  <strong>Color:</strong> {product.color}
                </p>
                <div className="quantity-controls">
                  <p>Quantity: </p>
                  <div className="qty-buttons">
                    <button onClick={() => updateQuantity(null, -1)}>-</button>
                    <p>{product.quantity}</p>
                    <button onClick={() => updateQuantity(null, 1)}>+</button>
                  </div>
                </div>
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

            <div className="mobile-checkout-section"> <div className="mobile-checkout-section-header">DELIVERY ADDRESS ✔</div> {isAddressValid && <div className="mobile-checkout-section-body"> <span> <strong>{address.name}</strong> {address.addressLine1} {address.addressLine2} {address.city} {address.state} <strong>{address.pinCode}</strong> <br /> Landmark: {address.landmark} </span> <button className="mobile-change-btn" onClick={() => setShowAddressForm(!showAddressForm)} > CHANGE </button> </div>} {!isAddressValid && <div className="mobile-checkout-section-body"> <span>Please fill in your address details.</span> <button className="mobile-change-btn" onClick={() => setShowAddressForm(!showAddressForm)} > ADD ADDRESS </button> </div>} </div>
          </div>

          {showAddressForm && (
            <form className="mobile-address-form" onSubmit={addCustomerAddress}>
              <div className="mobile-checkout-address-form">
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
              <div className="mobile-checkout-address-form">
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
              <button type="submit" className="addadrsbtn">
                ADD ADDRESS
              </button>
            </form>
          )}

          <div className="mobile-payment-section"> <div className="mobile-checkout-section-header">PAYMENT OPTIONS</div> <div className="mobile-payment-option"><label>Pay with UPI</label><input type="radio" name="payment" /></div> <div className="mobile-payment-option"><label>EMI</label><input type="radio" name="payment" /></div> <div className="mobile-payment-option"><label>Debit/Credit Cards</label><input type="radio" name="payment" /></div> </div>

          {/* ✅ Coupon apply section */}

          <div className="mobile-coupon-input">
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
            {isDiscount && <div className="mobile-summary-line">
              <span>Discount: </span>
              <span>{discount}</span>
            </div>}
          </div>


          {/* ✅ Order summary */}
          <div className="mobile-order-summary">
            <h3>ORDER SUMMARY</h3>
            <div className="mobile-summary-details">
              <div className="mobile-summary-line">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="mobile-summary-line">
                <span>Shipping</span>
                <span>Free shipping</span>
              </div>

              <div className="mobile-summary-line mobile-total">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>
            <button
              className="mobile-payment-btn"
              onClick={placingOrder}
              disabled={!isAddressValid || !isPincodeServiceable} // ✅ disable condition
              style={{
                opacity: !isAddressValid || !isPincodeServiceable ? 0.5 : 1,
                cursor: !isAddressValid || !isPincodeServiceable ? "not-allowed" : "pointer"
              }}
            >
              PROCEED TO PAYMENT
            </button>

          </div>

        </div>
      </div >
      <Footer />
    </>
  );
};

export default Checkout;
