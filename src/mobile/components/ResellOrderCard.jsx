import { useEffect, useState } from "react";
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
    const [btnDisabled, setBtnDisabled] = useState(false);

    useEffect(() => {
        if (!orderId) {
            setError("No order ID provided");
            setLoading(false);
            return;
        }

        const fetchResellOrder = async () => {
            try {
                const res = await axios.get(
                    `https://rehomify.in/v1/resell-orders/${orderId}`
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

    const handleCancelRequest = async (resellId) => {
        try {
            const res = await axios.put(
                `https://rehomify.in/v1/resell-orders/${resellId}`, { status: "Cancelled" }
            );
            if (res.data?.success) {
                setOrder({ ...order, status: "Cancelled" });
                setBtnDisabled(true);
                window.dispatchEvent(
                    new CustomEvent("snackbar", {
                        detail: { message: "Resell request cancelled!", type: "success" },
                    })
                );
            } else {
                setError("Failed to cancel resell request");
                window.dispatchEvent(
                    new CustomEvent("snackbar", {
                        detail: { message: "Failed to cancel resell request.", type: "error" },
                    })
                );
            }
        } catch (err) {
            console.error("Error cancelling order:", err);
            setError("Failed to cancel order");
        }
    };

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
            <h3 className="mobile-resell-heading">Resell Request Details</h3>
            <div className="mobile-resell-order-card">
                <div className="mobile-resell-order-left">
                    <img
                        src={order.productDetails.imageUrl || "/default-image.png"}
                        alt={order.productDetails.name}
                        className="mobile-resell-order-image"
                    />
                </div>

                <div className="mobile-resell-order-right">
                    <p className="resell-order-id">
                        <strong>Order ID:</strong> {order.orderId}
                    </p>
                    <p className="resell-order-id">
                        <strong>Resell Order ID:</strong> {order._id}
                    </p>

                    <p className="resell-order-name">{order.productDetails.name}</p>

                    {/* <p className="resell-order-description">
                        {order.productDetails.description}
                    </p> */}

                    <span
                        className={`resell-order-status ${order.status.toLowerCase()}`}
                    >
                        Status: {order.status}
                    </span>

                    <button
                        onClick={() => handleCancelRequest(order._id)}
                        className="mobile-resell-order-cancel-btn"
                        disabled={btnDisabled || order.status === "Cancelled"}
                    >
                        Cancel Request
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ResellOrderDetails;
