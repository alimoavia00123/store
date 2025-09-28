import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Sales = () => {
  // Data 1: Monthly Sales Trend
  const monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Sales (PKR)',
        data: [50000, 75000, 60000, 90000, 120000, 150000, 130000, 160000, 140000, 180000, 200000, 220000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      }
    ],
  };

  // Data 2: Product-wise Sales
  const productSalesData = {
    labels: ['Laptop', 'Mobile', 'Tablet', 'Headphones', 'Watch', 'Camera'],
    datasets: [
      {
        label: 'Units Sold',
        data: [150, 300, 120, 250, 180, 90],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      }
    ],
  };

  // Data 3: Sales by Category
  const categoryData = {
    labels: ['Electronics', 'Clothing', 'Home Appliances', 'Books', 'Other'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
      }
    ],
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2>Sales Analytics Dashboard</h2>
      
      {/* Statistics Cards */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ 
          padding: '10px', 
          background: '#f0fdf4', 
          borderRadius: '10px', 
          flex: '1', 
          minWidth: '150px',
          border: '1px solid #bbf7d0'
        }}>
          <h4>Total Revenue</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>PKR 18,50,000</p>
          <small>Year 2024</small>
        </div>
        
        <div style={{ 
          padding: '20px', 
          background: '#fffbeb', 
          borderRadius: '10px', 
          flex: '1', 
          minWidth: '150px',
          border: '1px solid #fde68a'
        }}>
          <h4>Monthly Average</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>₹1,54,166</p>
          <small>Per Month</small>
        </div>
        
        <div style={{ 
          padding: '20px', 
          background: '#eff6ff', 
          borderRadius: '10px', 
          flex: '1', 
          minWidth: '150px',
          border: '1px solid #bfdbfe'
        }}>
          <h4>Growth Rate</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>+15.5%</p>
          <small>vs Last Year</small>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Monthly Sales Trend */}
        <div style={{ flex: '2', minWidth: '100px', background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Monthly Sales Trend</h3>
          <Line data={monthlySalesData} height={200} />
        </div>

        {/* Product-wise Sales */}
        <div style={{ flex: '1', minWidth: '150px', background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Top Selling Products</h3>
          <Bar data={productSalesData} height={300} />
        </div>

        {/* Sales by Category */}
        <div style={{ flex: '1', minWidth: '150px', background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Sales by Category</h3>
          <Doughnut data={categoryData} height={300} />
        </div>
      </div>
    </div>
  );
};

export default Sales;