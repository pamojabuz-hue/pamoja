import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiTrendingUp, FiShoppingCart, FiPackage, FiDollarSign } from 'react-icons/fi';

const Dashboard = () => {
  // Sample data
  const salesData = [
    { name: 'Mon', sales: 4000, revenue: 2400 },
    { name: 'Tue', sales: 3000, revenue: 1398 },
    { name: 'Wed', sales: 2000, revenue: 9800 },
    { name: 'Thu', sales: 2780, revenue: 3908 },
    { name: 'Fri', sales: 1890, revenue: 4800 },
    { name: 'Sat', sales: 2390, revenue: 3800 },
    { name: 'Sun', sales: 3490, revenue: 4300 },
  ];

  const productData = [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Food', value: 20 },
    { name: 'Other', value: 20 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const StatCard = ({ icon, title, value, change }) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-green-600 text-sm mt-2">↑ {change}% from last week</p>
        </div>
        <div className="text-4xl text-blue-500">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FiDollarSign />} title="Total Revenue" value="TSH 2.5M" change="12" />
        <StatCard icon={<FiShoppingCart />} title="Total Sales" value="1,242" change="8" />
        <StatCard icon={<FiPackage />} title="Products" value="456" change="5" />
        <StatCard icon={<FiTrendingUp />} title="Growth" value="24.5%" change="3" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Sales & Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Product Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={productData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">#TXN{1000 + item}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Customer {item}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">TSH {50000 * item}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Completed</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">2024-01-{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
