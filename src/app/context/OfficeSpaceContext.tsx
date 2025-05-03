"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
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
  ratePerMonth: number;
  amenities: string[];
  isNewlyOpen: boolean;
  category: string;
  image?: File | null;
  thumbnailImage: string;
  city: string;
  state: string;
  pincode: string;
  isAdminApprove: boolean;
}

interface ApiResponse {
  success: boolean;
  data?: OfficeSpace;
  error?: string;
}

interface OfficeSpaceContextType {
  officeSpaces: OfficeSpace[];
  filteredOfficeSpaces: OfficeSpace[];
  setFilteredOfficeSpaces: React.Dispatch<React.SetStateAction<OfficeSpace[]>>;
  loading: boolean;
  addOfficeSpace: (newOfficeSpace: FormData) => Promise<void>;
  refreshOfficeSpaces: () => Promise<void>;
  updateOfficeSpace: (
    id: string,
    updateData: Partial<OfficeSpace>,
  ) => Promise<void>;
  deleteOfficeSpace: (id: string) => Promise<void>;
}

const OfficeSpaceContext = createContext<OfficeSpaceContextType | undefined>(
  undefined,
);

export const OfficeSpaceProvider = ({ children }: { children: ReactNode }) => {
  const [officeSpaces, setOfficeSpaces] = useState<OfficeSpace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredOfficeSpaces, setFilteredOfficeSpaces] = useState<
    OfficeSpace[]
  >([]);

  useEffect(() => {
    fetchOfficeSpaces();
  }, []);

  // ✅ Fetch Office Spaces (Using your existing "/api/officeSpaces" route)
  const fetchOfficeSpaces = async () => {
    try {
      const response = await axios.get<{ data: OfficeSpace[] }>(
        "/api/officeSpaces",
      );
      setOfficeSpaces(response.data.data);
      setFilteredOfficeSpaces(response.data.data);
    } catch (error) {
      console.error("Error fetching office spaces:", error);
    } finally {
      setLoading(false); // hide loader after fetch
    }
  };

  // ✅ Add Office Space (Using your existing "/api/officeSpaces" route)
  const addOfficeSpace = async (newOfficeSpace: FormData) => {
    try {
      const response = await axios.post<{ data: OfficeSpace }>(
        "/api/officeSpaces",
        newOfficeSpace,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setOfficeSpaces((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.error("Error adding office space:", error);
    }
  };

  const updateOfficeSpace = async (
    id: string,
    updateData: Partial<OfficeSpace>,
  ) => {
    console.log("Updating office space with ID:", id);
    console.log("Data being sent:", updateData);

    try {
      const response = await axios.put<{ success: boolean; data: OfficeSpace }>(
        `/api/officeSpaces/${id}`,
        { _id: id, ...updateData },
      );
      setOfficeSpaces((prev) =>
        prev.map((officeSpaces) =>
          officeSpaces._id === id ? response.data.data : officeSpaces,
        ),
      );
    } catch (error) {
      console.error("Error updating officeSpaces:", error);
    }
  };

  // const deleteOfficeSpace = async (id: string) => {
  //   try {
  //     await axios.delete(`/api/officeSpaces/${id}`, { data: { _id: id } });
  //     setOfficeSpaces((prev) =>
  //       prev.filter((officeSpaces) => officeSpaces._id !== id),
  //     );
  //   } catch (error) {
  //     console.error("Error deleting officeSpaces:", error);
  //   }
  // };


  const deleteOfficeSpace = async (id: string) => {
    try {
      await axios.delete(`/api/officeSpaces/${id}`);
      setOfficeSpaces((prev) =>
        prev.filter((officeSpace) => officeSpace._id !== id),
      );
    } catch (error) {
      console.error("Error deleting office space:", error);
    }
  };
  
  useEffect(() => {
    fetchOfficeSpaces();
  }, []);

  return (
    <OfficeSpaceContext.Provider
      value={{
        officeSpaces,
        filteredOfficeSpaces,
        setFilteredOfficeSpaces,
        loading,
        addOfficeSpace,
        refreshOfficeSpaces: fetchOfficeSpaces,
        updateOfficeSpace,
        deleteOfficeSpace,
      }}
    >
      {children}
    </OfficeSpaceContext.Provider>
  );
};

export const useOfficeSpaces = (): OfficeSpaceContextType => {
  const context = useContext(OfficeSpaceContext);
  if (!context) {
    throw new Error(
      "useOfficeSpaces must be used within an OfficeSpaceProvider",
    );
  }
  return context;
};
