'use client';
import { useBookSpaces } from '@/app/context/BookSpaceContext';
import { useOfficeSpaces } from '@/app/context/OfficeSpaceContext';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import Sidebar from '@/app/componants/sidebar/Sidebar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';
import { useUsers } from '@/app/context/UserContext';

const BookingTablePage = () => {
  const { officeSpaces } = useOfficeSpaces();
  const { bookings } = useBookSpaces();
  const { users } = useUsers();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);  // State for selected user
  const itemsPerPage = 6;

  const getOfficeDetails = (id: any) => {
    return officeSpaces.find((office) => office._id === id);
  };

  const getUserNameById = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : 'N/A';
  };

  const today = new Date().setHours(0, 0, 0, 0);
  const pastBookings = bookings.filter((booking) => new Date(booking.date).getTime() < today);

  // Corrected to use _id instead of id
  const filteredBookings = pastBookings.filter((booking) => {
    const bookingId = booking._id || ''; // Using _id instead of id
    return bookingId.toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredBookings.map((b, index) => ({
        SL: index + 1,
        'Booking ID': b._id, // Corrected to _id
        'Customer Info': getUserNameById(b.userId),
        'Booking Amount': b.totalPay, // Corrected to match displayed field
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    XLSX.writeFile(wb, "bookings.xlsx");
  };

  const handleCustomerClick = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    setSelectedUser(user || null);  // Set the selected user's details for the modal
  };

  const closeModal = () => {
    setSelectedUser(null);  // Close the modal by clearing the selected user
  };

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen mt-42"
      style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
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
                <th className="px-6 py-3 rounded-none">Booking ID</th>
                <th className="px-6 py-3 rounded-none">Customer Info</th>
                <th className="px-6 py-3 rounded-none">Booking Amount</th>
                <th className="px-6 py-3 rounded-none">Office Name</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking, index) => {
                  const office = getOfficeDetails(booking.officeId);
                  const customerName = getUserNameById(booking.userId);
                  return (
                    <tr key={booking._id} className="border-t hover:bg-gray-100">
                      <td className="px-6 py-4 rounded-none">{indexOfFirstItem + index + 1}</td>
                      <td className="px-6 py-4 rounded-none">{booking._id}</td>
                      <td
                        className="px-6 py-4 rounded-none cursor-pointer text-blue-500"
                        onClick={() => handleCustomerClick(booking.userId)} // Open modal on click
                      >
                        {customerName}
                      </td>
                      <td className="px-6 py-4 rounded-none">${booking.totalPay}</td>
                      <td className="px-6 py-4 rounded-none">
                        {office ? `${office.officeSpaceName} (${office.category})` : 'N/A'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center px-6 py-4 text-gray-500 rounded-none">
                    No past bookings found.
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
                  className={`px-3 py-1 border rounded-none ${currentPage === i + 1 ? 'bg-[#6BB7BE] text-white' : 'bg-white text-gray-700'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl mb-4">Customer Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Address:</strong> {selectedUser.address || 'N/A'}</p>
            <p><strong>Date & Time:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTablePage;
