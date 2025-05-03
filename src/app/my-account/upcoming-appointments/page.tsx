"use client";
import { useAuth } from "@/app/context/authContext";
import { useBookSpaces } from "@/app/context/BookSpaceContext";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import Link from "next/link";
import React from "react";
import {
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { toast } from "sonner";

const UpcomingAppointments = () => {
  const { user } = useAuth();
  const { officeSpaces } = useOfficeSpaces();
  const { bookings, updateBooking, refreshBookings } = useBookSpaces();


  const formatTimeRange = (
    date: string,
    startTime: string,
    duration: number,
  ) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const start = new Date(date);
    start.setHours(hours, minutes);

    const end = new Date(start);
    end.setHours(start.getHours() + duration);

    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedStart = start.toLocaleTimeString([], options);
    const formattedEnd = end.toLocaleTimeString([], options);

    return `${formattedStart} - ${formattedEnd}`;
  };

  // Get today's date at midnight for accurate comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter only future or today’s bookings for the current user
  const upcomingBookings = bookings
    ?.filter((booking) => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      return (
        booking.userId === user?._id &&
        bookingDate >= today &&
        booking.isCancel === false
      );
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`);
      const dateB = new Date(`${b.date}T${b.startTime}`);
      return dateA.getTime() - dateB.getTime();
    });



  const handleCancelBooking = (bookingId: string) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    updateBooking(bookingId, { isCancel: true });
    toast.success("Booking Cancel successfully!");
    refreshBookings();
  };


  return (
    <div className="px-3">
      <div className="w-full bg-white  rounded-none  overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6BB7BE] to-[#58a6ac] px-6 py-3">
          <h2 className="text-white text-lg sm:text-xl font-semibold">
            Upcoming Bookings
          </h2>
        </div>

        {/* Bookings Grid */}
        <div className="">
          {upcomingBookings?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 rounded-none">
                  <tr className="rounded-none">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-none">
                      <FaMapMarkerAlt className="inline mr-1 text-[#6BB7BE]" />
                      Office
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-none">
                      <FaCalendarAlt className="inline mr-1 text-[#6BB7BE]" />
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-none">
                      <FaClock className="inline mr-1 text-[#6BB7BE]" />
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-none">
                      <FaMoneyBillWave className="inline mr-1 text-[#6BB7BE]" />
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 rounded-none">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 rounded-none">
                  {upcomingBookings.map((booking, index) => {
                    const matchedOffice = officeSpaces.find(
                      (office) => office._id === booking.officeId
                    );

                    return (
                      <tr key={index} className="hover:bg-gray-50 rounded-none">
                        <td className="px-6 py-4 text-sm text-gray-800 rounded-none">
                          {matchedOffice
                            ? `${matchedOffice.officeSpaceName}, ${matchedOffice.city}`
                            : "Office not found"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 rounded-none">
                          {new Date(booking.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 rounded-none">
                          {formatTimeRange(
                            booking.date,
                            booking.startTime,
                            booking.duration
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-600 rounded-none">
                          ₹ {booking.totalPay}
                        </td>
                        <td className="px-6 py-4 text-sm rounded-none space-x-3">
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
            <p className="text-center text-gray-500 text-sm px-6 py-10">
              You have no bookings yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
