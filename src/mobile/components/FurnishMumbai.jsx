import React from "react";
import "../allStyles/furnishMumbai.css";
import Header from "./Header";
import Footer from "./Footer";

const FurnishMumbai = () => {
    return (
        <>
            <Header />
            <div className="furnishMumbai-container">
                <h1 className="furnishMumbai-title">
                    How to Furnish Your First Mumbai Apartment on a Budget
                </h1>

                <p className="furnishMumbai-paragraph">
                    Moving to Mumbai is an exciting chapter, whether you’re a student
                    settling in for the first time or a young professional finding your own
                    space. But once you’ve got the keys, the question comes—how do you
                    furnish your new apartment without overspending?
                </p>

                <p className="furnishMumbai-paragraph">
                    In a city where rent already takes up a big part of your budget, the
                    smartest approach is to choose furniture that delivers both value and
                    versatility. The trick isn’t to buy more, but to invest in the right mix
                    of pieces that fit your lifestyle today and adapt as your needs grow.
                </p>

                <p className="furnishMumbai-paragraph">
                    That’s exactly what <span className="furnishMumbai-brand">Rehomify</span> offers. We
                    make it simple with a thoughtful balance of new and refurbished
                    furniture. Each piece is chosen for durability, style, and practicality.
                    And with our <strong>100% buyback guarantee</strong>, you can upgrade or
                    resell whenever life changes—always at a fair, transparent price.
                </p>

                <h2 className="furnishMumbai-subtitle">Wardrobes</h2>
                <p className="furnishMumbai-paragraph">
                    A wardrobe is the backbone of any Mumbai apartment. Our 2-door wooden
                    wardrobes are space-smart and stylish, ideal for compact rooms. With
                    clever designs that include shelves and drawers, you get maximum
                    organization in minimum space.
                </p>
                <ul className="furnishMumbai-list">
                    <li>
                        <strong>Bachelors:</strong> Your “landing zone” for clothes, laundry,
                        and random stuff.
                    </li>
                    <li>
                        <strong>Families:</strong> Store clothes, linens, toys, or extra
                        household items.
                    </li>
                    <li>
                        <strong>Students:</strong> Keep textbooks, stationery, and essentials
                        neatly organized.
                    </li>
                </ul>
                <div className="furnishMumbai-cta-box">
                    👉 <span className="furnishMumbai-link">Explore Our Wardrobe Collection</span>
                </div>

                <h2 className="furnishMumbai-subtitle">Beds</h2>
                <p className="furnishMumbai-paragraph">
                    Your bed is the centerpiece of your home. A single bed with storage
                    works perfectly for solo living, while a double or queen-size wooden bed
                    adds long-term comfort. Our collection includes both new and refurbished
                    options, so you can choose what works best for your budget.
                </p>
                <ul className="furnishMumbai-list">
                    <li>
                        <strong>Bachelors:</strong> Single beds with storage double as a mini
                        wardrobe or nap spot.
                    </li>
                    <li>
                        <strong>Couples:</strong> A sturdy double/queen bed keeps you
                        comfortable—no squeaks, no surprises.
                    </li>
                    <li>
                        <strong>Families:</strong> Storage beds are perfect for blankets,
                        pillows, and kids’ essentials.
                    </li>
                </ul>
                <div className="furnishMumbai-cta-box">
                    👉 <span className="furnishMumbai-link">Shop Single Beds</span> | 👉{" "}
                    <span className="furnishMumbai-link">Shop Double Beds</span>
                </div>

                <h2 className="furnishMumbai-subtitle">Study Tables</h2>
                <p className="furnishMumbai-paragraph">
                    No apartment feels complete without a study table. Even in small Mumbai
                    homes, a compact work corner makes a huge difference. Our wooden study
                    tables with storage keep books, laptops, and stationery neatly arranged.
                </p>
                <ul className="furnishMumbai-list">
                    <li>
                        <strong>Bachelors:</strong> Doubles as a mini wardrobe or snack
                        station.
                    </li>
                    <li>
                        <strong>Students:</strong> The ultimate all-nighter companion.
                    </li>
                    <li>
                        <strong>Professionals:</strong> Keeps work productive without taking
                        up space.
                    </li>
                </ul>
                <div className="furnishMumbai-cta-box">
                    👉 <span className="furnishMumbai-link">Browse Study Tables</span>
                </div>

                <h2 className="furnishMumbai-subtitle">Why Choose Rehomify?</h2>
                <ul className="furnishMumbai-list">
                    <li>A mix of new and refurbished furniture for every budget</li>
                    <li>Space-saving wardrobes, beds with storage, and study tables</li>
                    <li>Designs that suit compact Mumbai apartments</li>
                    <li>Hassle-free delivery across the city</li>
                    <li>Transparent buyback guarantees for stress-free ownership</li>
                </ul>

                <p className="furnishMumbai-closing-text">
                    Furnishing your first Mumbai apartment doesn’t have to drain your
                    budget. By choosing the right mix of new and refurbished essentials, you
                    can create a home that’s stylish, comfortable, and flexible for the
                    future.
                </p>

                <div className="furnishMumbai-cta-box furnishMumbai-final-cta">
                    Start your journey with <span className="furnishMumbai-brand">Rehomify</span> and turn
                    your Mumbai apartment into a home you’ll love.
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FurnishMumbai;
