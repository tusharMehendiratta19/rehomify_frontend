import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../allStyles/signup.css';

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
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');

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
        name: form.name.trim(),
        mobileNo: form.number.trim(),
        email: form.email.trim(),
        type: form.type,
        password: form.password,
      };

      const res = await fetch('https://rehomify.in/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.status) {
        // ✅ Call sendOtp API
        await fetch('https://rehomify.in/v1/auth/sendOtp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobileNo: form.number }),
        });

        // ✅ Open OTP modal
        setShowOtpModal(true);
      } else {
        showSnackbar(result.message || 'Signup failed!', false);
      }
    } catch (err) {
      showSnackbar('Server error. Please try again.', false);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const res = await fetch('https://rehomify.in/v1/auth/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNo: form.number, otp: otpValue }),
      });

      const result = await res.json();

      if (result.status) {
        showSnackbar('OTP verified successfully!', true);
        localStorage.setItem('token', result.token);
        localStorage.setItem('custId', result.data._id);

        setShowOtpModal(false);

        setTimeout(() => {
          navigate(form.type === 'seller' ? '/seller/dashboard' : '/home');
        }, 1000);
      } else {
        showSnackbar(result.message || 'Invalid OTP', false);
      }
    } catch (err) {
      showSnackbar('Error verifying OTP.', false);
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

      {showOtpModal && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <h4>Enter OTP</h4>
            <input
              type="text"
              value={otpValue}
              maxLength="4"
              onChange={(e) => setOtpValue(e.target.value)}
              placeholder="4-digit OTP"
            />
            <button onClick={handleOtpSubmit}>Verify OTP</button>
            <button onClick={() => setShowOtpModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
