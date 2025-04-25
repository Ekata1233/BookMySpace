"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

// Define the shape of a single booking
interface BookSpace {
  userId: string;
  officeId: string;
  date: string;
  startTime: string;
  duration: number;
  totalPay: number;
  createdAt?: string;
  _id?: string;
}

// Define the context type
interface BookSpaceContextType {
  bookings: BookSpace[];
  addBooking: (newBooking: BookSpace) => Promise<void>;
  refreshBookings: () => Promise<void>;
}

// Create the context
const BookSpaceContext = createContext<BookSpaceContextType | undefined>(
  undefined,
);

// Provider component
export const BookSpaceProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<BookSpace[]>([]);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get<{ success: boolean; data: BookSpace[] }>(
        "/api/book",
      );
      setBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Add a new booking
  const addBooking = async (newBooking: BookSpace) => {
    try {
      const response = await axios.post<{ success: boolean; data: BookSpace }>(
        "/api/book",
        newBooking,
      );
      setBookings((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookSpaceContext.Provider
      value={{ bookings, addBooking, refreshBookings: fetchBookings }}
    >
      {children}
    </BookSpaceContext.Provider>
  );
};

// Hook to use BookSpaceContext
export const useBookSpaces = (): BookSpaceContextType => {
  const context = useContext(BookSpaceContext);
  if (!context) {
    throw new Error("useBookSpaces must be used within a BookSpaceProvider");
  }
  return context;
};
