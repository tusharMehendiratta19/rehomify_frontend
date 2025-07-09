import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../allStyles/signup.css'; // Make sure this path is correct

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    number: '',
    email: '',
    type: 'customer',
    password: '',
    confirmPassword: '',
  });

  const [snackbar, setSnackbar] = useState({ show: false, message: '', success: true });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      showSnackbar('Passwords do not match!', false);
      return;
    }

    try {
      const payload = {
        name: form.name,
        mobileNo: form.number, // ✅ Corrected field name
        email: form.email,
        type: form.type,
        password: form.password
      };

      const res = await fetch('https://rehomify.in/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.status) {
        showSnackbar('Signup successful!', true);
        setTimeout(() => {
          navigate(form.type === 'Seller' ? '/sellerHub' : '/');
        }, 1500);
      } else {
        showSnackbar(result.result || 'Signup failed!', false);
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
    <div className="mobile-signup-wrapper">
      <div className="mobile-signup-content">
        <h4>Welcome to ReHomify, Please Sign Up Below.</h4>

        <form className="mobile-signup-container" onSubmit={handleSubmit}>
          <div className="mobile-form-row">
            <div className="mobile-form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mobile-form-group">
              <label>Number</label>
              <input
                type="number"
                name="number"
                value={form.number}
                onChange={handleChange}
                required
                maxLength="10"
              />
            </div>
          </div>

          <div className="mobile-form-row">
            <div className="mobile-form-group">
              <label>Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <div className="mobile-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mobile-form-row">
            <div className="mobile-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mobile-form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit">Submit</button>

          <p>
            Already a user?{' '}
            <span onClick={() => navigate('/login')}>
              Login here
            </span>
          </p>
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

export default Signup;
