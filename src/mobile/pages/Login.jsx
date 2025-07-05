import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../allStyles/login.css'; // Make sure mobile styles are included or separated

const MobileLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [userType, setUserType] = useState('Customer');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === 'Seller') {
      navigate('/sellerHub');
    } else {
      navigate('/home');
    }
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
            New User?{' '}
            <span onClick={() => navigate('/signup')}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default MobileLogin;
