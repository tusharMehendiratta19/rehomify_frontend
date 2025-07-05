import React, { useRef } from "react";
import "../../App.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const dummyProducts = {
  "Products of the day": [
    {
      name: "Wooden Chair",
      description: "Comfortable and classic",
      id: 1,
      image:
        "https://images.pexels.com/photos/31519049/pexels-photo-31519049/free-photo-of-rustic-wooden-chair-in-outdoor-garden-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Plastic Chair",
      description: "Lightweight and durable",
      id: 2,
      image:
        "https://images.pexels.com/photos/7850509/pexels-photo-7850509.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Office Chair",
      description: "Ergonomic and adjustable",
      id: 3,
      image:
        "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Bean Bag",
      description: "The Home Comfort",
      id: 4,
      image:
        "https://images.pexels.com/photos/7602930/pexels-photo-7602930.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    // ],
    // table: [
    {
      name: "Dining Table",
      description: "Spacious and elegant",
      id: 5,
      image:
        "https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Coffee Table",
      description: "Compact and stylish",
      id: 6,
      image:
        "https://media.istockphoto.com/id/1691922005/photo/cozy-stylish-living-room-with-a-round-dining-table-chairs-and-shelf-with-decorative.jpg?b=1&s=612x612&w=0&k=20&c=wzbAUSq5Y870qieKnpD-DOkU7I7l1WudiE-DcTVMMdg=",
    },
    {
      name: "Study Table",
      description: "Functional and strong",
      id: 7,
      image:
        "https://images.pexels.com/photos/11112745/pexels-photo-11112745.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Office Table",
      description: "Workoholic",
      id: 8,
      image:
        "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    // ],
    // sofa: [
    {
      name: "Leather Sofa",
      description: "Luxurious and soft",
      id: 18,
      image:
        "https://media.istockphoto.com/id/2089126618/photo/leather-sofa-with-an-empty-beige-wall-for-mockup.jpg?b=1&s=612x612&w=0&k=20&c=Nft5dLAbzxdKqmmlS7sKkdzZ8ZfKqyzAnDPWdT5kvPc=",
    },
    {
      name: "Fabric Sofa",
      description: "Cozy and affordable",
      id: 9,
      image:
        "https://images.pexels.com/photos/8135269/pexels-photo-8135269.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Recliner Sofa",
      description: "Perfect for relaxation",
      id: 10,
      image:
        "https://media.istockphoto.com/id/1424803291/photo/close-up-view-of-reclining-chair-in-living-room.jpg?b=1&s=612x612&w=0&k=20&c=a-Sv6Ce0yRptEUPHJM1EbSXUVnnpX8CJfcCuWvkBor4=",
    },
    {
      name: "Multi Seat Sofa",
      description: "Movie, Family, Date",
      id: 11,
      image:
        "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
  "New Arrivals": [
    {
      name: "Wooden Chair",
      description: "Comfortable and classic",
      id: 1,
      image:
        "https://images.pexels.com/photos/31519049/pexels-photo-31519049/free-photo-of-rustic-wooden-chair-in-outdoor-garden-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Plastic Chair",
      description: "Lightweight and durable",
      id: 2,
      image:
        "https://images.pexels.com/photos/7850509/pexels-photo-7850509.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Office Chair",
      description: "Ergonomic and adjustable",
      id: 3,
      image:
        "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Bean Bag",
      description: "The Home Comfort",
      id: 4,
      image:
        "https://images.pexels.com/photos/7602930/pexels-photo-7602930.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    // ],
    // table: [
    {
      name: "Dining Table",
      description: "Spacious and elegant",
      id: 5,
      image:
        "https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Coffee Table",
      description: "Compact and stylish",
      id: 6,
      image:
        "https://media.istockphoto.com/id/1691922005/photo/cozy-stylish-living-room-with-a-round-dining-table-chairs-and-shelf-with-decorative.jpg?b=1&s=612x612&w=0&k=20&c=wzbAUSq5Y870qieKnpD-DOkU7I7l1WudiE-DcTVMMdg=",
    },
    {
      name: "Study Table",
      description: "Functional and strong",
      id: 7,
      image:
        "https://images.pexels.com/photos/11112745/pexels-photo-11112745.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Office Table",
      description: "Workoholic",
      id: 8,
      image:
        "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    // ],
    // sofa: [
    {
      name: "Leather Sofa",
      description: "Luxurious and soft",
      id: 18,
      image:
        "https://media.istockphoto.com/id/2089126618/photo/leather-sofa-with-an-empty-beige-wall-for-mockup.jpg?b=1&s=612x612&w=0&k=20&c=Nft5dLAbzxdKqmmlS7sKkdzZ8ZfKqyzAnDPWdT5kvPc=",
    },
    {
      name: "Fabric Sofa",
      description: "Cozy and affordable",
      id: 9,
      image:
        "https://images.pexels.com/photos/8135269/pexels-photo-8135269.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Recliner Sofa",
      description: "Perfect for relaxation",
      id: 10,
      image:
        "https://media.istockphoto.com/id/1424803291/photo/close-up-view-of-reclining-chair-in-living-room.jpg?b=1&s=612x612&w=0&k=20&c=a-Sv6Ce0yRptEUPHJM1EbSXUVnnpX8CJfcCuWvkBor4=",
    },
    {
      name: "Multi Seat Sofa",
      description: "Movie, Family, Date",
      id: 11,
      image:
        "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
  "Explore more Categories": [
    {
      name: "Wooden Chair",
      description: "Comfortable and classic",
      id: 1,
      image:
        "https://images.pexels.com/photos/31519049/pexels-photo-31519049/free-photo-of-rustic-wooden-chair-in-outdoor-garden-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "Plastic Chair",
      description: "Lightweight and durable",
      id: 2,
      image:
        "https://images.pexels.com/photos/7850509/pexels-photo-7850509.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Office Chair",
      description: "Ergonomic and adjustable",
      id: 3,
      image:
        "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Bean Bag",
      description: "The Home Comfort",
      id: 4,
      image:
        "https://images.pexels.com/photos/7602930/pexels-photo-7602930.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    // ],
    // table: [
    {
      name: "Dining Table",
      description: "Spacious and elegant",
      id: 5,
      image:
        "https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Coffee Table",
      description: "Compact and stylish",
      id: 6,
      image:
        "https://media.istockphoto.com/id/1691922005/photo/cozy-stylish-living-room-with-a-round-dining-table-chairs-and-shelf-with-decorative.jpg?b=1&s=612x612&w=0&k=20&c=wzbAUSq5Y870qieKnpD-DOkU7I7l1WudiE-DcTVMMdg=",
    },
    {
      name: "Study Table",
      description: "Functional and strong",
      id: 7,
      image:
        "https://images.pexels.com/photos/11112745/pexels-photo-11112745.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Office Table",
      description: "Workoholic",
      id: 8,
      image:
        "https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    // ],
    // sofa: [
    {
      name: "Leather Sofa",
      description: "Luxurious and soft",
      id: 18,
      image:
        "https://media.istockphoto.com/id/2089126618/photo/leather-sofa-with-an-empty-beige-wall-for-mockup.jpg?b=1&s=612x612&w=0&k=20&c=Nft5dLAbzxdKqmmlS7sKkdzZ8ZfKqyzAnDPWdT5kvPc=",
    },
    {
      name: "Fabric Sofa",
      description: "Cozy and affordable",
      id: 9,
      image:
        "https://images.pexels.com/photos/8135269/pexels-photo-8135269.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Recliner Sofa",
      description: "Perfect for relaxation",
      id: 10,
      image:
        "https://media.istockphoto.com/id/1424803291/photo/close-up-view-of-reclining-chair-in-living-room.jpg?b=1&s=612x612&w=0&k=20&c=a-Sv6Ce0yRptEUPHJM1EbSXUVnnpX8CJfcCuWvkBor4=",
    },
    {
      name: "Multi Seat Sofa",
      description: "Movie, Family, Date",
      id: 11,
      image:
        "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
};

const ProductRow = ({ title, type }) => {
  const products = dummyProducts[type] || [];
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = window.innerWidth / 2;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="product-row">
      <h2 className="product-row-title"><b>{title}</b></h2>
      <div className="scroll-button-container">
        <button
          className="scroll-button left"
          onClick={() => handleScroll("left")}
        >
          <FaChevronLeft />
        </button>
        <button
          className="scroll-button right"
          onClick={() => handleScroll("right")}
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="product-scroll-container" ref={scrollContainerRef}>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-actions">
              <button className="btn-outline" data-protected="true">
                Add to Cart
              </button>
              <button className="btn-primary" data-protected="true">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRow;
