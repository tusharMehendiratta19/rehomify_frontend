import React from "react";
import SellerNav from "./SellerNav";
import SellerHeader from "./SellerHeader";
import "./seller-style.css";

const SellerNote = () => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <SellerHeader />
      <SellerNav />
      <div className="seller-note-wrapper">
        <form className="seller-note-form">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input type="date" defaultValue={today} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="form-textarea"
            ></textarea>
          </div>
          <button type="submit" className="form-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SellerNote;
