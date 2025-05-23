"use client";
import { useBookSpaces } from "@/app/context/BookSpaceContext";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCounts } from "@/app/context/CountContext";
import Sidebar from "@/app/componants/sidebar/Sidebar";
import { toast } from "sonner";

const UpcomingBookings = () => {
  const { officeSpaces } = useOfficeSpaces();
  const { bookings, updateBooking, refreshBookings } = useBookSpaces();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const { setUpcomingBookingCount } = useCounts();

  const [vendorId, setVendorId] = useState<string | null>(null);

  // Use useEffect to handle localStorage access only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const vendorData = localStorage.getItem("vendor");
      if (vendorData) {
        try {
          const parsedVendor = JSON.parse(vendorData);
          setVendorId(parsedVendor._id); // Set the vendor ID in state
        } catch (error) {
          console.error("Error parsing vendor data:", error);
        }
      }
    }
  }, []); // Run only once when the component is mounted on the client side

  const filteredOfficeSpaces = officeSpaces.filter(
    (space: any) => space.vendorId === vendorId,
  );



  const getOfficeDetails = (id: any) => {
    return filteredOfficeSpaces.find((office) => office._id === id);
  };

  // Get today's date
  const today = new Date().setHours(0, 0, 0, 0); // To compare only the date part, ignoring time

  // Filter bookings to only include future ones (including today)
  const futureBookings = bookings.filter(
    (booking) => new Date(booking.date).getTime() >= today,
  );

  const validFutureBookings = futureBookings.filter((booking) => 
    !booking.isCancel && getOfficeDetails(booking.officeId),
  );

  useEffect(() => {
    setUpcomingBookingCount(validFutureBookings.length);
  }, [validFutureBookings, setUpcomingBookingCount]);

  const handleCancelBooking = (bookingId: string) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    updateBooking(bookingId, { isCancel: true });
    toast.success("Booking Cancel successfully!");
    refreshBookings();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen mt-42">
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
      {/* Back Button */}
      <main className="flex-1 max-w-4xl mx-auto p-6">
        <div className="mb-2"></div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2">
          Upcoming Bookings
        </h1>

        {/* Bookings Table */}
        {validFutureBookings.length > 0 ? (
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {validFutureBookings.map((booking) => {
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
                      <td className="px-4 py-3 border border-gray-300 text-green-700 font-semibold space-x-3">
                        <Link
                          href={`/office-space/${booking.officeId}`}
                          className="text-[#6BB7BE] hover:underline"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleCancelBooking(booking._id!)}
                          className="text-red-500 hover:underline"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10 text-base">
            No bookings available at the moment.
          </p>
        )}
      </main>
    </div>
  );
};

export default UpcomingBookings;
