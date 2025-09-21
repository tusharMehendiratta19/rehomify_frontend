import React,{useState,useEffect} from "react";
import "../allStyles/resellorders.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const ResellOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const custId = localStorage.getItem("custId");
    let result = axios.get(`https://rehomify.in/v1/orders/${custId}`);

    if (result) {
      result.then((res) => {
        console.log(res.data);
        setOrders(res.data);
      });
    } else {
      setOrders([]);
    }

  }, []);

  return (
    <div>
      <Header />
      <div className="resell-main">
        <h3 className="resell-heading">Products available for Resell</h3>
        <div className="resell-container">
          {orders.map((order) => (
            <div className="resell-card" key={order.id}>
              <img src={order.product.imageUrl} alt={order.name} className="resell-image" />
              <div className="resell-details">
                <h4>{order.product.name}</h4>
                <p>{order.description}</p>
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <button className="resell-btn">Resell</button>
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
