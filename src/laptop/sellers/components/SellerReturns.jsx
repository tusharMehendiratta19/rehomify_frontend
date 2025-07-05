import React from "react";
import SellerNav from "./SellerNav";
import SellerHeader from "./SellerHeader";
import "../sellerstyles/seller-style.css";


const orders = [
  
  {
    id: 5,
    product: "Leather Sofa",
    price: 1499,
    Pincode: 324002,
    status: "Delivered",
    image:
      "https://media.istockphoto.com/id/2089126618/photo/leather-sofa-with-an-empty-beige-wall-for-mockup.jpg?b=1&s=612x612&w=0&k=20&c=Nft5dLAbzxdKqmmlS7sKkdzZ8ZfKqyzAnDPWdT5kvPc=",
  },
  {
    id: 6,
    product: "Fabric Sofa",
    price: 1599,
    Pincode: 324002,
    status: "Delivered",
    image:
      "https://images.pexels.com/photos/8135269/pexels-photo-8135269.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    product: "Single Bed Classic",
    price: 1699,
    Pincode: 324002,
    status: "Delivered",
    image:
      "https://images.pexels.com/photos/9899861/pexels-photo-9899861.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    product: "Double Bed Deluxe",
    price: 1799,
    Pincode: 324002,
    status: "Delivered",
    image:
      "https://images.pexels.com/photos/3288100/pexels-photo-3288100.png?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 9,
    product: "Modern Cupboard",
    price: 1899,
    Pincode: 324002,
    status: "Delivered",
    image:
      "https://images.pexels.com/photos/6782465/pexels-photo-6782465.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 10,
    product: "Office Chair",
    price: 1999,
    Pincode: 324002,
    status: "Delivered",
    image:
      "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const SellerReturns = () => (
  <>
    <div className="seller-orders-wrapper">
      <h2>Resell Requests</h2>
      <div className="orders-container">
        {orders.map((o) => (
          <div key={o.id} className="order-card">
            <img src={o.image} alt={o.product} className="order-image" />
            <div className="order-details">
              <h4 className="order-title">{o.product}</h4>
              <p className="order-info">Price: ₹{o.price}</p>
              <p className="order-info">Pin code: {o.Pincode}</p>
              <p className="order-status">{o.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default SellerReturns;
