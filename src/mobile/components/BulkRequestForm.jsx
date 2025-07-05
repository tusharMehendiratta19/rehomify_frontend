import React, { useState } from 'react';
import '../../App.css';

const BulkRequestForm = () => {
  const [form, setForm] = useState({
    name: '',
    number: '',
    email: '',
    address: '',
    requirement: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bulk Request:', form);
    // Add your API logic here
  };

  return (
    <div className="bulk-request-form-container">
      <form onSubmit={handleSubmit} className="bulk-request-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="number"
            value={form.number}
            onChange={handleChange}
            required
            maxLength={10}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Email (optional)</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            rows="3"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Requirement</label>
          <textarea
            name="requirement"
            value={form.requirement}
            onChange={handleChange}
            required
            rows="3"
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BulkRequestForm;
