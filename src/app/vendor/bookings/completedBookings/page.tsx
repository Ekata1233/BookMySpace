"use client";
import { useBookSpaces } from "@/app/context/BookSpaceContext";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/componants/sidebar/Sidebar";
import Link from "next/link";

const CompletedBookings = () => {
  const { officeSpaces } = useOfficeSpaces();
  const { bookings } = useBookSpaces();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [vendorId, setVendorId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const vendorData = localStorage.getItem("vendor");
      if (vendorData) {
        try {
          const parsedVendor = JSON.parse(vendorData);
          setVendorId(parsedVendor._id);
        } catch (error) {
          console.error("Error parsing vendor data:", error);
        }
      }
    }
  }, []);

  const filteredOfficeSpaces = officeSpaces.filter(
    (space: any) => space.vendorId === vendorId
  );

  const getOfficeDetails = (id: any) => {
    return filteredOfficeSpaces.find((office) => office._id === id);
  };

  const today = new Date().setHours(0, 0, 0, 0);

  const pastBookings = bookings.filter(
    (booking) => new Date(booking.date).getTime() < today
  );

  const validPastBookings = pastBookings.filter((booking) =>
    getOfficeDetails(booking.officeId)
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-42">
      <Sidebar
        sidebarOpen={sidebarOpen}
        openSpaces={openSpaces}
        setOpenSpaces={setOpenSpaces}
        openBookings={openBookings}
        setOpenBookings={setOpenBookings}
        openReport={openReport}
        setOpenReport={setOpenReport}
        openAccount={openAccount}
        setOpenAccount={setOpenAccount}
      />
      <main className="flex-1 max-w-4xl mx-auto p-6">
        {/* Back Button */}
        {/* <div className="mb-2">
          <Link
            href="/vendor/dashboard"
            className="inline-flex items-center gap-2 text-[#6BB7BE] hover:text-[#5AA4A9] text-sm font-medium"
          >
            <span className="text-xl">←</span> Back to Dashboard
          </Link>
        </div> */}

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">
          Completed Bookings
        </h1>

        {/* Bookings Table */}
        {validPastBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-900 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 border border-gray-300">Office</th>
                  <th className="px-4 py-3 border border-gray-300">Location</th>
                  <th className="px-4 py-3 border border-gray-300">Date</th>
                  <th className="px-4 py-3 border border-gray-300">
                    Start Time
                  </th>
                  <th className="px-4 py-3 border border-gray-300">Duration</th>
                  <th className="px-4 py-3 border border-gray-300">
                    Amount Paid
                  </th>
                  <th className="px-4 py-3 border border-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {validPastBookings.map((booking) => {
                  const office = getOfficeDetails(booking.officeId);
                  if (!office) return null;

                  return (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border border-gray-300 font-medium">
                        {office.officeSpaceName}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {office.city}, {office.state}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {booking.startTime}
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        {booking.duration} hr
                      </td>
                      <td className="px-4 py-3 border border-gray-300 text-green-700 font-semibold">
                        ₹{booking.totalPay}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold rounded-none">
                        {booking.isCancel ? (
                          <span className="text-red-600">Cancelled</span>
                        ) : new Date(booking.date) < new Date(new Date().toDateString()) ? (
                          <span className="text-yellow-600">Completed</span>
                        ) : (
                          <span className="text-blue-600">Upcoming </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10 text-base">
            No completed bookings available at the moment.
          </p>
        )}
      </main>
    </div>
  );
};

export default CompletedBookings;
