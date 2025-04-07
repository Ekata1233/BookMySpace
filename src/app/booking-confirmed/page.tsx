"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const BookingConfirmedPage = () => {
  

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 mt-10 xl:mt-20">
      <CheckCircle2 className="text-[#6BB7BE] w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Booking Confirmed!
      </h1>
      <p className="text-lg text-center text-gray-600 mb-6">
        Your slot has been successfully booked.
      </p>

      {/* <div className="p-4 rounded-none w-full max-w-md mb-6">
        <p className="text-gray-700 mb-2"> Booking ID: {bookingId}</p>
        <p className="text-gray-700 mb-2"> Office Space: {space}</p>
        <p className="text-gray-700 mb-2"> Date: {date}</p>
        <p className="text-gray-700 mb-2"> Time: {time}</p>
        <p className="text-gray-700"> Email: {email}</p>
      </div> */}

      <Link
        href="/"
        className="bg-[#6BB7BE] text-white font-semibold py-2 px-6 rounded hover:bg-[#5499a1] transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default BookingConfirmedPage;
