import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Customer = () => {
  // Data 1: Star Rating Distribution
  const ratingData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [{
      label: 'Number of Reviews',
      data: [5, 12, 25, 40, 80],
      backgroundColor: ['#ff4757', '#ffa502', '#ffd700', '#2ed573', '#1e90ff'],
    }]
  };

  // Data 2: Overall Summary
  const summaryData = {
    labels: ['Positive (4-5 Stars)', 'Neutral (3 Stars)', 'Negative (1-2 Stars)'],
    datasets: [{
      data: [120, 25, 17],
      backgroundColor: ['#2ed573', '#ffd700', '#ff4757'],
    }]
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Customer Reviews Analytics</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Star Rating Distribution */}
        <div style={{ width: '45%' }}>
          <h3>Star Ratings Distribution</h3>
          <Bar data={ratingData} />
        </div>

        {/* Overall Summary */}
        <div style={{ width: '45%' }}>
          <h3>Reviews Summary</h3>
          <Pie data={summaryData} />
        </div>

        {/* Statistics Cards */}
        <div style={{ width: '100%', display: 'flex', gap: '10px', marginTop: '20px' }}>
          <div style={{ padding: '15px', background: '#f0f0f0', borderRadius: '5px', flex: 1 }}>
            <h4>Total Reviews</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>162</p>
          </div>
          <div style={{ padding: '15px', background: '#f0f0f0', borderRadius: '5px', flex: 1 }}>
            <h4>Average Rating</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>4.3/5</p>
          </div>
          <div style={{ padding: '15px', background: '#f0f0f0', borderRadius: '5px', flex: 1 }}>
            <h4>Positive Reviews</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>74%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;