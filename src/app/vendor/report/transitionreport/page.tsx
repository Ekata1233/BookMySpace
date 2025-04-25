"use client";
import Sidebar from "@/app/componants/sidebar/Sidebar";
import { useState } from "react";
import * as XLSX from "xlsx";

const TransitionPage = () => {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
const {bookings}=useRazo
  const transitions = [
    { id: "T001", user: "Alice", status: "Completed" },
    { id: "T002", user: "Bob", status: "Pending" },
    { id: "T003", user: "Charlie", status: "Failed" },
    { id: "T004", user: "David", status: "Completed" },
    { id: "T005", user: "Eva", status: "Pending" },
    { id: "T006", user: "Frank", status: "Completed" },
    { id: "T007", user: "Grace", status: "Failed" },
    { id: "T008", user: "Helen", status: "Completed" },
    { id: "T009", user: "Ivy", status: "Pending" },
    { id: "T010", user: "Jack", status: "Completed" },
  ];

  const filteredTransitions = transitions.filter((transition) =>
    transition.id.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredTransitions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransitions = filteredTransitions.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredTransitions.map((t, index) => ({
        SL: index + 1,
        "Transition ID": t.id,
        User: t.user,
        Status: t.status,
      })),
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transitions");
    XLSX.writeFile(wb, "transitions.xlsx");
  };

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen mt-42"
      style={{ backgroundColor: "#f5f5f5" }}
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
            placeholder="Search Transition ID"
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
              {currentTransitions.length > 0 ? (
                currentTransitions.map((transition, index) => (
                  <tr
                    key={transition.id}
                    className="border-t hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 rounded-none">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4 rounded-none">{transition.id}</td>
                    <td className="px-6 py-4 rounded-none">
                      {transition.user}
                    </td>
                    <td className="px-6 py-4 rounded-none">
                      {transition.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center px-6 py-4 text-gray-500 rounded-none"
                  >
                    No transitions found.
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
                    currentPage === i + 1
                      ? "bg-[#6BB7BE] text-white"
                      : "bg-white text-gray-700"
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
