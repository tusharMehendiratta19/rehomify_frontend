import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../allStyles/OrdersPage.css";
import MobileHeader from "./Header";
import Footer from "./Footer";

const OrdersPage = () => {
    const location = useLocation();
    const order = location.state?.order;
    const custId = localStorage.getItem("custId");

    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loadingReview, setLoadingReview] = useState(true);

    if (!order) {
        return <p style={{ textAlign: "center" }}>No order details found.</p>;
    }

    // ⭐ Fetch review on component mount
    useEffect(() => {
        const fetchExistingReview = async () => {
            try {
                const res = await axios.post(
                    `http://localhost:5000/v1/reviews/getReviewById`,
                    {
                        orderId: order.id
                    }
                );

                console.log("response: ", res.data.data.rating)

                if (res.data?.success) {
                    setRating(res.data.data.rating);
                    setReview(res.data.data.review);
                    setSubmitted(true);
                }
            } catch (err) {
                console.error("Error fetching existing review:", err);
            } finally {
                setLoadingReview(false);
            }
        };

        fetchExistingReview();
    }, [order.id, custId]);

    const handleRating = (value) => setRating(value);

    const showSnackbar = (msg) => {
        setSnackbarMsg(msg);
        setSnackbarVisible(true);
        setTimeout(() => setSnackbarVisible(false), 3000);
    };

    const submitReview = async () => {
        try {
            await axios.post("https://rehomify.in/v1/reviews/createReview", {
                custId,
                orderId: order.id,
                rating,
                review,
            });

            showSnackbar("Review submitted successfully!");
            setSubmitted(true);
        } catch (err) {
            console.error("Error submitting review:", err);
            alert("❌ Failed to submit review");
        }
    };

    const downloadInvoice = async () => {
        try {
            const res = await axios.get(
                `https://rehomify.in/v1/orders/getInvoice/${order.id}`
            );

            const signedUrl = res.data.url;
            if (!signedUrl) {
                alert("❌ Invoice URL not received");
                return;
            }

            const link = document.createElement("a");
            link.href = signedUrl;
            link.download = `invoice_${order.id}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Error downloading invoice:", err);
            alert("❌ Failed to download invoice");
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);

        return `${month} ${day}, 20${year}`;
    };

    return (
        <>
            <MobileHeader />
            <div className="laptop-order-card">
                <h4>Order Summary</h4>
                <hr />

                <div className="laptop-order-header">
                    <img
                        src={order.product.imageUrl || "/default-image.png"}
                        alt={order.product.name}
                        className="laptop-order-image"
                    />

                    <div className="laptop-order-info">
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Name:</strong> {order.product.name}</p>
                        <p><strong>Placed at :</strong> {formatDate(order.orderDate)}</p>
                        <p><strong>Quantity :</strong> {order.quantity}</p>
                        <p><strong>Status :</strong> {order.status}</p>

                        {/* {order.status === "delivered" && (
                            <p><strong>Delivery Date:</strong> {formatDate(order.deliveryDate)}</p>
                        )} */}
                    </div>
                </div>

                {/* ⭐ ONLY SHOW REVIEW AREA FOR DELIVERED ORDERS */}
                {order.status === "delivered" && (
                    <div className="laptop-order-review">
                        <h4>Rating & Review</h4>

                        {loadingReview ? (
                            <p>Loading review...</p>
                        ) : submitted ? (
                            // ⭐ Already submitted → show static review
                            <div className="submitted-review">
                                <p><strong>Your Rating:</strong></p>
                                <div style={{ fontSize: "24px", color: "gold" }}>
                                    {"★".repeat(rating)}
                                    <span style={{ color: "gray" }}>
                                        {"★".repeat(5 - rating)}
                                    </span>
                                </div>

                                <p style={{ marginTop: "10px" }}><strong>Your Review:</strong></p>
                                <p className="submitted-review-text">{review}</p>
                            </div>
                        ) : (
                            // ⭐ No review yet → show form
                            <>
                                <div className="laptop-rating-stars">
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
                                    className="laptop-review-box"
                                />

                                <button
                                    onClick={submitReview}
                                    className="laptop-submit-review"
                                    disabled={rating === 0 || review.trim().length === 0}
                                    style={{
                                        opacity: rating === 0 || review.trim().length === 0 ? 0.5 : 1,
                                        cursor: rating === 0 || review.trim().length === 0 ? "not-allowed" : "pointer"
                                    }}
                                >
                                    Submit Review
                                </button>
                            </>
                        )}
                    </div>
                )}

                <button onClick={downloadInvoice} className="laptop-download-invoice">
                    📄 Download Invoice
                </button>
            </div>

            {snackbarVisible && <div className="snackbar">{snackbarMsg}</div>}

            <Footer />
        </>
    );
};

export default OrdersPage;
