// context/CountContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type CountContextType = {
  officeSpaceCount: number;
  setOfficeSpaceCount: (count: number) => void;
  upcomingBookingCount: number;
  setUpcomingBookingCount: (count: number) => void;
  completedBookingCount: number;
  setCompletedBookingCount: (count: number) => void;
  // Add more counts here as needed
};

const CountContext = createContext<CountContextType | undefined>(undefined);

export const CountProvider = ({ children }: { children: ReactNode }) => {
  const [officeSpaceCount, setOfficeSpaceCount] = useState(0);
  const [upcomingBookingCount, setUpcomingBookingCount] = useState(0);
  const [completedBookingCount, setCompletedBookingCount] = useState(0);

  return (
    <CountContext.Provider
      value={{
        officeSpaceCount,
        setOfficeSpaceCount,
        upcomingBookingCount,
        setUpcomingBookingCount,
        completedBookingCount,
        setCompletedBookingCount
      }}
    >
      {children}
    </CountContext.Provider>
  );
};

export const useCounts = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCounts must be used within a CountProvider");
  }
  return context;
};
