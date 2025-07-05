import { Link, useNavigate } from 'react-router-dom';
import "./seller-style.css";

const SellerHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout logic
    navigate('/login');
  };

  return (
    <>
      <header className="seller-header">
        <div className="logo">ReHomify</div>
        <div className="hub-title">Seller's Hub</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
    </>
  );
};

export default SellerHeader;
