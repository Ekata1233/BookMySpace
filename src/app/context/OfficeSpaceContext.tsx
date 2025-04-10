"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

// Define Office Space Type
interface OfficeSpace {
  _id: string;
  officeSpaceName: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
  rate: number;
  amenities: string[];
  isNewlyOpen: boolean;
  category: string;
  image?: File | null;
  thumbnailImage: string;
  city: string;
  state: string;
  pincode: string;
}

interface ApiResponse {
  success: boolean;
  data?: OfficeSpace;
  error?: string;
}

interface OfficeSpaceContextType {
  officeSpaces: OfficeSpace[];
  loading: boolean;
  addOfficeSpace: (newOfficeSpace: FormData) => Promise<void>;
  refreshOfficeSpaces: () => Promise<void>;
}

const OfficeSpaceContext = createContext<OfficeSpaceContextType | undefined>(undefined);

export const OfficeSpaceProvider = ({ children }: { children: ReactNode }) => {
  const [officeSpaces, setOfficeSpaces] = useState<OfficeSpace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  // ✅ Fetch Office Spaces (Using your existing "/api/officeSpaces" route)
  const fetchOfficeSpaces = async () => {
    try {
      const response = await axios.get<{ data: OfficeSpace[] }>("/api/officeSpaces");
      setOfficeSpaces(response.data.data);
    } catch (error) {
      console.error("Error fetching office spaces:", error);
    }finally {
      setLoading(false); // hide loader after fetch
    }
  };

  // ✅ Add Office Space (Using your existing "/api/officeSpaces" route)
  const addOfficeSpace = async (newOfficeSpace: FormData) => {
    try {
      const response = await axios.post<{ data: OfficeSpace }>("/api/officeSpaces", newOfficeSpace, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOfficeSpaces((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.error("Error adding office space:", error);
    }
  };

  useEffect(() => {
    fetchOfficeSpaces();
  }, []);

  return (
    <OfficeSpaceContext.Provider value={{ officeSpaces,loading, addOfficeSpace, refreshOfficeSpaces: fetchOfficeSpaces }}>
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
