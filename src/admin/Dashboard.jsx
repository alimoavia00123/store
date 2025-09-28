import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalUsers: 0,
    totalMessages: 0,
    revenue: 0,
    orders: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setStats({
        totalProducts: 156,
        totalSales: 1247,
        totalUsers: 89,
        totalMessages: 345,
        revenue: 1850000,
        orders: 256
      });

      setRecentActivities([
        { type: 'sale', message: 'New order #ORD-1247 received', time: '2 mins ago', amount: 12500 },
        { type: 'user', message: 'New user registered: Sara Khan', time: '15 mins ago' },
        { type: 'product', message: 'Product "iPhone 14" added', time: '30 mins ago' },
        { type: 'message', message: 'New customer inquiry received', time: '1 hour ago' },
        { type: 'sale', message: 'Order #ORD-1246 completed', time: '2 hours ago', amount: 8900 }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  // Chart 1: Sales Overview
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales (in ₹)',
        data: [50000, 75000, 60000, 90000, 120000, 150000, 130000, 160000, 140000, 180000, 200000, 220000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  // Chart 2: Product Categories
  const categoriesData = {
    labels: ['Electronics', 'Clothing', 'Home', 'Books', 'Other'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'],
        borderWidth: 2,
        borderColor: '#fff',
      }
    ],
  };

  // Chart 3: User Activity
  const userActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Users',
        data: [45, 60, 55, 70, 85, 40, 35],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 2,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Dashboard loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
              <p className="text-blue-100">Here's what's happening with your store today.</p>
            </div>
            <div className="text-right">
              <p className="text-blue-200">Today's Date</p>
              <p className="text-xl font-semibold">{new Date().toLocaleDateString('en-PK')}</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Link to="/products" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">Total Products</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
                </div>
                <div className="text-blue-500 text-3xl">📦</div>
              </div>
              <div className="mt-2 text-sm text-green-600">+12% from last month</div>
            </div>
          </Link>

          <Link to="/sales" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">Total Sales</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalSales}</p>
                </div>
                <div className="text-green-500 text-3xl">💰</div>
              </div>
              <div className="mt-2 text-sm text-green-600">+8% from last month</div>
            </div>
          </Link>

          <Link to="/accounts" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-l-4 border-purple-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
                </div>
                <div className="text-purple-500 text-3xl">👥</div>
              </div>
              <div className="mt-2 text-sm text-green-600">+5 new this week</div>
            </div>
          </Link>

          <Link to="/messages" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-l-4 border-red-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">Total Messages</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalMessages}</p>
                </div>
                <div className="text-red-500 text-3xl">📱</div>
              </div>
              <div className="mt-2 text-sm text-green-600">+23% from yesterday</div>
            </div>
          </Link>
        </div>

        {/* Revenue and Orders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">💰 Total Revenue</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">This Year</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">Rs. {stats.revenue.toLocaleString()}</p>
            <div className="mt-2 flex space-x-4 text-sm">
              <span className="text-green-600">↑ 15.5% growth</span>
              <span className="text-gray-500">vs last year</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">📋 Total Orders</h3>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">This Month</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.orders}</p>
            <div className="mt-2 flex space-x-4 text-sm">
              <span className="text-green-600">↑ 8.2% increase</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">📈 Sales Overview</h3>
              <select className="border border-gray-300 px-2 py-1 rounded text-sm">
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
            <div className="h-64">
              <Line data={salesData} options={chartOptions} />
            </div>
          </div>

          {/* Categories Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">🏷️ Product Categories</h3>
              <Link to="/products" className="text-blue-600 text-sm hover:text-blue-800">
                View All
              </Link>
            </div>
            <div className="h-64">
              <Doughnut data={categoriesData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">🕒 Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'sale' ? 'bg-green-100 text-green-600' :
                    activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'product' ? 'bg-purple-100 text-purple-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {activity.type === 'sale' ? '💰' :
                     activity.type === 'user' ? '👥' :
                     activity.type === 'product' ? '📦' : '📱'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    {activity.amount && (
                      <p className="text-xs text-green-600 font-medium">Rs. {activity.amount.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">⚡ Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/add-product">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2">
                  <span>➕</span>
                  <span>Add New Product</span>
                </button>
              </Link>
              
              <Link to="/analytics">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center space-x-2">
                  <span>📊</span>
                  <span>View Analytics</span>
                </button>
              </Link>
              
              <Link to="/messages">
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center space-x-2">
                  <span>📱</span>
                  <span>Check Messages</span>
                </button>
              </Link>
              
              <Link to="/settings">
                <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200 flex items-center justify-center space-x-2">
                  <span>⚙️</span>
                  <span>Settings</span>
                </button>
              </Link>
            </div>

            {/* System Status */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🟢 System Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Server</span>
                  <span className="text-green-600">Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Database</span>
                  <span className="text-green-600">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span>API</span>
                  <span className="text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">98.5%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">4.2s</div>
            <div className="text-gray-600">Avg. Response</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">256</div>
            <div className="text-gray-600">Today's Visits</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;