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
