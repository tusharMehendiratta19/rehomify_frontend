import React, { useState } from "react";
import "../sellerstyles/sellerProducts.css";

const categories = ["All", "Chair", "Table", "Bed", "Cupboard", "Sofa"];

const products = {
  Chair: [
    {
      id: 1,
      name: "Wooden Chair",
      description: "Comfortable and classic",
      category: "Chairs",
      image:
        "https://images.pexels.com/photos/31519049/pexels-photo-31519049/free-photo-of-rustic-wooden-chair-in-outdoor-garden-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      name: "Plastic Chair",
      description: "Lightweight and durable",
      category: "Chairs",
      image:
        "https://images.pexels.com/photos/7850509/pexels-photo-7850509.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Office Chair",
      description: "Ergonomic and adjustable",
      category: "Chairs",
      image:
        "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
  Table: [
    {
      id: 4,
      name: "Dining Table",
      description: "Spacious and elegant",
      category: "Tables",
      image:
        "https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      name: "Coffee Table",
      description: "Compact and stylish",
      category: "Tables",
      image:
        "https://media.istockphoto.com/id/1691922005/photo/cozy-stylish-living-room-with-a-round-dining-table-chairs-and-shelf-with-decorative.jpg?b=1&s=612x612&w=0&k=20&c=wzbAUSq5Y870qieKnpD-DOkU7I7l1WudiE-DcTVMMdg=",
    },
    {
      id: 6,
      name: "Study Table",
      description: "Functional and strong",
      category: "Tables",
      image:
        "https://images.pexels.com/photos/11112745/pexels-photo-11112745.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
  Sofa: [
    {
      id: 7,
      name: "Leather Sofa",
      description: "Luxurious and soft",
      category: "Sofas",
      image:
        "https://media.istockphoto.com/id/2089126618/photo/leather-sofa-with-an-empty-beige-wall-for-mockup.jpg?b=1&s=612x612&w=0&k=20&c=Nft5dLAbzxdKqmmlS7sKkdzZ8ZfKqyzAnDPWdT5kvPc=",
    },
    {
      id: 8,
      name: "Fabric Sofa",
      description: "Cozy and affordable",
      category: "Sofas",
      image:
        "https://images.pexels.com/photos/8135269/pexels-photo-8135269.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 9,
      name: "Recliner Sofa",
      description: "Perfect for relaxation",
      category: "Sofas",
      image:
        "https://media.istockphoto.com/id/1424803291/photo/close-up-view-of-reclining-chair-in-living-room.jpg?b=1&s=612x612&w=0&k=20&c=a-Sv6Ce0yRptEUPHJM1EbSXUVnnpX8CJfcCuWvkBor4=",
    },
  ],
  Bed: [
    {
      id: 10,
      name: "Single Bed Classic",
      description: "Comfortable and compact",
      category: "Single Bed",
      image:
        "https://images.pexels.com/photos/9899861/pexels-photo-9899861.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 11,
      name: "Double Bed Classic",
      description: "Comfortable and large",
      category: "Double Bed",
      image:
        "https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=600",
    },
  ],
  Cupboard: [
    {
      id: 16,
      name: "Wooden Cupboard",
      description: "Durable and stylish",
      category: "Cup board",
      image:
        "https://images.pexels.com/photos/6508346/pexels-photo-6508346.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 18,
      name: "Modern Cupboard",
      description: "Spacious and luxurious",
      category: "Cup board",
      image:
        "https://images.pexels.com/photos/6782465/pexels-photo-6782465.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ],
};

const MobileSellerProducts = () => {
  const [activeBtn, setActiveBtn] = useState("All");

  const filteredProducts =
    activeBtn === "All"
      ? Object.values(products).flat()
      : products[activeBtn] || [];

  return (
    <div className="mobile-seller-products-container">
      <div className="mobile-category-grid">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`mobile-seller-nav-btn ${activeBtn === cat ? "mobile-active" : ""
              }`}
            onClick={() => setActiveBtn(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="mobile-search-bar"
      />

      <div className="mobile-products-grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="mobile-product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSellerProducts;