import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../allStyles/OrdersPage.css";
import MobileHeader from "./Header";
import Footer from "./Footer";

const OrdersPage = () => {
    const location = useLocation();
    const order = location.state?.order; // 👈 comes from navigate()
    console.log("order page: ", order)
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    if (!order) {
        return <p style={{ textAlign: "center" }}>No order details found.</p>;
    }

    const handleRating = (value) => {
        setRating(value);
    };

    const submitReview = async () => {
        try {
            await axios.post("https://rehomify.in/v1/orders/review", {
                orderId: order.id,
                rating,
                review,
            });
            alert("✅ Review submitted successfully!");
        } catch (err) {
            console.error("Error submitting review:", err);
            alert("❌ Failed to submit review");
        }
    };

    const downloadInvoice = async () => {
        try {
            const res = await axios.get(
                `https://rehomify.in/v1/orders/${order.id}/invoice`,
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `invoice_${order.id}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error("Error downloading invoice:", err);
            alert("❌ Failed to download invoice");
        }
    };

    // helper function
    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];

        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2); // last two digits
        const time = date.toLocaleTimeString("en-US", { hour12: false }); // 15:35:05

        return `${month} ${day}, 20${year}`;
    };


    return (
        <>
            <MobileHeader />
            <div className="mobile-order-card">
                {/* Order Details */}
                <h4>Order Summary</h4>
                <hr />
                <div className="mobile-order-header">
                    <img
                        src={order.product.imageUrl || "/default-image.png"}
                        alt={order.product.name}
                        className="mobile-order-image"
                    />
                    <div className="mobile-order-info">
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Name:</strong> {order.product.name}</p>
                        <p><strong>Placed at :</strong> {formatDate(order.orderDate)}</p>
                        <p><strong>Quantity :</strong> {order.quantity}</p>
                        <p><strong>Status :</strong> {order.status}</p>
                        {order.status == "delivered" ? <p><strong>Delivery Date:</strong> {formatDate(order.deliveryDate)}</p> : ""}
                    </div>
                </div>

                {/* Ratings & Review */}
                <div className="mobile-order-review">
                    <h4>Rate & Review</h4>
                    <div className="mobile-rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={{
                                    fontSize: "24px",
                                    cursor: "pointer",
                                    color: star <= rating ? "gold" : "gray",
                                }}
                                onClick={() => handleRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <textarea
                        placeholder="Write your review..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="mobile-review-box"
                    />
                    <button onClick={submitReview} className="mobile-submit-review">
                        Submit Review
                    </button>
                </div>

                {/* Invoice Download */}
                <button onClick={downloadInvoice} className="mobile-download-invoice">
                    📄 Download Invoice
                </button>
            </div>
            <Footer />
        </>
    );
};

export default OrdersPage;
