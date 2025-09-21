import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../allStyles/selloption.css"; // Ensure this is already imported
import Header from "./Header";
import Footer from "./Footer";
import Orders from "./Orders";
import Signup from "../pages/Signup";
import ResellForm from "./ResellForm";
import axios from "axios";

const SellOptions = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    const custId = localStorage.getItem("custId");
    let result = axios.get(`https://rehomify.in/v1/orders/${custId}`);

    if (result) {
      result.then((res) => {
        console.log(res.data);
        setOrders(res.data);
      });
    } else {
      setOrders([]);
    }

  }, []);


  return (
    <>
      <Header />
      <div className="laptop-sell-options-container">
        <div className="laptop-button-group">
          <button
            className={`laptop-option-button ${selectedOption === "customer" ? "laptop-active-customer" : ""
              }`}
            onClick={() => setSelectedOption("customer")}
          >
            Sell as Customer
          </button>
          <button
            className={`laptop-option-button ${selectedOption === "seller" ? "laptop-active-seller" : ""
              }`}
            onClick={() => setSelectedOption("seller")}
          >
            Sell as Vendor
          </button>
        </div>

        <div className="laptop-option-content">
          {selectedOption === "customer" && (
            <>
              {!showProductForm ? (
                <>
                  <div className="laptop-resell-main">
                    <h2>My Orders</h2>
                    <div className="laptop-resell-container">
                      {orders.map((order) => (
                        <div className="laptop-resell-card" key={order.id}>
                          <img src={order.product.imageUrl} alt={order.name} />
                          <div className="laptop-resell-details">
                            <h4>{order.product.name}</h4>
                            {/* <p>{order.description}</p> */}
                            <p>
                              <strong>Order ID:</strong> {order.id}
                            </p>
                            <button
                              className="laptop-resell-btn"
                            >
                              Resell
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="laptop-cusResellOther">
                    <h4>Want to sell some other product?</h4>
                    <button onClick={() => setShowProductForm(true)}>
                      Click here
                    </button>
                  </div>
                </>
              ) : (
                <ResellForm handleCancel={() => setShowProductForm(false)} />
              )}
            </>
          )}

          {selectedOption === "seller" && (
            <div className="laptop-signup-wrapper-sell">
              <div className="laptop-signup-content">
                <h4>Welcome to ReHomify, Please Sign Up Below.</h4>
                <form className="laptop-signup-container" onSubmit={handleSubmit}>
                  <div className="laptop-form-row">
                    <div className="laptop-form-group">
                      <label>Name</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="laptop-form-group">
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

                  <div className="laptop-form-row">
                    <div className="laptop-form-group">
                      <label>Type</label>
                      <select name="type" value={form.type} onChange={handleChange}>
                        <option value="Seller" selected>Seller</option>
                      </select>
                    </div>
                    <div className="laptop-form-group">
                      <label>Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} />
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
