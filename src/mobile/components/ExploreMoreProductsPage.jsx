import React, { useState } from "react";
import "../allStyles/exploremoreproductspage.css";
import { useNavigate } from "react-router-dom";
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
        image: "https://media.istockphoto.com/id/1419880946/photo/graph-of-real-estate-market-where-arrowhead-is-falling.jpg?b=1&s=612x612&w=0&k=20&c=1vxDtf55BU5WL8dkiaGv1TuR_mJQZy8gNo-zexr4cgI=",
        buttonText: "Grab Deals",
    },
    {
        title: "Clearance sale",
        image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=600",
        buttonText: "View Offers",
    },
    // {
    //     title: "Flash delivery",
    //     image: "https://images.pexels.com/photos/6214450/pexels-photo-6214450.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     buttonText: "Order Now",
    // },
];

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
    const navigate = useNavigate();

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

                    {selectedCategory && (
                        <div className="mobile-product-section">
                            <h3 className="mobile-product-heading">{selectedCategory}</h3>
                            <div className="mobile-product-grid-wrapper">
                                {/* Row 1 */}
                                <div className="mobile-product-grid-row" id="row-1">
                                    {dummyProducts[selectedCategory].slice(0, 5).map((product) => (
                                        <div className="empp-mobile-product-card" key={product.id}>
                                            <img src={product.image} alt={product.name} />
                                            <h5>{product.name}</h5>
                                            <p><strong>{product.price}</strong></p>
                                            <div className="mobile-product-buttons">
                                                <button className="mobile-add-to-cart-btn">Add to Cart</button>
                                                <button className="mobile-buy-now-btn">Buy Now</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Row 2 */}
                                <div className="mobile-product-grid-row" id="row-2">
                                    {dummyProducts[selectedCategory].slice(5, 10).map((product) => (
                                        <div className="empp-mobile-product-card" key={product.id}>
                                            <img src={product.image} alt={product.name} />
                                            <h5>{product.name}</h5>
                                            <p><strong>{product.price}</strong></p>
                                            <div className="mobile-product-buttons">
                                                <button className="mobile-add-to-cart-btn">Add to Cart</button>
                                                <button className="mobile-buy-now-btn">Buy Now</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Row 3 */}
                                <div className="mobile-product-grid-row" id="row-3">
                                    {dummyProducts[selectedCategory].slice(10, 15).map((product) => (
                                        <div className="empp-mobile-product-card" key={product.id}>
                                            <img src={product.image} alt={product.name} />
                                            <h5>{product.name}</h5>
                                            <p><strong>{product.price}</strong></p>
                                            <div className="mobile-product-buttons">
                                                <button className="mobile-add-to-cart-btn">Add to Cart</button>
                                                <button className="mobile-buy-now-btn">Buy Now</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
