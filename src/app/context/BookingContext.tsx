"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext<any>(null);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookings, setBookings] = useState([]);

  const addBooking = async (bookingData: any) => {
    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Failed to book");

      const newBooking = await res.json();
      setBookings((prev) => [...prev, newBooking]);
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookSpace = () => useContext(BookingContext);
