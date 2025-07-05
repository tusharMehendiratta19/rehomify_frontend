import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../allStyles/selloption.css"; // Ensure this is already imported
import Header from "./Header";
import Footer from "./Footer";
import Orders from "./Orders";
import Signup from "../pages/Signup";
import ResellForm from "./ResellForm";

const SellOptions = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    type: "Customer",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", form);

    if (form.type === "Seller") {
      navigate("/sellerHub");
    } else {
      navigate("/");
    }
  };

  const orders = [
    {
      id: "ORD123",
      image:
        "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Smartphone X1",
      description: "6.5-inch display, 128GB storage, 5000mAh battery",
    },
    {
      id: "ORD456",
      image:
        "https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Wireless Headphones",
      description: "Noise cancelling, 40h battery life, Bluetooth 5.2",
    },
    {
      id: "ORD789",
      image:
        "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Laptop Pro",
      description: "15.6-inch FHD, 16GB RAM, 512GB SSD, Intel i7",
    },
    {
      id: "ORD789",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Laptop Pro",
      description: "15.6-inch FHD, 16GB RAM, 512GB SSD, Intel i7",
    },
  ];

  return (
    <>
      <Header />
      <div className="sell-options-container">
        <div className="button-group">
          <button
            className={`option-button ${
              selectedOption === "customer" ? "active-customer" : ""
            }`}
            onClick={() => setSelectedOption("customer")}
          >
            Sell as Customer
          </button>
          <button
            className={`option-button ${
              selectedOption === "seller" ? "active-seller" : ""
            }`}
            onClick={() => setSelectedOption("seller")}
          >
            Sell as Vendor
          </button>
        </div>

        <div className="option-content">
          {selectedOption === "customer" && (
            <div>
              {!showProductForm ? (
                <>
                  <div className="resell-main">
                    <h2>My Orders</h2>
                    <div className="resell-container">
                      {orders.map((order) => (
                        <div className="resell-card" key={order.id}>
                          <img src={order.image} alt={order.name} />
                          <div className="resell-details">
                            <h4>{order.name}</h4>
                            <p>{order.description}</p>
                            <p>
                              <strong>Order ID:</strong> {order.id}
                            </p>
                            <button
                              className="resell-btn"
                              onClick={() => setShowProductForm(true)}
                            >
                              Resell
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="cusResellOther">
                    <h3>Want to sell some other product?</h3>
                    <button onClick={() => setShowProductForm(true)}>
                      Click here
                    </button>
                  </div>
                </>
              ) : (
                <ResellForm handleCancel={() => setShowProductForm(false)} />
              )}
            </div>
          )}

          {selectedOption === "seller" && (
            <div className="signup-wrapper-sell">
              <div className="signup-content">
                <h4>Welcome to ReHomify, Please Sign Up Below.</h4>

                <form className="signup-container" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Number</label>
                      <input
                        type="tel"
                        name="number"
                        value={form.number}
                        onChange={handleChange}
                        required
                        maxLength="10"
                        pattern="[0-9]{10}"
                        minLength={10}
                        title="Please enter a valid 10-digit phone number"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Type</label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                      >
                        <option value="Seller" selected>
                          Seller
                        </option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellOptions;
