import React, { useState } from "react";
import "../allStyles/exploremoreproductspage.css";
import Header from "./Header";
import Footer from "./Footer";

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
        image:
            "https://media.istockphoto.com/id/1419880946/photo/graph-of-real-estate-market-where-arrowhead-is-falling.jpg?b=1&s=612x612&w=0&k=20&c=1vxDtf55BU5WL8dkiaGv1TuR_mJQZy8gNo-zexr4cgI=",
        buttonText: "Grab Deals",
    },
    {
        title: "Clearance sale",
        image:
            "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=600",
        buttonText: "View Offers",
    },
    {
        title: "Flash delivery",
        image:
            "https://images.pexels.com/photos/6214450/pexels-photo-6214450.jpeg?auto=compress&cs=tinysrgb&w=600",
        buttonText: "Order Now",
    },
];

// Dummy products for each category
const dummyProducts = {
    "Product under 5000": Array(15).fill().map((_, i) => ({
        name: `Affordable Item ${i + 1}`,
        price: `₹${(i + 1) * 899}`,
        image: "https://images.pexels.com/photos/31519049/pexels-photo-31519049/free-photo-of-rustic-wooden-chair-in-outdoor-garden-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    })),
    "Popular right now": Array(15).fill().map((_, i) => ({
        name: `Trending Product ${i + 1}`,
        price: `₹${(i + 1) * 1999}`,
        image: "https://media.istockphoto.com/id/2089126618/photo/leather-sofa-with-an-empty-beige-wall-for-mockup.jpg?b=1&s=612x612&w=0&k=20&c=Nft5dLAbzxdKqmmlS7sKkdzZ8ZfKqyzAnDPWdT5kvPc=",
    })),
    "Deep discounts": Array(15).fill().map((_, i) => ({
        name: `Deal ${i + 1}`,
        price: `₹${(i + 1) * 500}`,
        image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600",
    })),
    "Clearance sale": Array(15).fill().map((_, i) => ({
        name: `Clearance Item ${i + 1}`,
        price: `₹${(i + 1) * 350}`,
        image: "https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=600",
    })),
    "Flash delivery": Array(15).fill().map((_, i) => ({
        name: `Fast Delivery ${i + 1}`,
        price: `₹${(i + 1) * 799}`,
        image: "https://images.pexels.com/photos/11112745/pexels-photo-11112745.jpeg?auto=compress&cs=tinysrgb&w=600",
    })),
};

const ExploreMoreProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Product under 5000");

    const handleAddToCart = (product) => {
        console.log("Added to cart:", product);
        // Add logic to store in cart context/state
    };

    const handleBuyNow = (product) => {
        console.log("Buying now:", product);
        // Redirect to checkout or show buy now modal
    };


    return (
        <><Header />
            <div className="explore-container">
                {/* <h2 className="explore-title"><b>Explore More Categories</b></h2> */}

                <div className="explore-layout">
                    <div className="category-sidebar">
                        {categories.map((cat, index) => (
                            <div className="category-small-card" key={index}
                            onClick={() => setSelectedCategory(cat.title)}
                            >
                                <img src={cat.image} alt={cat.title} className="category-thumb" />
                                <p className="category-label">{cat.title}</p>
                                
                            </div>
                        ))}
                    </div>

                    {selectedCategory && (
                        <div className="product-section">
                            <h3 className="product-heading">{selectedCategory}</h3>
                            <div className="product-grid">
                                {dummyProducts[selectedCategory].map((product, idx) => (
                                    <div className="product-card-explore" key={idx}>
                                        <img src={product.image} alt={product.title} className="category-thumb-main" />
                                        <p className="product-name">{product.name}</p>
                                        <p className="product-price">{product.price}</p>
                                        <div className="product-buttons">
                                            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                            <button className="buy-now-btn" onClick={() => handleBuyNow(product)}>Buy Now</button>
                                        </div>
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
