import React, { useEffect, useState } from 'react';
import Headers from './Header';
import Footer from './Footer';
import '../allStyles/wishlist.css';
import axios from 'axios';
import { AiFillHeart } from 'react-icons/ai';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

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

    const handleAddToCart = async (productId) => {
        try {
            await axios.post('/api/cart', { productId, quantity: 1 });
            alert('Added to cart');
        } catch (err) {
            alert('Error adding to cart');
        }
    };

    const handleBuyNow = (productId) => {
        alert(`Initiating Buy Now for Product ID: ${productId}`);
    };

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
                            <img src={item.imageUrl} alt={item.name} className="wishlist-image" />
                            <div className="wishlist-details">
                                <h4 className="wishlist-name">{item.name}</h4>
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
