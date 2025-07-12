import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../allStyles/login.css';

const MobileLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [userType, setUserType] = useState('Customer');
  const [snackbar, setSnackbar] = useState({ show: false, message: '', success: true });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("userType:",userType)

    const payload =
      userType === 'Seller'
        ? { mobileNo: form.username, password: form.password }
        : { email: form.username, password: form.password };

    try {
      const res = await fetch('https://rehomify.in/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.status) {
        localStorage.setItem("token", result.token); // ✅ Save token for session
        showSnackbar('Login successful!', true);
        setTimeout(() => {
          navigate(userType === 'Seller' ? '/seller/dashboard' : '/home');
        }, 1500);
      } else {
        showSnackbar(result.result || 'Login failed!', false);
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
    <div className="mobile-login-wrapper">
      <img src="/pexels-fwstudio-33348-129731.jpg" alt="bg" className="mobile-login-bg" />
      <div className="mobile-login-content">
        <h4>Welcome to ReHomify<br />Login Below</h4>
        <form className="mobile-login-form" onSubmit={handleSubmit}>
          <div className="mobile-radio-group">
            <div className='mobile-radio-label'>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Customer"
                  className='mobile-radio-input'
                  checked={userType === 'Customer'}
                  onChange={() => setUserType('Customer')}
                />
                Customer
              </label>
            </div>
            <div className='mobile-radio-label'>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Seller"
                  className='mobile-radio-input'
                  checked={userType === 'Seller'}
                  onChange={() => setUserType('Seller')}
                />
                Seller
              </label>
            </div>
          </div>

          <label>{userType === 'Seller' ? 'Mobile Number' : 'Email'}</label>
          <input
            type={userType === 'Seller' ? 'tel' : 'email'}
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="mobile-extra-options">
            <a onClick={() => navigate('/forgotPassword')}>Forgot Password?</a>
          </div>

          <button type="submit">Login</button>

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
