import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../App.css";

const slides = [
  "https://videos.pexels.com/video-files/3770033/3770033-sd_640_360_25fps.mp4",
  "https://videos.pexels.com/video-files/2110972/2110972-sd_640_360_30fps.mp4",
  "https://videos.pexels.com/video-files/4112424/4112424-sd_640_360_25fps.mp4",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => setCurrent((current + 1) % length);
  const prevSlide = () => setCurrent((current - 1 + length) % length);

  return (
    <div className="carousel-container">
      {slides.map((slide, index) => (
        <video
          key={index}
          src={slide}
          alt={`Slide ${index + 1}`}
          autoPlay
          muted
          loop
          playsInline
          className={`carousel-slide ${index === current ? "active" : ""}`}
        />
      ))}
      <button className="carousel-prev" onClick={prevSlide}>
        <FaChevronLeft className="carouselbutton" />
      </button>
      <button className="carousel-next" onClick={nextSlide}>
        <FaChevronRight className="carouselbutton" />
      </button>
    </div>
  );
};

export default Carousel;
