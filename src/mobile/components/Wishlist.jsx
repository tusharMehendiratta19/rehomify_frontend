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


    useEffect(() => {
        fetchWishlist();
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
            } else {
                showSnackbar("Error adding to Cart");
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            showSnackbar("Error adding to Cart");
        }
    }

    const handleBuyNow = async (productId) => {
        if (!isLoggedIn) {
            showSnackbar("Please login to buy products");
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
                navigate('/checkout', { state: { productId } });
            } else {
                showSnackbar("Error proceeding to Buy Now");
            }
        } catch (error) {
            console.error('Error proceeding to Buy Now:', error);
            showSnackbar("Error proceeding to Buy Now");
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
                                    <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
                                    <button className="buy-now" onClick={() => handleBuyNow(item.id)}>Buy Now</button>
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
