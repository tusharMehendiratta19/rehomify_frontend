import React from "react";
import "../../App.css";

const blogImages = [
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  "https://images.pexels.com/photos/5243990/pexels-photo-5243990.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
  "https://images.pexels.com/photos/9899861/pexels-photo-9899861.jpeg",
  "https://images.pexels.com/photos/3288100/pexels-photo-3288100.png",
  "https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg",
];

const Blogs = () => {
  return (
    <div className="blogs-wrapper">
      <h2 className="blogs-heading">Latest Blogs</h2>
      <div className="blogs-container">
        {blogImages.map((src, index) => (
          <div className="blog-card" key={index}>
            <img src={src} alt={`blog-${index}`} className="blog-img" />
            <button className="blog-hover-btn">Go to Blog</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
