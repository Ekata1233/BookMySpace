'use client';
import React from 'react';

const AccountInfo = () => {
  const accountStats = {
    totalEarnings: '₹50,000',
    withdrawableBalance: '₹12,000',
    pendingWithdrawals: '₹5,000',
    alreadyWithdrawn: '₹33,000',
    commissionDeducted: '₹2,000',
    totalBookingEarnings: '₹48,000',
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-42">
      <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-none p-4">
          <h3 className="text-lg font-semibold">Total Earnings</h3>
          <p className="text-xl font-bold" style={{ color: '#6BB7BE' }}>{accountStats.totalEarnings}</p>
          <p className="text-sm text-gray-500">Total amount earned from all bookings</p>
        </div>

        <div className="bg-white shadow-md rounded-none p-4">
          <h3 className="text-lg font-semibold">Withdraw-able Balance</h3>
          <p className="text-xl font-bold" style={{ color: '#6BB7BE' }}>{accountStats.withdrawableBalance}</p>
          <p className="text-sm text-gray-500">Current balance available for withdrawal</p>
        </div>

        <div className="bg-white shadow-md rounded-none p-4">
          <h3 className="text-lg font-semibold">Pending Withdrawals</h3>
          <p className="text-xl font-bold" style={{ color: '#6BB7BE' }}>{accountStats.pendingWithdrawals}</p>
          <p className="text-sm text-gray-500">Withdrawals requested but not yet processed</p>
        </div>

        <div className="bg-white shadow-md rounded-none p-4">
          <h3 className="text-lg font-semibold">Already Withdrawn</h3>
          <p className="text-xl font-bold" style={{ color: '#6BB7BE' }}>{accountStats.alreadyWithdrawn}</p>
          <p className="text-sm text-gray-500">History of amount already paid out</p>
        </div>

        <div className="bg-white shadow-md rounded-none p-4">
          <h3 className="text-lg font-semibold">Total Commission Deducted</h3>
          <p className="text-xl font-bold" style={{ color: '#6BB7BE' }}>{accountStats.commissionDeducted}</p>
          <p className="text-sm text-gray-500">Platform fees deducted from the total</p>
        </div>

        <div className="bg-white shadow-md rounded-none p-4">
          <h3 className="text-lg font-semibold">Total Booking Earnings</h3>
          <p className="text-xl font-bold" style={{ color: '#6BB7BE' }}>{accountStats.totalBookingEarnings}</p>
          <p className="text-sm text-gray-500">Earnings from completed bookings only</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">🧾 Withdrawal Section</h2>

        <div className="bg-white shadow-md rounded-none p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Withdraw Funds</h3>
              <p className="text-sm text-gray-500">Minimum ₹500 required to withdraw</p>
            </div>
            <button
              className="mt-3 sm:mt-0 px-4 py-2 text-white rounded-none hover:opacity-90"
              style={{ backgroundColor: '#6BB7BE' }}
            >
              Request Withdrawal
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow-md rounded-none p-4">
            <h3 className="text-lg font-semibold">Linked Account</h3>
            <p className="text-gray-600">Bank: HDFC Bank</p>
            <p className="text-gray-600">Account No: XXXX-XXXX-1234</p>
            <p className="text-gray-600">UPI ID: aniket@upi</p>
          </div>

          <div className="bg-white shadow-md rounded-none p-4">
            <h3 className="text-lg font-semibold">Withdrawal Method</h3>
            <p className="text-gray-600 mb-2">You can update your payout method anytime.</p>
            <button
              className="px-4 py-2 text-white rounded-none hover:opacity-90"
              style={{ backgroundColor: '#6BB7BE' }}
            >
              Update Bank/UPI Details
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-none p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2">Recent Withdrawal Status</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>₹5,000 - <span style={{ color: '#6BB7BE' }}>Pending</span></li>
            <li>₹3,000 - <span style={{ color: '#6BB7BE' }}>Paid</span></li>
            <li>₹2,000 - <span style={{ color: '#6BB7BE' }}>Rejected</span></li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-none p-4 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Withdrawal History</h3>
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">2025-04-20</td>
                <td className="px-4 py-2">₹5,000</td>
                <td className="px-4 py-2" style={{ color: '#6BB7BE' }}>Pending</td>
                <td className="px-4 py-2">TXN12345678</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">2025-04-10</td>
                <td className="px-4 py-2">₹3,000</td>
                <td className="px-4 py-2" style={{ color: '#6BB7BE' }}>Paid</td>
                <td className="px-4 py-2">TXN12345679</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">2025-04-01</td>
                <td className="px-4 py-2">₹2,000</td>
                <td className="px-4 py-2" style={{ color: '#6BB7BE' }}>Rejected</td>
                <td className="px-4 py-2">TXN12345680</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
