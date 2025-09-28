import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js components ko register karen
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Order = () => {
  // Orders data - aap apna data yahan dal sakte hain
  const ordersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Orders',
        data: [120, 190, 300, 250, 400, 350],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Orders Analytics'
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
  };

  return (
    <div style={{ height: '400px', padding: '20px' }}>
      <h2>Orders Overview</h2>
      <Line data={ordersData} options={options} />
    </div>
  );
};

export default Order;