"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

// Define Office Space Type
interface OfficeSpace {
  _id: string;
  officeSpaceName: string;
  address: string;
  description: string;
  rate: number;
  amenities: string[];
  isNewlyOpen: boolean;
}

interface OfficeSpaceContextType {
  officeSpaces: OfficeSpace[];
}

const OfficeSpaceContext = createContext<OfficeSpaceContextType | undefined>(undefined);

export const OfficeSpaceProvider = ({ children }: { children: ReactNode }) => {
  const [officeSpaces, setOfficeSpaces] = useState<OfficeSpace[]>([]);

  const fetchOfficeSpaces = async () => {
    try {
      const response = await axios.get<{ data: OfficeSpace[] }>("/api/officeSpaces");
      setOfficeSpaces(response.data.data);
    } catch (error) {
      console.error("Error fetching office spaces:", error);
    }
  };

  useEffect(() => {
    fetchOfficeSpaces();
  }, []);

  return (
    <OfficeSpaceContext.Provider value={{ officeSpaces }}>
      {children}
    </OfficeSpaceContext.Provider>
  );
};

export const useOfficeSpaces = (): OfficeSpaceContextType => {
  const context = useContext(OfficeSpaceContext);
  if (!context) {
    throw new Error("useOfficeSpaces must be used within an OfficeSpaceProvider");
  }
  return context;
};
