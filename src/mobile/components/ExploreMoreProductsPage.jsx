import React, { useState, useEffect } from "react";
import "../allStyles/exploremoreproductspage.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";

const categories = [
    {
        title: "Product under 5000",
        image: "https://images.pexels.com/photos/4553183/pexels-photo-4553183.jpeg?auto=compress&cs=tinysrgb&w=600",
        buttonText: "Shop Now",
    },
    {
        title: "Popular right now",
        image: "https://media.istockphoto.com/id/1200899068/photo/abstract-rating-star-like-positive-feedback.jpg?b=1&s=612x612&w=0&k=20&c=s9UsGpq5hqlzcnBkRfZWoFzzN8DFG40xAHq8f9sSjyw=",
        buttonText: "Explore",
    },
    {
        title: "Deep discounts",
        image: "https://media.istockphoto.com/id/1419880946/photo/graph-of-real-estate-market-where-arrowhead-is-falling.jpg?b=1&s=612x612&w=0&k=20&c=1vxDtf55BU5WL8dkiaGv1TuR_mJQZy8gNo-zexr4cgI=",
        buttonText: "Grab Deals",
    },
    {
        title: "Clearance sale",
        image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=600",
        buttonText: "View Offers",
    },
];

const ExploreMoreProductsPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const isLoggedIn = !!localStorage.getItem("token") && !!localStorage.getItem("custId");
    const [wishlist, setWishlist] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    const [selectedCategory, setSelectedCategory] = useState("Product under 5000");
    const [categorizedProducts, setCategorizedProducts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndCategorizeProducts = async () => {
            try {
                const res = await axios.get("https://rehomify.in/v1/products/all");
                const all = res.data.data || [];

                const categorized = {
                    "Product under 5000": all.filter((p) => p.price < 5000),
                    "Popular right now": [...all].sort((a, b) => b.price - a.price).slice(0, 10),
                    "Deep discounts": all.filter((p) => p.price < 8000),
                    "Clearance sale": all.slice(0, 10),
                };

                setCategorizedProducts(categorized);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchCustomerDetails = async () => {
            try {
                const res = await axios.get(`https://rehomify.in/v1/auth/getCustomerDetails/${localStorage.getItem("custId")}`);
                if (res.data?.status) {
                    const { cart = [], wishlist = [] } = res.data.data;
                    setCartItems(cart.map(p => p.productId));
                    setWishlist(wishlist.map(p => p.productId));
                    console.log("Customer wishlist:", wishlist);
                }
            } catch (err) {
                console.error("Error fetching customer details:", err);
            }
        };

        if (isLoggedIn) {
            fetchCustomerDetails();
            fetchAndCategorizeProducts();
        }
    }, []);

    const showSnackbar = (message) => {
        setSnackbar({ open: true, message });
        setTimeout(() => setSnackbar({ open: false, message: "" }), 3000);
    };

    const addToCart = async (productId) => {
        if (!isLoggedIn) return showSnackbar("Please login to add items to cart");
        try {
            const res = await axios.post("https://rehomify.in/v1/cart/addToCart", {
                custId: localStorage.getItem("custId"),
                productId
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res.status) {
                setCartItems(prev => [...prev, productId]);
                showSnackbar("Added to Cart");
            }
        } catch (err) {
            console.error("Add to cart failed:", err);
            showSnackbar("Error adding to Cart");
        }
    };

    const buyNow = async (productId) => {
        if (!isLoggedIn) return showSnackbar("Please login to proceed");

        try {
            await axios.post("https://rehomify.in/v1/cart/addToCart", {
                custId: localStorage.getItem("custId"),
                productId
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            navigate("/checkout", { state: { productId, fromCart: true } });
        } catch (err) {
            console.error("Buy Now failed:", err);
            showSnackbar("Error proceeding to Buy Now");
        }
    };

    const toggleWishlist = async (productId) => {
        if (!isLoggedIn) return showSnackbar("Please login to wishlist");

        if (wishlist.includes(productId)) {
            try {
                const res = await axios.post("https://rehomify.in/v1/wishlist/updateWishlist", {
                    custId: localStorage.getItem("custId"),
                    productId,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (res.status) {
                    setWishlist(wishlist.filter(id => id !== productId));
                    showSnackbar("Removed from Wishlist");
                }
            } catch (err) {
                console.error("Remove from wishlist error:", err);
                showSnackbar("Error removing from Wishlist");
            }
        } else {
            try {
                const res = await axios.post("https://rehomify.in/v1/wishlist/addToWishlist", {
                    custId: localStorage.getItem("custId"),
                    productId,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (res.status) {
                    setWishlist(prev => [...prev, productId]);
                    showSnackbar("Added to Wishlist");
                }
            } catch (err) {
                console.error("Add to wishlist error:", err);
                showSnackbar("Error adding to Wishlist");
            }
        }
    };

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <>
            <Header />
            <div className="mobile-explore-container">
                <div className="mobile-explore-layout">
                    <div className="mobile-category-sidebar">
                        {categories.map((cat, index) => (
                            <div
                                className="mobile-category-small-card"
                                key={index}
                                onClick={() => setSelectedCategory(cat.title)}
                            >
                                <img src={cat.image} alt={cat.title} className="mobile-category-thumb" />
                                <p className="mobile-category-label">{cat.title}</p>
                            </div>
                        ))}
                    </div>

                    {selectedCategory && categorizedProducts[selectedCategory] && (
                        <div className="mobile-product-section">
                            <h3 className="mobile-product-heading">{selectedCategory}</h3>
                            <div className="mobile-product-grid-wrapper">
                                {Array.from({ length: 3 }, (_, rowIndex) => (
                                    <div className="mobile-product-grid-row" key={rowIndex}>
                                        {categorizedProducts[selectedCategory]
                                            .slice(rowIndex * 5, rowIndex * 5 + 5)
                                            .map((product) => (
                                                <div
                                                    className="empp-mobile-product-card"
                                                    key={product._id}
                                                >
                                                    <div
                                                        className="mobile-product-image-wrapper"
                                                        onClick={() => handleProductClick(product._id)}
                                                    >
                                                        <img src={product.image} alt={product.name} />
                                                        <button
                                                            className="wishlist-icon"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleWishlist(product._id);
                                                            }}
                                                        >
                                                            {wishlist.includes(product._id) ? (
                                                                <AiFillHeart color="red" />
                                                            ) : (
                                                                <FiHeart />
                                                            )}
                                                        </button>
                                                    </div>

                                                    <div className="mobile-product-info">
                                                        <h5
                                                            className="mobile-product-name"
                                                            onClick={() => handleProductClick(product._id)}
                                                        >
                                                            {product.name}
                                                        </h5>
                                                        <p
                                                            className="mobile-product-price"
                                                            onClick={() => handleProductClick(product._id)}
                                                        >
                                                            <strong>₹{product.price}</strong>
                                                        </p>
                                                        <div className="mobile-product-buttons">
                                                            {cartItems.includes(product._id) ? (
                                                                <button
                                                                    className="mobile-add-to-cart-btn"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        navigate("/cart");
                                                                    }}
                                                                >
                                                                    Go To Cart
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="mobile-add-to-cart-btn"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        addToCart(product._id);
                                                                    }}
                                                                >
                                                                    Add to Cart
                                                                </button>
                                                            )}
                                                            <button
                                                                className="mobile-buy-now-btn"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    buyNow(product._id);
                                                                }}
                                                            >
                                                                Buy Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </>
    );
};

export default ExploreMoreProductsPage;
