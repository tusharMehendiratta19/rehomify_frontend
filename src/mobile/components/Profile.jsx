import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Header from "./Header";
import Footer from "./Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Tushar Sharma",
    email: "tushar@example.com",
    mobile: "9876543210",
    customerSince: "2022-06-15",
    totalOrders: 42,
    totalReturns: 5,
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    // You can add API update logic here
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-card">
          <div className="profile-field">
            <label>Name:</label>
            {editMode ? (
              <input name="name" value={user.name} onChange={handleChange} />
            ) : (
              <span>{user.name}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Email:</label>
            {editMode ? (
              <input name="email" value={user.email} onChange={handleChange} />
            ) : (
              <span>{user.email}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Mobile:</label>
            {editMode ? (
              <input
                name="mobile"
                value={user.mobile}
                onChange={handleChange}
              />
            ) : (
              <span>{user.mobile}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Customer Since:</label>
            <span>{user.customerSince}</span>
          </div>

          <div className="profile-field">
            <label>Total Orders:</label>
            <span>{user.totalOrders}</span>
          </div>

          <div className="profile-field">
            <label>Total Returns:</label>
            <span>{user.totalReturns}</span>
          </div>

          <div className="profile-actions">
            {editMode ? (
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                Edit
              </button>
            )}
            <button className="logout-btn" onClick={() => navigate("/login")}>
              Logout
            </button>
            <button className="deactivate-btn">Deactivate Account</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
