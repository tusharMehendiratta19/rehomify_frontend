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
  const [snackbar, setSnackbar] = useState({ show: false, message: '', success: true });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      showSnackbar('Passwords do not match!', false);
      return;
    }

    try {
      const res = await fetch("https://rehomify.in/v1/auth/changePassword", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNo: form.number,
          password: form.newPassword
        }),
      });

      const result = await res.json();

      if (result.status) {
        showSnackbar('Password reset successful!', true);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        showSnackbar(result.result || 'Failed to reset password.', false);
      }
    } catch (err) {
      showSnackbar('Server error. Please try again.', false);
    }
  };

  const showSnackbar = (message, success) => {
    setSnackbar({ show: true, message, success });
    setTimeout(() => {
      setSnackbar({ show: false, message: '', success: true });
    }, 3000);
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

      {snackbar.show && (
        <div className={`snackbar ${snackbar.success ? 'success' : 'error'}`}>
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
