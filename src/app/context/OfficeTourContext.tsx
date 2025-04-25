"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

interface Tour {
  _id?: string;
  image: string;
  title: string;
  description: string;
}

interface ApiResponse {
  success: boolean;
  data?: Tour[];
  error?: string;
}

interface OfficeTourContextProps {
  tours: Tour[];
  addTour: (newTour: FormData) => Promise<void>;
  fetchTours: () => Promise<void>;
}

const OfficeTourContext = createContext<OfficeTourContextProps | undefined>(
  undefined,
);

export const OfficeTourProvider = ({ children }: { children: ReactNode }) => {
  const [tours, setTours] = useState<Tour[]>([]);

  // ✅ Fetch Tours (Using your existing "/api/office-tours" route)
  const fetchTours = async () => {
    try {
      const response = await axios.get<ApiResponse>("/api/office-tours");
      if (response.data.success && Array.isArray(response.data.data)) {
        setTours(response.data.data); // Only set if data is an array
      } else {
        console.error("Error fetching tours:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  // ✅ Add Tour (Using your existing "/api/office-tours" route)
  const addTour = async (newTour: FormData) => {
    try {
      const response = await axios.post<ApiResponse>(
        "/api/office-tours",
        newTour,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        setTours(response.data.data || []);
      } else {
        console.error("Error adding tour:", response.data.error);
      }
    } catch (error) {
      console.error("Error adding tour:", error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <OfficeTourContext.Provider value={{ tours, addTour, fetchTours }}>
      {children}
    </OfficeTourContext.Provider>
  );
};

export const useOfficeTour = (): OfficeTourContextProps => {
  const context = useContext(OfficeTourContext);
  if (!context) {
    throw new Error("useOfficeTour must be used within an OfficeTourProvider");
  }
  return context;
};
