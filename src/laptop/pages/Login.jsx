import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../allStyles/login.css'; // Ensure this path is correct

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [userType, setUserType] = useState('Customer'); // Default selected user type

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType === 'Seller') {
      navigate('/sellerHub');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="laptop-login-wrapper">
      <img src="/pexels-fwstudio-33348-129731.jpg" alt="background" className="laptop-bg-image" />

      <div className="laptop-login-content">
        <h4>Welcome to ReHomify, <br />Please Login Below.</h4>

        <form className="laptop-login-container" onSubmit={handleSubmit}>

          {/* Radio Buttons for Role Selection */}
          <div className="laptop-radio-group">
            <label>
              <input
                type="radio"
                name="role"
                value="Customer"
                checked={userType === 'Customer'}
                className='laptop-c-radio'
                onChange={() => setUserType('Customer')}
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="Seller"
                checked={userType === 'Seller'}
                className='laptop-s-radio'
                onChange={() => setUserType('Seller')}
              />
              Seller
            </label>
          </div>

          {/* Dynamic Label */}
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

          <div className="laptop-extra-options">
            <a href="#" onClick={() => navigate('/forgotPassword')}>Forgot Password?</a>
          </div>

          <button type="submit">Submit</button>

          <p className="laptop-signup-link">
            New User?{' '}
            <span onClick={() => navigate('/signup')}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
