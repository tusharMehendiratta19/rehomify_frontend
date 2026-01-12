import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../allStyles/resellorders.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import OtherProductResell from "../../laptop/components/OtherProductResell";

const ResellOrders = () => {
  const [orders, setOrders] = useState([]);
  const [resellOrders, setResellOrders] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const custId = localStorage.getItem("custId");
    let result = axios.get(`https://rehomify.in/v1/orders/${custId}`);
    let resellOrders = axios.get(`https://rehomify.in/v1/resell-orders/customer/${custId}`);

    if (result) {
      result.then((res) => {
        console.log(res.data);
        const filteredOrders = res.data.filter(order => !order.isResellRequested && order.paymentStatus === "payment.succeeded");
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

  const handleResellClick = async () => {
    try {
      let result = await axios.post(
        `https://rehomify.in/v1/resell-orders/addResellOrder`,
        { orderId: selectedOrderId }
      );

      if (result.data.success) {
        window.dispatchEvent(
          new CustomEvent("snackbar", {
            detail: { message: "Resell requested raised!", type: "success" },
          })
        );

        setResellOrders([...resellOrders, result.data.data]);
        setOrders(orders.filter(order => order.id !== selectedOrderId));
      } else {
        throw new Error();
      }
    } catch {
      window.dispatchEvent(
        new CustomEvent("snackbar", {
          detail: { message: "Failed to raise resell request.", type: "error" },
        })
      );
    } finally {
      setShowConfirm(false);
      setSelectedOrderId(null);
    }
  };


  return (
    <div>
      <Header />
      <div className="resell-main">
        <h3>Resell Requested</h3>
        <div className="mobile-resell-container">
          {resellOrders.length > 0 ? (
            resellOrders.map((order) => (
              <div className="mobile-resell-card" key={order._id}>
                <img src={order.productDetails.imageUrl} alt={order.name} className="mobile-resell-image" />
                <div className="resell-details">
                  <h4>{order.productDetails.name}</h4>
                  {/* <p>{order.description}</p> */}
                  <p>
                    <strong>Resell Order ID:</strong> {order._id}
                  </p>
                  <span className="resell-status">Status: {order.status}</span>
                  <button className="mobile-view-status" onClick={() => handleViewStatus(order._id)}>View Status</button>
                </div>
              </div>
            ))
          ) : (
            <p>No resell orders found.</p>
          )}
        </div>
        <h3 className="mobile-resell-heading">Products available for Resell</h3>
        <div className="mobile-resell-container">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="mobile-resell-card" key={order.id}>
                <img src={order.product.imageUrl} alt={order.name} className="mobile-resell-image" />
                <div className="resell-details">
                  <h4>{order.product.name}</h4>
                  <p>{order.description}</p>
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <button
                    className="mobile-resell-btn"
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setShowConfirm(true);
                    }}
                  >
                    Resell
                  </button>


                </div>
              </div>
            ))
          ) : (
            <p>No products available for resell.</p>
          )}
        </div>
        <OtherProductResell />
      </div>
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to raise resell request for this order?</p>
            <div className="mobile-modal-actions">
              <button className="yes-btn" onClick={handleResellClick}>
                Yes
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedOrderId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ResellOrders;
