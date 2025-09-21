import React, { useState } from "react";
import axios from "axios";
import "../../App.css";

const ResellForm = ({ handleCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailid: "",
    mobileNo: "",
    productName: "",
    category: "",
    description: "",
    addressline1: "",
    addressline2: "",
    pincode: "",
    landmark: "",
    price: "",
    images: [],
  });

  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [pincodeValid, setPincodeValid] = useState(null); // null = not checked, true/false after check

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "pincode" && value.length === 6) {
      checkPincode(value);
    }
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({ ...prev, images: [...e.target.files] }));
  };

  const checkPincode = async (pin) => {
    try {
      const res = await axios.post("https://rehomify.in/v1/products/pincodeCheck", {
        pincode: pin,
      });
      if (res.data.success) {
        setPincodeValid(true);
      } else {
        setPincodeValid(false);
      }
      setPincodeChecked(true);
    } catch (err) {
      console.error("Pincode check failed:", err);
      setPincodeValid(false);
      setPincodeChecked(true);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // append all text fields
      Object.keys(formData).forEach((key) => {
        if (key !== "images") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // append images (multiple)
      if (formData.images.length > 0) {
        formData.images.forEach((file, index) => {
          if (index === 0) {
            // first image as mainImage
            formDataToSend.append("cpImages", file);
          } else {
            formDataToSend.append("optionalImages", file);
          }
        });
      }

      const response = await axios.post(
        "https://rehomify.in/v1/products/addResellProduct",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response)

      if (response.data?.status) {
        alert("Resell product submitted successfully!");
        console.log("API Response:", response.data);
      } else {
        alert(response.data.message);
        console.error("API Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Something went wrong!");
    }
  };


  return (
    <>
      {!pincodeChecked && (
        <form className="product-form" onSubmit={handleSubmit}>
          {/* Ask user to enter pincode first */}
          <input
            type="tel"
            maxLength={6}
            minLength={6}
            name="pincode"
            placeholder="Pin code"
            value={formData.pincode}
            onChange={handleChange}
            className="pincode"
          />
        </form>
      )}

      {pincodeChecked && pincodeValid && (
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              name="emailid"
              placeholder="Email ID"
              value={formData.emailid}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="mobileNo"
              minLength={10}
              maxLength={10}
              placeholder="Mobile Number"
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="addressline1"
            placeholder="Pick Up Address line 1"
            value={formData.addressline1}
            onChange={handleChange}
          />
          <input
            type="text"
            name="addressline2"
            placeholder="Pick Up Address line 2"
            value={formData.addressline2}
            onChange={handleChange}
          />

          <div className="landmark-pincode">
            <input
              type="tel"
              maxLength={6}
              minLength={6}
              name="pincode"
              placeholder="Pin code"
              value={formData.pincode}
              className="pincode"
              onChange={handleChange}
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="landmark"
            />
          </div>

          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={formData.price}
            onChange={handleChange}
          />

          <div className="form-row">
            <label className="file-label">
              Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className="resell-buttons">
            <button type="submit" className="btn-submit">
              Submit
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {pincodeChecked && pincodeValid === false && (
        <p className="pincode-error">Pincode is not Serviceable</p>
      )}
    </>
  );
};

export default ResellForm;
