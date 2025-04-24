'use client';
import Sidebar from '@/app/componants/sidebar/Sidebar';
import { useState } from 'react';
import * as XLSX from 'xlsx';

const BookingTablePage = () => {
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const bookings = [
    { id: 'B001', customer: 'John Doe', amount: 1200 },
    { id: 'B002', customer: 'Jane Smith', amount: 950 },
    { id: 'B003', customer: 'Alice Johnson', amount: 1500 },
    { id: 'B004', customer: 'Mike Brown', amount: 1100 },
    { id: 'B005', customer: 'Sara Davis', amount: 900 },
    { id: 'B006', customer: 'Tom Wilson', amount: 1300 },
    { id: 'B007', customer: 'Emma Watson', amount: 1050 },
    { id: 'B008', customer: 'Chris Lee', amount: 1400 },
    { id: 'B009', customer: 'Olivia Clark', amount: 1250 },
    { id: 'B010', customer: 'Liam Miller', amount: 1350 },
  ];

  const filteredBookings = bookings.filter((booking) =>
    booking.id.toLowerCase().includes(search.toLowerCase())
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
      filteredBookings.map((b, index) => ({
        SL: index + 1,
        'Booking ID': b.id,
        'Customer Info': b.customer,
        'Booking Amount': b.amount,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
    XLSX.writeFile(wb, 'bookings.xlsx');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-42" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
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
            placeholder="Search Booking ID"
            className="px-4 py-2 border border-gray-300 rounded-none w-1/3"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-none text-white"
            style={{ backgroundColor: '#6BB7BE' }}
          >
            Download Excel
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-none">
          <table className="min-w-full table-auto">
            <thead style={{ backgroundColor: '#6BB7BE' }}>
              <tr className="text-white text-left">
                <th className="px-6 py-3 rounded-none">SL</th>
                <th className="px-6 py-3 rounded-none">Booking ID</th>
                <th className="px-6 py-3 rounded-none">Customer Info</th>
                <th className="px-6 py-3 rounded-none">Booking Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking, index) => (
                  <tr key={booking.id} className="border-t hover:bg-gray-100">
                    <td className="px-6 py-4 rounded-none">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4 rounded-none">{booking.id}</td>
                    <td className="px-6 py-4 rounded-none">{booking.customer}</td>
                    <td className="px-6 py-4 rounded-none">${booking.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center px-6 py-4 text-gray-500 rounded-none">
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
                    currentPage === i + 1 ? 'bg-[#6BB7BE] text-white' : 'bg-white text-gray-700'
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

export default BookingTablePage;
