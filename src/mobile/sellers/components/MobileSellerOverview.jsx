import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import MobileSellerNav from "./MobileSellerNav";
import MobileSellerHeader from "./MobileSellerHeader";
import "../sellerstyles/sellerOverview.css";


const monthlyData = [
  { month: "Jan", sales: 10000, orders: 80, profit: 7000 },
  { month: "Feb", sales: 12000, orders: 95, profit: 8500 },
  { month: "Mar", sales: 9000, orders: 70, profit: 6500 },
  { month: "Apr", sales: 14000, orders: 100, profit: 10500 },
  { month: "May", orders: 150, sales: 29000, returns: 4, profit: 17000 },
  { month: "June", orders: 120, sales: 24000, returns: 5, profit: 17500 },
];

const chartKeys = [
  { key: "sales", color: "#f08080", label: "Sales" },
  { key: "orders", color: "#ffa07a", label: "Orders" },
  { key: "profit", color: "#cd5c5c", label: "Profit" },
];

const MobileSellerOverview = () => (
  <div className="seller-overview-wrapper">
    <div className="overview-container">
      {chartKeys.map((chart) => (
        <div key={chart.key} className="overview-chart-section">
          <h3 className="chart-title">{chart.label}</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={chart.key} fill={chart.color} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MobileSellerOverview;
