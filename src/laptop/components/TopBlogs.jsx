import React from "react";
import { useNavigate } from "react-router-dom";
import "../allStyles/topblogs.css";

const TopBlogs = () => {
  const navigate = useNavigate();
  return (
    <div className="topblogs">
      <h3><b>Top Blogs that Inspire</b></h3>
      <div className="seller-image-grid">
        <div className="seller-image-card seller-image-card-1" key={1}>
          <img src="https://images.pexels.com/photos/6684174/pexels-photo-6684174.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" className="seller-image seller-image-1" />
          <button className="seller-image-btn seller-image-btn-1" onClick={() => navigate("/blogs/furnish")}>Choose the Perfect wardrobe</button>
        </div>
        <div className="seller-image-card seller-image-card-2" key={2}>
          <img src="https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" className="seller-image seller-image-2" />
          <button className="seller-image-btn seller-image-btn-2" onClick={() => navigate("/blogs/wardrobe")}>Furnish Your Rented Apartment</button>
        </div>
        <div className="seller-image-card seller-image-card-3" key={3}>
          <img src="https://images.pexels.com/photos/6126892/pexels-photo-6126892.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" className="seller-image seller-image-3" />
          <button className="seller-image-btn seller-image-btn-3" onClick={() => navigate("/blogs/singleBed")}>Choose the Perfect Single Wood Bed</button>
        </div>
        <div className="seller-image-card seller-image-card-4" key={4}>
          <img src="https://images.pexels.com/photos/8955317/pexels-photo-8955317.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" className="seller-image seller-image-4" />
          <button className="seller-image-btn seller-image-btn-4" onClick={() => navigate("/blogs/budgetFriendly")}>Budget-Friendly Furniture in Mumbai</button>
        </div>
        <div className="seller-image-card seller-image-card-5" key={5}>
          <img src="https://images.pexels.com/photos/10837793/pexels-photo-10837793.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" className="seller-image seller-image-5" />
          <button className="seller-image-btn seller-image-btn-5" onClick={() => navigate("/blogs/table")}>Choose the Perfect Table</button>
        </div>
        <div className="seller-image-card seller-image-card-6" key={6}>
          <img src="https://images.pexels.com/photos/16436954/pexels-photo-16436954/free-photo-of-two-beds-in-bedroom.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" className="seller-image seller-image-6" />
          <button className="seller-image-btn seller-image-btn-6" onClick={() => navigate("/blogs/rentVsBuy")}>Renting Vs Buying</button>
        </div>
        <div className="seller-image-card seller-image-card-7" key={7}>
          <img src="https://media.istockphoto.com/id/654289190/photo/four-poster-bed-with-mosquito-net-in-bright-hotel-room.jpg?b=1&s=612x612&w=0&k=20&c=8FncAh2GeszNiG5CJwcncsAYoTt4JwaopWxQs05nmOw=" alt="image" className="seller-image seller-image-7" />
          <button className="seller-image-btn seller-image-btn-7" onClick={() => navigate("/blogs/doubleBed")}>Choose the Perfect Double Wood Bed</button>
        </div>
        <div className="seller-image-card seller-image-card-8" key={8}>
          <img src="https://images.pexels.com/photos/17128447/pexels-photo-17128447/free-photo-of-a-tote-bag-with-various-items-inside.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" className="seller-image seller-image-8" />
          <button className="seller-image-btn seller-image-btn-8">Daily Deals & Must-Haves</button>
        </div>
      </div>
    </div>
  );
};

export default TopBlogs;
