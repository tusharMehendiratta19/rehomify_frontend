import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../allStyles/trends.css";

const blogData = [
  {
    video: "https://videos.pexels.com/video-files/3770033/3770033-sd_640_360_25fps.mp4",
    title: "Living Room Inspiration",
    blogs: [
      { heading: "Minimalist Makeover", content: "Less furniture, clean lines, and neutral tones can completely open up your living space." },
      { heading: "Statement Sofas", content: "A bold colored or uniquely shaped sofa can become the room's focal point." },
      { heading: "Lighting Magic", content: "From warm ceiling fixtures to sleek standing lamps—lighting sets the mood." },
    ],
  },
  {
    video: "https://videos.pexels.com/video-files/2110972/2110972-sd_640_360_30fps.mp4",
    title: "Dining Room Ideas",
    blogs: [
      { heading: "Cozy Corners", content: "Make use of corners with round tables and pendant lights." },
      { heading: "Earthy Textures", content: "Wood, jute, and clay tones add organic charm to your dining experience." },
      { heading: "Mix-Match Chairs", content: "Blending chair styles and colors adds character to your space." },
    ],
  },
  {
    video: "https://videos.pexels.com/video-files/4112424/4112424-sd_640_360_25fps.mp4",
    title: "Bedroom Vibes",
    blogs: [
      { heading: "Soft Tones", content: "Pastels and soft whites can create a calming, sleep-friendly atmosphere." },
      { heading: "Layered Bedding", content: "Mix textures and patterns for a cozy and designer look." },
      { heading: "Functional Furniture", content: "Opt for beds with storage and side tables with drawers to reduce clutter." },
    ],
  },
  {
    video: "https://videos.pexels.com/video-files/4005151/4005151-sd_640_360_30fps.mp4",
    title: "Home Office Goals",
    blogs: [
      { heading: "Ergonomic Setup", content: "Choose chairs and desks that support your back and posture." },
      { heading: "Creative Corners", content: "Utilize unused corners and personalize them with art or plants." },
      { heading: "Natural Lighting", content: "Position desks near windows to enhance productivity." },
    ],
  },
];

const Trends = () => {
  return (
    <div>
      <Header />
      <h3 className="mobile-trends-title">Tips | Ideas | Trends</h3>
      <div className="mobile-trends-container">
        <div className="mobile-trends-grid">
          {blogData.map((item, index) => (
            <div className="mobile-trends-card" key={index}>
              <video
                className="mobile-trend-video"
                src={item.video}
                autoPlay
                muted
                loop
                playsInline
              ></video>
              <div className="mobile-trend-blogs">
                <h3>{item.title}</h3>
                {item.blogs.map((blog, idx) => (
                  <div className="mobile-blog-entry" key={idx}>
                    <h4>{blog.heading}</h4>
                    <p>{blog.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Trends;
