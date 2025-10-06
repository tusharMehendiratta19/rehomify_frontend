import React from "react";
import "../allStyles/rentingvsbuying.css";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const RentingVsBuying = () => {
    const navigate = useNavigate()
    return (
        <>
            <Header />
            <div className="rvb-container">
                <h1 className="rvb-title">
                    Renting vs Buying Furniture: Why Ownership is the Smarter Choice
                </h1>

                <p className="rvb-intro">
                    Moving to Mumbai presents exciting opportunities, but furnishing your
                    apartment can be a big decision—especially when choosing between renting
                    or buying...
                </p>

                <section className="rvb-section">
                    <h2 className="rvb-subtitle">The Hidden Cost of Renting Wardrobes, Beds, and Study Tables</h2>
                    <p className="rvb-paragraph">
                        Furniture rental may look cheaper in the beginning, but over time, you
                        pay much more. Here’s what popular providers in Mumbai typically
                        charge:
                    </p>
                    <ul className="rvb-list">
                        <li>Wardrobes: ₹600–700/month</li>
                        <li>Single Beds: ₹500–700/month</li>
                        <li>Double Beds: ₹1,000–1,200/month</li>
                    </ul>
                    <p className="rvb-paragraph">
                        👉 In comparison, purchasing the same furniture from Rehomify costs
                        about the same as just one year of rent. But unlike renting, you own
                        it—no ongoing monthly fees, no stress about “wear and tear,” and
                        complete freedom to customize your space.
                    </p>
                </section>

                <section className="rvb-products">
                    <div className="rvb-product-card">
                        <h3 className="rvb-product-title">Wardrobes</h3>
                        <p className="rvb-paragraph">
                            Our sturdy, space-saving 2-door wardrobes are priced close to annual
                            rental costs—but they’re yours to own.
                        </p>
                        <button className="rvb-shop-btn" onClick={() => navigate("/products", { state: { selectedCategory: "Cupboard" } })}>👉 Shop Wardrobes</button>
                    </div>

                    <div className="rvb-product-card">
                        <h3 className="rvb-product-title">Single Beds</h3>
                        <p className="rvb-paragraph">
                            Instead of paying rent forever, choose a refurbished solid wood
                            single bed or a single bed with storage.
                        </p>
                        <button className="rvb-shop-btn" onClick={() => navigate("/products", { state: { selectedCategory: "Single Bed" } })}>👉 Shop Single Beds</button>
                    </div>

                    <div className="rvb-product-card">
                        <h3 className="rvb-product-title" onClick={() => navigate("/products", { state: { selectedCategory: "Double Bed" } })}>Double Beds</h3>
                        <p className="rvb-paragraph">
                            For couples or longer stays, a new double bed with drawers or a
                            queen size bed is the best investment.
                        </p>
                        <button className="rvb-shop-btn" onClick={() => navigate("/products", { state: { selectedCategory: "Double Bed" } })}>👉 Shop Double Beds</button>
                    </div>

                    <div className="rvb-product-card">
                        <h3 className="rvb-product-title">Study Tables</h3>
                        <p className="rvb-paragraph">
                            An ergonomic wooden study table with storage is a daily necessity.
                        </p>
                        <button className="rvb-shop-btn" onClick={() => navigate("/products", { state: { selectedCategory: "Table" } })}>👉 Browse Study Tables</button>
                    </div>
                </section>

                <section className="rvb-final">
                    <h2 className="rvb-subtitle">Your Ownership Advantage: The Buyback Guarantee</h2>
                    <p className="rvb-paragraph">
                        The biggest worry about buying is: What if I move? That’s where our
                        100% buyback guarantee makes the difference.
                    </p>
                    <p className="rvb-paragraph">
                        👉 Don’t keep paying for someone else’s furniture—build your own space,
                        your own way. Start your smart Mumbai journey today with Rehomify.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default RentingVsBuying;
