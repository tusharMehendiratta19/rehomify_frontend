import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../allStyles/profile.css";
import Header from "./Header";
import Footer from "./Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const custId = localStorage.getItem("custId");
    if (!custId) {
      navigate("/login");
      return;
    }

    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`https://rehomify.in/v1/auth/getCustomerDetails/${custId}`);
        if (res.data?.status) {
          setUser(res.data.data);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        navigate("/login");
      }
    };

    fetchCustomer();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(user.mobileNo)) {
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Mobile number must be exactly 10 digits.", type: "error" }
      }));
      return;
    }
    try {
      setEditMode(false);
      const res = await axios.post("https://rehomify.in/v1/auth/saveCustomerDetails", {
        id: localStorage.getItem("custId"),
        name: user.name,
        email: user.email,
        mobileNo: user.mobileNo,
      });

      if (res.data?.status) {
        window.dispatchEvent(new CustomEvent("snackbar", {
          detail: { message: "Profile updated successfully!", type: "success" }
        }));
        setUser(res.data.data); // assuming API returns updated customer in `data`
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      console.error("Save error:", err.message);
      window.dispatchEvent(new CustomEvent("snackbar", {
        detail: { message: "Failed to update profile.", type: "error" }
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("custId");
    localStorage.removeItem("token");
    window.dispatchEvent(new CustomEvent("snackbar", {
      detail: { message: "Logged out successfully.", type: "success" }
    }));
    navigate("/login");
  };

  if (!user) {
    return (
      <div>
        <Header />
        <div className="profile-container">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h2>My Profile</h2>
        <div className="profile-card">
          <div className="profile-field">
            <label>Name:</label>
            {editMode ? (
              <input name="name" value={user.name || ""} onChange={handleChange} />
            ) : (
              <span>{user.name}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Email:</label>
            {editMode ? (
              <input name="email" value={user.email || ""} onChange={handleChange} />
            ) : (
              <span>{user.email}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Mobile:</label>
            {editMode ? (
              <input
                name="mobileNo"
                value={user.mobileNo || ""}
                onChange={handleChange}
                maxLength={10}
                pattern="\d*"
              />

            ) : (
              <span>{user.mobileNo}</span>
            )}
          </div>

          <div className="profile-field">
            <label>Customer Since:</label>
            <span>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : "N/A"}
            </span>
          </div>

          <div className="profile-field">
            <label>Total Orders:</label>
            <span>{user.orders?.total ?? 0}</span>
          </div>

          <div className="profile-actions">
            {editMode ? (
              <button className="save-btn" onClick={handleSave}>Save</button>
            ) : (
              <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
            )}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            {/* <button className="deactivate-btn">Deactivate Account</button> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
