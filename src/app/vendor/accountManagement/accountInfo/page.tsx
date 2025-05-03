"use client";
import React, { useState } from "react";
import { useVendorBankDetails } from "@/app/context/BankDetailsContext";
import Sidebar from "@/app/componants/sidebar/Sidebar";
import { useVendor } from "@/app/context/VendorContext";
import { useNavigation } from "react-day-picker";
import { useRouter } from "next/navigation";
import { usePayouts } from "@/app/context/PayoutContext";

interface Payout {
  vendor: string;
  amount: number;
  razorpayStatus?: string;
  transactionId?: string;
  createdAt: string; // 👈 add this line
}


const AccountInfo = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const { vendorBankDetails } = useVendorBankDetails();
  const { vendor } = useVendor();
  const { payouts } = usePayouts();
  const bank = vendorBankDetails?.[0];
  const router = useRouter();

  const handleClick = () => {
    router.push('/vendor/accountManagement/bankInfo');
  };



  if (!vendor) {
    return <p>Loading vendor data...</p>; // or a spinner
  }


  const totalEarnings = vendor.TotalEarning - vendor.TotalEarning * 0.15;
  const totalCommissionDeducted = vendor.TotalEarning * 0.15;
  const pendingAmount = totalEarnings - vendor.ReceivedAmount;

  const vendorId = vendor._id;

  const vendorPayouts = payouts.filter(payout => payout.vendor === vendorId);
  

  const accountStats = [
    {
      title: "Total Earnings",
      value: `₹${totalEarnings.toLocaleString()}`,
      description: "Total amount earned from all bookings",
    },
    {
      title: "Received Amount",
      value: `₹${vendor.ReceivedAmount.toLocaleString()}`,
      description: "Current balance available",
    },
    {
      title: "Pending Amount",
      value: `₹${pendingAmount.toLocaleString()}`,
      description: "Pending Balance",
    },
    {
      title: "Total Commission Deducted",
      value: `₹${totalCommissionDeducted.toLocaleString()}`,
      description: "Platform fees deducted from the total",
    },
  ];


  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-42 bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        openSpaces={openSpaces}
        setOpenSpaces={setOpenSpaces}
        openBookings={openBookings}
        setOpenBookings={setOpenBookings}
        openReport={openReport} // ✅ Pass this
        setOpenReport={setOpenReport}
        openAccount={openAccount} // ✅ Add this
        setOpenAccount={setOpenAccount} // ✅ Add this
      />
      <main className="flex-1  max-w-4xl mx-auto p-6">
        <div className="p-6  min-h-screen ">
          <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accountStats.map((stat, index) => (
              <div key={index} className="bg-white shadow-md rounded-none p-4">
                <h3 className="text-lg font-semibold">{stat.title}</h3>
                <p className="text-xl font-bold" style={{ color: "#6BB7BE" }}>
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            {/* <h2 className="text-2xl font-bold mb-4">🧾 Withdrawal Section</h2>

            <div className="bg-white shadow-md rounded-none p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Withdraw Funds</h3>
                  <p className="text-sm text-gray-500">
                    Minimum ₹500 required to withdraw
                  </p>
                </div>
                <button
                  className="mt-3 sm:mt-0 px-4 py-2 text-white rounded-none hover:opacity-90"
                  style={{ backgroundColor: "#6BB7BE" }}
                >
                  Request Withdrawal
                </button>
              </div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white shadow-md rounded-none p-4">
                <h3 className="text-lg font-semibold">Linked Account</h3>
                {bank ? (
                  <>
                    <p className="text-gray-600">Bank: {bank.bankName}</p>
                    <p className="text-gray-600">
                      Account No: XXXX-XXXX-{bank.accountNumber?.slice(-4)}
                    </p>
                    <p className="text-gray-600">UPI ID: {bank.upiId}</p>
                  </>
                ) : (
                  <p className="text-gray-600">No bank details linked yet.</p>
                )}
              </div>

              <div className="bg-white shadow-md rounded-none p-4">
                <h3 className="text-lg font-semibold">Update Details</h3>
                <p className="text-gray-600 mb-2">
                  You can update your details anytime.
                </p>
                <button
                  className="px-4 py-2 text-white rounded-none hover:opacity-90"
                  style={{ backgroundColor: "#6BB7BE" }}
                  onClick={handleClick}
                >
                  Update Bank/UPI Details
                </button>
              </div>
            </div>


            <div className="bg-white shadow-md rounded-none p-4 overflow-x-auto">
              <h3 className="text-lg font-semibold mb-4">Received Payment History</h3>
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
                  {vendorPayouts.map((payout, index) => (
                    <tr className="border-t" key={index}>
                      <td className="px-4 py-2">
                        {new Date((payout as any).createdAt
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">₹{payout.amount}</td>
                      <td className="px-4 py-2" style={{ color: "#6BB7BE" }}>
                        {payout.razorpayStatus || "Unknown"}
                      </td>
                      <td className="px-4 py-2">{payout.transactionId || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountInfo;
