import React, { useEffect, useState } from "react";
import axios from "axios";
import SellerNav from "./SellerNav";
import SellerHeader from "./SellerHeader";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
import "../sellerstyles/sellerOrders.css";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success"
  });



  const fetchAllOrders = async () => {
    try {
      const res = await axios.get("https://rehomify.in/v1/orders/");
      setOrders(res.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      // **Hide buttons immediately**
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status, _actionDone: true } : o
        )
      );

      await axios.put(`https://rehomify.in/v1/orders/${id}`, { status });
      showSnackbar("Order status is updated!");
    } catch (err) {
      console.error("Failed to update order:", err);
      showSnackbar("Failed to update order");
      // revert state if failed
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, _actionDone: false } : o
        )
      );
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
    setTimeout(() => setSnackbar({ open: false, message: "" }), 3000);
  };

  if (loading) {
    return <div className="seller-orders-wrapper">Loading orders...</div>;
  }

  return (
    <>
      <SellerHeader />
      <SellerNav />

      <div className="seller-orders-wrapper">
        <h2>Orders Received</h2>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="orders-container">
            {orders.map((o) => {
              const dateObj = new Date(o.orderDate);
              const date = dateObj.toLocaleDateString();
              const time = dateObj.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              });

              return (
                <div key={o.id} className="order-card">
                  <img
                    src={o.product?.imageUrl || "/no-image.jpg"}
                    alt={o.product?.name || "Product"}
                    className="order-image"
                  />

                  <div className="order-details">
                    <h4 className="order-title">{o.product?.name}</h4>

                    <p className="order-info">Price: ₹{o.product?.price}</p>

                    <p className="order-info">
                      Date: {date} — {time}
                    </p>

                    <p className="order-status">
                      Status: <strong>{o.status || "Placed"}</strong>
                    </p>

                    {o.status === "placed" && (
                      <div className="order-actions">
                        <button
                          className="btn-accept"
                          onClick={() => updateOrderStatus(o.id, "Processing")}
                        >
                          Accept
                        </button>

                        <button
                          className="btn-reject"
                          onClick={() => updateOrderStatus(o.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SellerOrders;
