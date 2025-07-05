import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({ ...prev, images: [...e.target.files] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add form submission logic here
  };

  return (
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
        value={formData.addresslin1}
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
  );
};

export default ResellForm;
