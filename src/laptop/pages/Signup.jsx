import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../allStyles/signup.css'; // Make sure path is correct

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    number: '',
    email: '',
    type: 'Customer',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', form);

    if (form.type === 'Seller') {
      navigate('/sellerHub');
    } else {
      navigate('/');
    }
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
                type="number"
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
                <option value="Customer">Customer</option>
                <option value="Seller">Seller</option>
              </select>
            </div>
            <div className="laptop-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
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
    </div>
  );
};

export default Signup;
