import React, { useEffect, useState } from "react";
import "../allStyles/orders.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResellOrders = () => {
  const [orders, setOrders] = useState([]);
  const custId = localStorage.getItem("custId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`https://rehomify.in/v1/orders/${custId}`);
        setOrders(res.data || []);
        console.log("orders: ", res.data)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [custId]);

  return (
    <div>
      <Header />
      <div className="resell-main">
        <h3 className="resell-heading">My Orders</h3>
        <div className="resell-container">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="resell-card" key={order.id} onClick={() => navigate("/ordersPage", { state: { order: order } })}>
                <img
                  src={order.product?.imageUrl || "/default-image.png"}
                  alt={order.product?.name}
                  className="resell-image"

                />
                <div className="resell-details">
                  <p><strong>{order.product?.name}</strong></p>
                  {/* <p>{order.product?.description}</p> */}
                  <p>
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  {/* <p>
                    <strong>Status:</strong> {order.status}
                    </p> */}
                  <p>
                    <strong>Price:</strong> ₹{order.product?.price}
                  </p>
                  <p>
                    <strong>Order ID:</strong> <span className="resell-id">{order.id}</span>
                  </p>
                  <button className="resell-btn">Check Status</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>No orders found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResellOrders;
