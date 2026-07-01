import React, { useState } from 'react';
import { FiPlus, FiSend, FiDownload } from 'react-icons/fi';

const Invoices = () => {
  const [invoices] = useState([
    { id: 1, number: 'INV001', customer: 'John Doe', amount: 500000, status: 'Paid', date: '2024-01-15' },
    { id: 2, number: 'INV002', customer: 'Jane Smith', amount: 350000, status: 'Pending', date: '2024-01-14' },
    { id: 3, number: 'INV003', customer: 'Business Ltd', amount: 1200000, status: 'Paid', date: '2024-01-13' },
    { id: 4, number: 'INV004', customer: 'Retail Store', amount: 750000, status: 'Overdue', date: '2024-01-12' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <FiPlus /> Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Invoices</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{invoices.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Paid</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{invoices.filter(i => i.status === 'Paid').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{invoices.filter(i => i.status === 'Pending').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Overdue</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{invoices.filter(i => i.status === 'Overdue').length}</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase">Invoice #</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map(invoice => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{invoice.number}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.customer}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">TSH {invoice.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm">
                  {invoice.status === 'Paid' && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Paid</span>
                  )}
                  {invoice.status === 'Pending' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Pending</span>
                  )}
                  {invoice.status === 'Overdue' && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">Overdue</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.date}</td>
                <td className="px-6 py-4 text-sm flex gap-3">
                  <button className="text-blue-500 hover:text-blue-700" title="Send Invoice">
                    <FiSend size={18} />
                  </button>
                  <button className="text-green-500 hover:text-green-700" title="Download">
                    <FiDownload size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
