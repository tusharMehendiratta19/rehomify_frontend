import React, { useEffect, useState } from 'react';
import Headers from './Header';
import Footer from './Footer';
import '../allStyles/wishlist.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AiFillHeart } from 'react-icons/ai';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token") && !!localStorage.getItem("custId");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
        fetchWishlist();
        if (isLoggedIn) {
            fetchCustomerDetails();
        }
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await axios.post('https://rehomify.in/v1/wishlist/getWishlist', {
                custId: localStorage.getItem("custId"),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setWishlist(response.data);
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
        }
    };

    const fetchCustomerDetails = async () => {
        try {
            const res = await axios.get(`https://rehomify.in/v1/auth/getCustomerDetails/${localStorage.getItem("custId")}`);
            if (res.data?.status) {
                const { cart = [], wishlist = [] } = res.data.data;
                setCartItems(cart.map(p => p.productId));
                // setWishlist(wishlist.map(p => p.productId));
                console.log("Customer wishlist:", wishlist);
            }
        } catch (err) {
            console.error("Error fetching customer details:", err);
        }
    };

    const addToCart = async (productId) => {
        if (!isLoggedIn) {
            showSnackbar("Please login to add items to cart");
            return;
        }
        try {
            const response = await axios.post('https://rehomify.in/v1/cart/addToCart', {
                custId: localStorage.getItem("custId"),
                productId: productId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.status) {
                showSnackbar("Added to Cart");
                setCartItems(prev => [...prev, productId]);
            } else {
                showSnackbar("Error adding to Cart");
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            showSnackbar("Error adding to Cart");
        }
    }

    const buyNow = async (productId, price) => {
        if (!isLoggedIn) {
            showSnackbar("Please login to buy products");
            return;
        }
        try {
            navigate('/checkout', { state: { productId, fromCart: true, total: price } });
        } catch (error) {
            console.error('Error proceeding to Buy Now:', error);
            showSnackbar("Error proceeding to Buy Now");
        }
    }

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        setTimeout(() => setSnackbarOpen(false), 3000); // auto hide in 3s
    };

    const removeItemFromWishlist = (productId) => async () => {
        try {
            await axios.post('https://rehomify.in/v1/wishlist/updateWishlist', {
                custId: localStorage.getItem("custId"),
                productId: productId
            });
            setWishlist(wishlist.filter(item => item.id !== productId));
            setSnackbarOpen(true);
            setTimeout(() => setSnackbarOpen(false), 3000);
        } catch (error) {
            console.error('Failed to remove item from wishlist:', error);
        }
    };

    const handleProductClick = (id) => {
        console.log("Product clicked with ID:", id);
        navigate(`/product/${id}`);
    }

    const handleAddToCart = async (productId) => {
        if (!isLoggedIn) {
            window.dispatchEvent(new CustomEvent("snackbar", {
                detail: { message: "Please login to add products to cart", type: "error" }
            }));
            return;
        }
        try {
            const response = await axios.post('https://rehomify.in/v1/cart/addToCart', {
                custId: localStorage.getItem("custId"),
                productId: productId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.status) {
                window.dispatchEvent(new CustomEvent("snackbar", {
                    detail: { message: "Added to Cart", type: "success" }
                }));
            } else {
                window.dispatchEvent(new CustomEvent("snackbar", {
                    detail: { message: "Error adding to Cart", type: "error" }
                }));
                console.error("Error adding to cart:", response.data);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            window.dispatchEvent(new CustomEvent("snackbar", {
                detail: { message: "Error adding to Cart", type: "error" }
            }));
        }
    }

    const handleBuyNow = async (productId) => {
        if (!isLoggedIn) {
            window.dispatchEvent(new CustomEvent("snackbar", {
                detail: { message: "Please login to proceed with Buy Now", type: "error" }
            }));
            return;
        }
        try {
            const response = await axios.post('https://rehomify.in/v1/cart/addToCart', {
                custId: localStorage.getItem("custId"),
                productId: productId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.status) {
                navigate('/checkout', { state: { productId, fromCart: true } });
            } else {
                window.dispatchEvent(new CustomEvent("snackbar", {
                    detail: { message: "Error proceeding to Buy Now", type: "error" }
                }));
                console.error("Error proceeding to Buy Now:", response.data);
            }
        } catch (error) {
            console.error('Error proceeding to Buy Now:', error);
            window.dispatchEvent(new CustomEvent("snackbar", {
                detail: { message: "Error proceeding to Buy Now", type: "error" }
            }));
        }
    }

    return (
        <>
            <Headers />
            <div className="wishlist-container">
                <h2 className="wishlist-header">Wishlist Items</h2>
                <div className="wishlist-grid">
                    {wishlist.map((item) => (
                        <div className="wishlist-card" key={item.id}>
                            <div className="wishlist-heart" onClick={removeItemFromWishlist(item.id)}>
                                <AiFillHeart className="wishlist-heart-icon" />
                            </div>
                            <img src={item.imageUrl} alt={item.name} className="wishlist-image" onClick={() => handleProductClick(item.id)} />
                            <div className="wishlist-details">
                                <h4 className="wishlist-name" onClick={() => handleProductClick(item.id)}>{item.name}</h4>
                                <p className="wishlist-category">{item.category}</p>
                                <p className="wishlist-description">{item.description}</p>
                                <p className="wishlist-price">₹{item.price}</p>
                                <div className="wishlist-buttons">
                                    {cartItems.includes(item.id) ? (
                                        <button
                                            className="btn-outline"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate("/cart"); // ✅
                                            }}
                                        >
                                            Go To Cart
                                        </button>
                                    ) : (
                                        <button
                                            className="btn-outline"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(item.id);
                                            }}
                                        >
                                            Add To Cart
                                        </button>
                                    )}


                                    <button className="btn-primary" onClick={(e) => {
                                        e.stopPropagation();
                                        buyNow(item.id, item.price);
                                    }}>
                                        Buy Now
                                    </button>
                                    {/* <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
                                    <button className="buy-now" onClick={() => handleBuyNow(item.id)}>Buy Now</button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {snackbarOpen && (
                    <div className="snackbar">Product removed from wishlist</div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Wishlist;
