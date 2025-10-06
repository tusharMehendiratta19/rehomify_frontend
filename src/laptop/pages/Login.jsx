import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../allStyles/login.css'; // Ensure this path is correct

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [snackbar, setSnackbar] = useState({ show: false, message: '', success: true });
  const [highlightSignup, setHighlightSignup] = useState(false); // <-- added

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof form.username);
    if (form.username == "8431616135") {
      localStorage.setItem("custId","687204d0e50855fcf6b9f5b5")
      navigate('/seller/addProduct')
    } else {
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
            const errorMsg = result.result || 'Number not registered. Please Sign Up.';
            showSnackbar(errorMsg, false);

            // highlight signup link if number not registered
            if (errorMsg.toLowerCase().includes("sign up")) {
              setHighlightSignup(true);
              setTimeout(() => setHighlightSignup(false), 3000); // remove highlight after 3s
            }
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
        <h4>Welcome to ReHomify</h4>
        <form className="laptop-login-form" onSubmit={handleSubmit}>
          <label>WhatsApp Number</label>
          <br />
          <input
            type="tel"
            name="username"
            minLength={10}
            maxLength={10}
            value={form.username}
            onChange={handleChange}
            placeholder='Enter Your 10 digit WhatsApp number'
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

          <p className="laptop-signup-link">
            New User?{" "}
            <span
              className={highlightSignup ? "msu-highlight" : ""}
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>

      {snackbar.show && (
        <div
          className={`snackbar ${snackbar.success ? 'success' : 'error'}`}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default Login;
