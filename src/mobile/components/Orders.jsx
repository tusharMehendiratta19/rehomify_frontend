import React from "react";
import "../allStyles/resellorders.css";
import Header from "./Header";
import Footer from "./Footer";

const ResellOrders = () => {
  const orders = [
    {
      id: "ORD12",
      image:
        "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Smartphone X1",
      description: "6.5-inch display, 128GB storage, 5000mAh battery",
    },
    {
      id: "ORD23",
      image:
        "https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Wireless Headphones",
      description: "Noise cancelling, 40h battery life, Bluetooth 5.2",
    },
    {
      id: "ORD56",
      image:
        "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Laptop Pro",
      description: "15.6-inch FHD, 16GB RAM, 512GB SSD, Intel i7",
    },
    {
      id: "ORD78",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Gaming Console",
      description: "4K HDR, 1TB Storage, Dualshock Controllers",
    },
    {
      id: "ORD910",
      image:
        "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Smartwatch",
      description: "Heart rate, GPS, Waterproof, AMOLED Display",
    },
    {
      id: "ORD1112",
      image:
        "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Tablet Pro",
      description: "10-inch display, 256GB, Stylus support, LTE",
    },
  ];

  return (
    <div>
      <Header />
      <div className="mobile-resell-main">
        <h3 className="mobile-resell-heading">My Orders</h3>
        <div className="mobile-resell-container">
          {orders.map((order) => (
            <div className="mobile-resell-card" key={order.id}>
              <img src={order.image} alt={order.name} className="mobile-resell-image" />
              <div className="mobile-resell-details">
                <h4>{order.name}</h4>
                <p>{order.description}</p>
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <button className="mobile-resell-btn">Check Status</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResellOrders;
