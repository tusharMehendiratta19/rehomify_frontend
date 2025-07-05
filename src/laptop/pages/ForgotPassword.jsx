import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../allStyles/login.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    number: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add validation or API call here
    if (form.newPassword !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Simulate successful password reset
    alert('Password reset successful!');
    navigate('/login');
  };

  return (
    <div className="laptop-login-wrapper">
      <img src="/pexels-fwstudio-33348-129731.jpg" alt="background" className="laptop-bg-image" />

      <div className="laptop-login-content">
        <h3>Reset Your Password</h3>
        <form className="laptop-login-container" onSubmit={handleSubmit}>
          <label>Phone Number</label>
          <input
            type="number"
            name="number"
            value={form.number}
            onChange={handleChange}
            required
          />

          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
          <p className="laptop-backtoLogin" onClick={() => navigate('/login')}>Back to Login</p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
