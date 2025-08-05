// components/EMIPanel.js
import React from 'react';
import '../allStyles/emiPanel.css';

const EMIPanel = ({ onClose }) => {
  return (
    <div className="mobile-emi-panel">
      <div className="mobile-emi-header">
        <h3>EMI Options</h3>
        <button className="mobile-close-btn" onClick={onClose}>×</button>
      </div>

      <div className="mobile-emi-content">
        <label>Choose the bank to get full detail of the breakdown of EMI options</label>
        <select className="mobile-bank-select">
          <option value="" disabled selected>Select Bank</option>
          <option>HDFC Bank Credit Card</option>
          <option>ICICI Bank Credit Card</option>
          <option>AXIS Bank Credit Card</option>
          <option>SBI Bank Credit Card</option>
          <option>KOTAK Bank Credit Card</option>
          <option>INDUSIND Bank Credit Card</option>
          <option>IDFC Bank Credit Card</option>
        </select>

        <div className="mobile-emi-breakdown">
          <p>Based on the product price ₹11,990.00 the breakdown for the installments will be as follows:</p>
          <ul>
            <li>Minimum transaction amount ₹1,000.00</li>
            <li>Installment based on 3 months (@16%) ₹4,104.00</li>
            <li>Installment based on 6 months (@16%) ₹2,093.00</li>
            <li>Installment based on 9 months (@16%) ₹1,423.00</li>
            <li>Installment based on 12 months (@16%) ₹1,088.00</li>
          </ul>
          <p className="mobile-emi-disclaimer">
            Disclaimer: The EMI amount is calculated based on the interest rate provided by the bank.
            The actual EMI amount may vary based on the interest rate provided by the bank at the time of purchase.
          </p>
        </div>
        <button className="mobile-continue-btn">Continue</button>
      </div>
    </div>
  );
};

export default EMIPanel;
