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

// Chart.js components ko register karen
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

// Helper function for message type colors (component se pehle)
const getMessageTypeColor = (type) => {
  const colors = {
    'Promotional': '#ef4444',
    'Transactional': '#f59e0b',
    'OTP': '#10b981',
    'Alert': '#3b82f6',
    'Personal': '#8b5cf6'
  };
  return colors[type] || '#6b7280';
};

// Reusable Stat Card Component
const StatCard = ({ title, value, color, icon }) => (
  <div style={{ 
    background: 'white', 
    padding: '20px', 
    borderRadius: '10px', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    borderLeft: `4px solid ${color}`
  }}>
    <div style={{ fontSize: '24px', marginBottom: '5px' }}>{icon}</div>
    <h3 style={{ margin: '5px 0', color: '#374151', fontSize: '14px' }}>{title}</h3>
    <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: color }}>{value}</p>
  </div>
);

// Reusable Chart Container Component
const ChartContainer = ({ title, children }) => (
  <div style={{ 
    background: 'white', 
    padding: '15px', 
    borderRadius: '10px', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
  }}>
    <h3 style={{ margin: '0 0 15px 0', color: '#374151', fontSize: '16px' }}>{title}</h3>
    {children}
  </div>
);

// Message Item Component
const MessageItem = ({ message }) => (
  <div style={{ 
    padding: '12px', 
    borderBottom: '1px solid #f3f4f6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ 
          padding: '2px 8px', 
          borderRadius: '12px', 
          fontSize: '12px',
          background: getMessageTypeColor(message.type),
          color: 'white'
        }}>
          {message.type}
        </span>
        <span style={{ fontWeight: 'bold' }}>{message.content}</span>
      </div>
      <small style={{ color: '#6b7280' }}>{message.time}</small>
    </div>
    <span style={{ 
      padding: '2px 8px', 
      borderRadius: '12px', 
      fontSize: '12px',
      background: message.status === 'Delivered' ? '#10b981' : 
                 message.status === 'Read' ? '#3b82f6' : '#f59e0b',
      color: 'white'
    }}>
      {message.status}
    </span>
  </div>
);

const Messages = () => {
  // Messages statistics data
  const messagesStats = {
    totalMessages: 1250,
    received: 850,
    sent: 400,
    today: 45,
    spam: 25,
    delivered: 1150,
    failed: 15
  };

  // Chart 1: Weekly Messages Trend
  const weeklyMessagesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Messages Received',
        data: [45, 60, 55, 70, 85, 40, 35],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Messages Sent',
        data: [20, 25, 30, 35, 40, 15, 10],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  // Chart 2: Message Types Distribution
  const messageTypesData = {
    labels: ['Promotional', 'Transactional', 'OTP', 'Alerts', 'Personal'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
        borderWidth: 2,
        borderColor: '#fff',
      }
    ],
  };

  // Chart 3: Message Status
  const messageStatusData = {
    labels: ['Delivered', 'Failed', 'Pending', 'Read'],
    datasets: [
      {
        label: 'Message Status',
        data: [75, 5, 10, 60],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
      }
    ],
  };

  // Chart 4: Hourly Activity
  const hourlyActivityData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'],
    datasets: [
      {
        label: 'Messages per Hour',
        data: [10, 45, 60, 55, 70, 40, 15],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      }
    ],
  };

  // Common chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  // Recent messages list
  const recentMessages = [
    { type: 'Promotional', content: 'Sale starts tomorrow!', time: '10:30 AM', status: 'Delivered' },
    { type: 'OTP', content: 'Your OTP is 458792', time: '10:25 AM', status: 'Delivered' },
    { type: 'Transactional', content: 'Payment received ₹1500', time: '10:15 AM', status: 'Read' },
    { type: 'Alert', content: 'Login from new device', time: '09:45 AM', status: 'Delivered' },
    { type: 'Personal', content: 'Meeting at 2 PM', time: '09:30 AM', status: 'Read' }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#3b82f6', margin: 0 }}>📱 Messages Analytics Dashboard</h1>
        {/* ✅ FIXED: Closing bracket added */}
        <p style={{ color: '#6b7280', margin: '5px 0' }}>Real-time SMS and message analytics</p>
      </div>

      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px', 
        marginBottom: '30px' 
      }}>
        <StatCard 
          title="Total Messages" 
          value={messagesStats.totalMessages} 
          color="#3b82f6" 
          icon="📨"
        />
        <StatCard 
          title="Received" 
          value={messagesStats.received} 
          color="#10b981" 
          icon="📥"
        />
        <StatCard 
          title="Sent" 
          value={messagesStats.sent} 
          color="#f59e0b" 
          icon="📤"
        />
        <StatCard 
          title="Today" 
          value={messagesStats.today} 
          color="#ef4444" 
          icon="🕒"
        />
        <StatCard 
          title="Delivered" 
          value={messagesStats.delivered} 
          color="#10b981" 
          icon="✅"
        />
        <StatCard 
          title="Failed" 
          value={messagesStats.failed} 
          color="#ef4444" 
          icon="❌"
        />
      </div>

      {/* Charts Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        {/* Weekly Trend Chart */}
        <ChartContainer title="📊 Weekly Messages Trend">
          <div style={{ height: '250px' }}>
            <Line data={weeklyMessagesData} options={chartOptions} />
          </div>
        </ChartContainer>

        {/* Message Types Chart */}
        <ChartContainer title="📋 Message Types Distribution">
          <div style={{ height: '250px' }}>
            <Doughnut data={messageTypesData} options={chartOptions} />
          </div>
        </ChartContainer>

        {/* Message Status Chart */}
        <ChartContainer title="📈 Message Delivery Status">
          <div style={{ height: '250px' }}>
            <Bar data={messageStatusData} options={chartOptions} />
          </div>
        </ChartContainer>

        {/* Hourly Activity Chart */}
        <ChartContainer title="🕒 Hourly Message Activity">
          <div style={{ height: '250px' }}>
            <Bar data={hourlyActivityData} options={chartOptions} />
          </div>
        </ChartContainer>
      </div>

      {/* Recent Messages Section */}
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#374151' }}>📩 Recent Messages</h3>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {recentMessages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        padding: '20px', 
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: 0 }}>📊 Summary</h3>
        <p style={{ margin: '10px 0', fontSize: '14px' }}>
          Total Messages: {messagesStats.totalMessages} | 
          Success Rate: {((messagesStats.delivered / messagesStats.totalMessages) * 100).toFixed(1)}% | 
          Spam Rate: {((messagesStats.spam / messagesStats.totalMessages) * 100).toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

export default Messages;