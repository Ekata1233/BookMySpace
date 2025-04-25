"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the type for a Booking
interface Booking {
  id: string;
  name: string;
  date: string;
  // Add other properties as needed
}

// Define the type for the context value
interface BookingContextType {
  bookings: Booking[];
  addBooking: (bookingData: Booking) => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]); // Type the state as an array of Booking objects

  const addBooking = async (bookingData: Booking) => {
    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Failed to book");

      const newBooking: Booking = await res.json();
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

export const useBookSpace = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookSpace must be used within a BookingProvider");
  }
  return context;
};
