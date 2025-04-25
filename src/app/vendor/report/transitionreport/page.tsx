'use client'; // This line marks the file as a client component

import { useEffect, useState } from "react";
import Sidebar from "@/app/componants/sidebar/Sidebar";
import * as XLSX from "xlsx";
import { useUsers } from "@/app/context/UserContext";

const TransitionPage = () => {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { users } = useUsers();

  const itemsPerPage = 6;

  // Fetch Razorpay bookings
  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/razorpay');
      if (!response.ok) {
        throw new Error('Failed to fetch Razorpay bookings');
      }
      const data = await response.json();
      setBookings(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    booking.razorpayOrderId && booking.razorpayOrderId.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredBookings.map((booking, index) => ({
        SL: index + 1,
        "Razorpay Order ID": booking.razorpayOrderId,
        User: booking.userId, // This can be updated as well to show user name
        Office: booking.officeId,
        Date: booking.date,
        "Start Time": booking.startTime,
        Duration: booking.duration,
        "Total Pay": booking.totalPay,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Razorpay Bookings");
    XLSX.writeFile(wb, "razorpay_bookings.xlsx");
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  // Function to get the user name by userId
  const getUserName = (userId: string) => {
    const user = users.find(user => user._id === userId);
    return user ? user.name : "Unknown"; // Return the name if found, else return "Unknown"
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-42" style={{ backgroundColor: "#f5f5f5" }}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        openSpaces={openSpaces}
        setOpenSpaces={setOpenSpaces}
        openBookings={openBookings}
        setOpenBookings={setOpenBookings}
        openAccount={openAccount}
        setOpenAccount={setOpenAccount}
        openReport={openReport}
        setOpenReport={setOpenReport}
      />
      <main className="flex-1 max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search Razorpay Order ID"
            className="px-4 py-2 border border-gray-300 rounded-none w-1/3"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-none text-white"
            style={{ backgroundColor: "#6BB7BE" }}
          >
            Download Excel
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-none">
          <table className="min-w-full table-auto">
            <thead style={{ backgroundColor: "#6BB7BE" }}>
              <tr className="text-white text-left">
                <th className="px-6 py-3 rounded-none">SL</th>
                <th className="px-6 py-3 rounded-none">Transition ID</th>
                <th className="px-6 py-3 rounded-none">User</th>
                <th className="px-6 py-3 rounded-none">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking, index) => (
                  <tr key={booking.razorpayOrderId} className="border-t hover:bg-gray-100">
                    <td className="px-6 py-4 rounded-none">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4 rounded-none">{booking.razorpayOrderId}</td>
                    <td className="px-6 py-4 rounded-none">{getUserName(booking.userId)}</td>
                    <td className="px-6 py-4 rounded-none blue">Completed</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center px-6 py-4 text-gray-500 rounded-none">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end mt-4">
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 border rounded-none ${
                    currentPage === i + 1 ? "bg-[#6BB7BE] text-white" : "bg-white text-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TransitionPage;
