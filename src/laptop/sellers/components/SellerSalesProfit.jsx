// src/pages/seller/SellerSalesProfit.js
import React from 'react';
import SellerNav from './SellerNav';
import SellerHeader from './SellerHeader';
import "../sellerstyles/SellerSalesProfit.css";


const salesData = [
    { month: 'January', orders: 120, sales: 24000, returns: 5, profit: 18000 },
    { month: 'February', orders: 95, sales: 19500, returns: 3, profit: 14200 },
    { month: 'March', orders: 140, sales: 28500, returns: 4, profit: 21000 },
    { month: 'April', orders: 110, sales: 22000, returns: 2, profit: 16000 },
    { month: 'May', orders: 150, sales: 29000, returns: 4, profit: 17000 },
    { month: 'June', orders: 120, sales: 24000, returns: 5, profit: 17500 },
    // Add more months as needed
];

const SellerSalesProfit = () => {
    return (
        <div className="sales-profit-container">
            <div className="sales-table-container">
                <h2>Monthly Sales & Profit</h2>
                <div className="sales-table">
                    <table>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Month</th>
                                <th>Total Orders</th>
                                <th>Total Sales (₹)</th>
                                <th>Total Returns</th>
                                <th>Net Profit (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesData.map((entry, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{entry.month}</td>
                                    <td>{entry.orders}</td>
                                    <td>₹{entry.sales.toLocaleString()}</td>
                                    <td>{entry.returns}</td>
                                    <td>₹{entry.profit.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="download-pdf-btn">Download Excel</button>
            </div>
        </div>
    );
};

export default SellerSalesProfit;
