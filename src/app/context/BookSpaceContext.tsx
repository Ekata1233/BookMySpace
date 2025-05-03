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
  vendorId: string;
  date: string;
  startTime: string;
  duration: number;
  totalPay: number;
  createdAt?: string;
  _id?: string;
  isCancel?: boolean;
}

// Define the context type
interface BookSpaceContextType {
  bookings: BookSpace[];
  addBooking: (newBooking: BookSpace) => Promise<void>;
  updateBooking: (id: string, updateData: Partial<BookSpace>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
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

  const updateBooking = async (id: string, updateData: Partial<BookSpace>) => {
    try {
      const response = await axios.put<{ success: boolean; data: BookSpace }>(
        `/api/book/${id}`,
        updateData,
      );
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? response.data.data : booking,
        ),
      );
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  // Soft delete a booking
  const deleteBooking = async (id: string) => {
    try {
      await axios.delete(`/api/book/${id}`);
      setBookings((prev) =>
        prev.filter((booking) => booking._id !== id),
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookSpaceContext.Provider
      value={{
        bookings, addBooking, updateBooking,
        deleteBooking, refreshBookings: fetchBookings
      }}
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
