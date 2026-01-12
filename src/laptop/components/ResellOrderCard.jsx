import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../allStyles/resellOrderCard.css";
import Header from "./Header";
import Footer from "./Footer";

const ResellOrderDetails = () => {
    const location = useLocation();
    const orderId = location.state?.orderId;

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!orderId) {
            setError("No order ID provided");
            setLoading(false);
            return;
        }

        const fetchResellOrder = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/v1/resell-orders/${orderId}`
                );

                if (res.data?.success) {
                    setOrder(res.data.data);
                } else {
                    setError("Failed to fetch resell order");
                }
            } catch (err) {
                console.error("Error fetching resell order:", err);
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchResellOrder();
    }, [orderId]);

    if (loading) {
        return <p style={{ textAlign: "center" }}>Loading resell order...</p>;
    }

    if (error) {
        return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
    }

    if (!order) {
        return <p style={{ textAlign: "center" }}>No resell order found.</p>;
    }

    return (
        <>
            <Header />
            <div className="resell-order-card">
                <div className="resell-order-left">
                    <img
                        src={order.productDetails.imageUrl || "/default-image.png"}
                        alt={order.productDetails.name}
                        className="resell-order-image"
                    />
                </div>

                <div className="resell-order-right">
                    <p className="resell-order-id">
                        <strong>Order ID:</strong> {order.orderId}
                    </p>
                    <p className="resell-order-id">
                        <strong>Resell Order ID:</strong> {order._id}
                    </p>

                    <p className="resell-order-name">{order.productDetails.name}</p>

                    <p className="resell-order-description">
                        {order.productDetails.description}
                    </p>

                    <span
                        className={`resell-order-status ${order.status.toLowerCase()}`}
                    >
                        Status: {order.status}
                    </span>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ResellOrderDetails;
