import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../allStyles/login.css';

const MobileLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [snackbar, setSnackbar] = useState({ show: false, message: '', success: true });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      // Step 1: Send OTP
      try {
        const res = await fetch('https://rehomify.in/v1/auth/sendOtp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobileNo: form.username }),
        });

        const result = await res.json();

        if (result.status) {
          showSnackbar('OTP sent successfully!', true);
          setOtpSent(true);
        } else {
          showSnackbar(result.result || 'Failed to send OTP!', false);
        }
      } catch (err) {
        showSnackbar('Server error. Please try again.', false);
      }
    } else {
      // Step 2: Verify OTP
      try {
        const res = await fetch('https://rehomify.in/v1/auth/verifyOtp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobileNo: form.username, otp: form.otp }),
        });

        const result = await res.json();

        if (result.status) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("custId", result.data._id);
          showSnackbar('Login successful!', true);
          setTimeout(() => {
            navigate('/home');
          }, 1500);
        } else {
          showSnackbar(result.result || 'Invalid OTP!', false);
        }
      } catch (err) {
        showSnackbar('Server error. Please try again.', false);
      }
    }
  };

  const showSnackbar = (message, success) => {
    setSnackbar({ show: true, message, success });
    setTimeout(() => {
      setSnackbar({ show: false, message: '', success: true });
    }, 3000);
  };

  return (
    <div className="mobile-login-wrapper">
      <img src="/pexels-fwstudio-33348-129731.jpg" alt="bg" className="mobile-login-bg" />
      <div className="mobile-login-content">
        <h4>Welcome to ReHomify</h4>
        <form className="mobile-login-form" onSubmit={handleSubmit}>
          <label>Mobile Number</label>
          <br />
          <input
            type="tel"
            name="username"
            minLength={10}
            maxLength={10}
            value={form.username}
            onChange={handleChange}
            placeholder='Enter Your 10 digit mobile number'
            required
          />

          {otpSent && (
            <>
              <label>OTP</label>
              <input
                type="text"
                name="otp"
                minLength={4}
                maxLength={4}
                value={form.otp}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit">{otpSent ? 'Submit' : 'Get OTP'}</button>

          <p className="mobile-signup-link">
            New User? <span onClick={() => navigate('/signup')}>Sign Up</span>
          </p>
        </form>
      </div>

      {snackbar.show && (
        <div
          className={`snackbar ${snackbar.success ? 'success' : 'error'}`}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            maxWidth: '90%',
            textAlign: 'center',
            zIndex: 9999,
            backgroundColor: snackbar.success ? '#4CAF50' : '#F44336',
            color: '#fff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default MobileLogin;
