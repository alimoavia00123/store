import React, { useState, useEffect } from 'react';
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

const Accounts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly'); // daily, weekly, monthly

  // Demo data - Replace with actual API call
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setUsers([
            {
              id: 1,
              name: "Ali Ahmed",
              email: "ali.ahmed@email.com",
              role: "admin",
              joinDate: "2024-01-15",
              lastLogin: "2024-12-19T10:30:00",
              loginCount: 156,
              status: "active"
            },
            {
              id: 2,
              name: "Sara Khan",
              email: "sara.khan@email.com",
              role: "user",
              joinDate: "2024-02-20",
              lastLogin: "2024-12-19T09:15:00",
              loginCount: 89,
              status: "active"
            },
            {
              id: 3,
              name: "Ahmed Raza",
              email: "ahmed.raza@email.com",
              role: "user",
              joinDate: "2024-03-10",
              lastLogin: "2024-12-18T14:20:00",
              loginCount: 67,
              status: "active"
            },
            {
              id: 4,
              name: "Fatima Noor",
              email: "fatima.noor@email.com",
              role: "user",
              joinDate: "2024-04-05",
              lastLogin: "2024-12-17T11:45:00",
              loginCount: 45,
              status: "inactive"
            },
            {
              id: 5,
              name: "Usman Ali",
              email: "usman.ali@email.com",
              role: "admin",
              joinDate: "2024-05-12",
              lastLogin: "2024-12-19T08:00:00",
              loginCount: 120,
              status: "active"
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching users data:", error);
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  // Chart 1: User Registration Trend
  const registrationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Users',
        data: [5, 8, 12, 7, 15, 10, 18, 14, 20, 16, 12, 8],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  // Chart 2: User Roles Distribution
  const rolesData = {
    labels: ['Admin', 'Users', 'Moderators', 'Guests'],
    datasets: [
      {
        data: [15, 65, 12, 8],
        backgroundColor: ['#ef4444', '#3b82f6', '#f59e0b', '#10b981'],
        borderWidth: 2,
        borderColor: '#fff',
      }
    ],
  };

  // Chart 3: Daily Login Activity
  const loginActivityData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', '12AM'],
    datasets: [
      {
        label: 'Logins per Hour',
        data: [45, 120, 85, 60, 95, 70, 25],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: '#8b5cf6',
        borderWidth: 2,
      }
    ],
  };

  // Chart 4: User Status
  const statusData = {
    labels: ['Active Users', 'Inactive Users', 'Suspended'],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 2,
        borderColor: '#fff',
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

  // Statistics calculation
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'active').length,
    admins: users.filter(user => user.role === 'admin').length,
    totalLogins: users.reduce((sum, user) => sum + user.loginCount, 0),
    avgLogins: Math.round(users.reduce((sum, user) => sum + user.loginCount, 0) / users.length) || 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Users data load ho raha hai...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📊 Accounts Analytics</h1>
              <p className="text-gray-600">User accounts and login activities overview</p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
              <div className="text-gray-600">Total Users</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <div className="text-2xl font-bold text-purple-600">{stats.admins}</div>
              <div className="text-gray-600">Admin Users</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <div className="text-2xl font-bold text-orange-600">{stats.totalLogins}</div>
              <div className="text-gray-600">Total Logins</div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User Registration Trend */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">📈 User Registration Trend ({timeRange})</h3>
            <div className="h-64">
              <Line data={registrationData} options={chartOptions} />
            </div>
          </div>

          {/* User Roles Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">👥 User Roles Distribution</h3>
            <div className="h-64">
              <Doughnut data={rolesData} options={chartOptions} />
            </div>
          </div>

          {/* Login Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">🕒 Daily Login Activity</h3>
            <div className="h-64">
              <Bar data={loginActivityData} options={chartOptions} />
            </div>
          </div>

          {/* User Status */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">✅ User Status Overview</h3>
            <div className="h-64">
              <Doughnut data={statusData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Users List Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">👤 All Users List</h3>
            <p className="text-gray-600">Total {users.length} registered users</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logins</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-gray-500 text-sm">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(user.lastLogin).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {user.loginCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">📊 Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{stats.activeUsers}/{stats.totalUsers}</div>
              <div className="text-blue-200 text-sm">Active Ratio</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.avgLogins}</div>
              <div className="text-blue-200 text-sm">Avg Logins/User</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{Math.round((stats.activeUsers/stats.totalUsers)*100)}%</div>
              <div className="text-blue-200 text-sm">Activation Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-blue-200 text-sm">New This Month</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;