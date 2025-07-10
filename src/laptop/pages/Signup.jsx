import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../allStyles/signup.css'; // Ensure path is correct

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
      showSnackbar('Passwords do not match', false);
      return;
    }

    try {
      const res = await fetch("https://rehomify.in/v1/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          mobileNo: form.number,
          email: form.email,
          type: form.type,
          password: form.password,
        }),
      });

      const result = await res.json();
      console.log("result>> ",result)

      if (result.status) {
        showSnackbar('Signup successful!', true);

        // Redirect after short delay to allow snackbar to show
        setTimeout(() => {
          navigate(form.type === 'seller' ? '/sellerHub' : '/home');
        }, 1500);
      } else {
        showSnackbar(result.result || 'Signup failed', false);
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
    <div className="laptop-signup-wrapper">
      <img src="/pexels-fwstudio-33348-129731.jpg" alt="background" className="laptop-bg-image" />

      <div className="laptop-signup-content">
        <h4>Welcome to ReHomify, Please Sign Up Below.</h4>

        <form className="laptop-signup-container" onSubmit={handleSubmit}>
          <div className="laptop-form-row">
            <div className="laptop-form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="laptop-form-group">
              <label>Number</label>
              <input
                type="tel"
                name="number"
                value={form.number}
                onChange={handleChange}
                required
                maxLength="10"
              />
            </div>
          </div>

          <div className="laptop-form-row">
            <div className="laptop-form-group">
              <label>Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="customer">customer</option>
                <option value="seller">seller</option>
              </select>
            </div>
            <div className="laptop-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="laptop-form-row">
            <div className="laptop-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="laptop-form-group">
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
