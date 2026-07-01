import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const monthlyData = [
    { month: 'Jan', sales: 4000, revenue: 2400, expenses: 1000 },
    { month: 'Feb', sales: 3000, revenue: 1398, expenses: 900 },
    { month: 'Mar', sales: 2000, revenue: 9800, expenses: 1100 },
    { month: 'Apr', sales: 2780, revenue: 3908, expenses: 950 },
    { month: 'May', sales: 1890, revenue: 4800, expenses: 1050 },
    { month: 'Jun', sales: 2390, revenue: 3800, expenses: 1020 },
  ];

  const topProducts = [
    { product: 'Laptop', units: 45, revenue: 36000000 },
    { product: 'Phone', units: 78, revenue: 31200000 },
    { product: 'T-Shirt', units: 234, revenue: 3510000 },
    { product: 'Shoes', units: 89, revenue: 4450000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow p-6">
          <p className="text-blue-100 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold mt-2">TSH 81.2M</p>
          <p className="text-blue-100 text-xs mt-2">↑ 12% from last month</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow p-6">
          <p className="text-green-100 text-sm">Total Sales</p>
          <p className="text-3xl font-bold mt-2">15,932</p>
          <p className="text-green-100 text-xs mt-2">↑ 8% from last month</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow p-6">
          <p className="text-purple-100 text-sm">Average Order</p>
          <p className="text-3xl font-bold mt-2">TSH 5,100</p>
          <p className="text-purple-100 text-xs mt-2">↑ 3% from last month</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow p-6">
          <p className="text-orange-100 text-sm">Profit Margin</p>
          <p className="text-3xl font-bold mt-2">34.2%</p>
          <p className="text-orange-100 text-xs mt-2">↑ 2.1% from last month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase">Units Sold</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.units}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">TSH {(product.revenue / 1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(product.revenue / 36000000) * 100}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-600">{((product.revenue / 36000000) * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
