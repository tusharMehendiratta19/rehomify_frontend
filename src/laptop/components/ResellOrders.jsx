import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../allStyles/resellorders.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const ResellOrders = () => {
  const [orders, setOrders] = useState([]);
  const [resellOrders, setResellOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const custId = localStorage.getItem("custId");
    let result = axios.get(`http://localhost:5000/v1/orders/${custId}`);
    let resellOrders = axios.get(`http://localhost:5000/v1/resell-orders/customer/${custId}`);

    if (result) {
      result.then((res) => {
        console.log(res.data);
        const filteredOrders = res.data.filter(order => !order.isResellRequested);
        setOrders(filteredOrders);
      });
    } else {
      setOrders([]);
    }
    if (resellOrders) {
      resellOrders.then((res) => {
        console.log(res.data);
        setResellOrders(res.data.data);
      });
    } else {
      setResellOrders([]);
    }

  }, []);

  const handleViewStatus = (orderId) => {
    navigate("/resellOrderPage", { state: { orderId } });
  };

  const handleResellClick = async (orderId) => {
    let result = await axios.post(`http://localhost:5000/v1/resell-orders`, { orderId });
    if (result) {
      result.then((res) => {
        console.log(res.data);
        alert("Resell request submitted successfully!");
      }
      );
    } else {
      alert("Failed to submit resell request.");
    }
  }

  return (
    <div>
      <Header />
      <div className="resell-main">
        <h3>Resell Requested</h3>
        <div className="resell-container">
          {resellOrders.length > 0 ? (
            resellOrders.map((order) => (
              <div className="resell-card" key={order._id}>
                <img src={order.productDetails.imageUrl} alt={order.name} className="resell-image" />
                <div className="resell-details">
                  <h4>{order.productDetails.name}</h4>
                  {/* <p>{order.description}</p> */}
                  <p>
                    <strong>Resell Order ID:</strong> {order._id}
                  </p>
                  <span className="resell-status">Status: {order.status}</span>
                  <button className="view-status" onClick={() => handleViewStatus(order._id)}>View Status</button>
                </div>
              </div>
            ))
          ) : (
            <p>No resell orders found.</p>
          )}
        </div>
        <hr />
        <h3 className="resell-heading">Products available for Resell</h3>
        <div className="resell-container">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="resell-card" key={order.id}>
                <img src={order.product.imageUrl} alt={order.name} className="resell-image" />
                <div className="resell-details">
                  <h4>{order.product.name}</h4>
                  <p>{order.description}</p>
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <button className="resell-btn">Resell</button>
                  <button className="resell-btn" onClick={() => handleResellClick(order.id)}>Resell</button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available for resell.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResellOrders;
