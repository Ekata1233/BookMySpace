import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Define the VendorBankContext
const VendorBankContext = createContext<any>(null);

// Create the provider component
export const VendorBankProvider = ({ children }: { children: React.ReactNode }) => {
  const [vendorBankDetails, setVendorBankDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all vendor bank details
  const fetchVendorBankDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/vendor/bankdetails");
      setVendorBankDetails(response.data);
    } catch (err: any) {
      setError("Error fetching bank details");
    } finally {
      setLoading(false);
    }
  };

  // Function to create new vendor bank details
  const addVendorBankDetails = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/vendor/bankdetails", data);
      setVendorBankDetails((prevState) => [...prevState, response.data]);
    } catch (err: any) {
      setError("Error adding bank details");
    } finally {
      setLoading(false);
    }
  };

  // Function to update existing vendor bank details
  const updateVendorBankDetails = async (id: string, data: any) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/vendor/bankdetails/${id}`, data);
      setVendorBankDetails((prevState) =>
        prevState.map((item) =>
          item._id === id ? { ...item, ...response.data } : item
        )
      );
    } catch (err: any) {
      setError("Error updating bank details");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete vendor bank details (soft delete)
  const deleteVendorBankDetails = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/vendor/bankdetails/${id}`);
      setVendorBankDetails((prevState) =>
        prevState.filter((item) => item._id !== id)
      );
    } catch (err: any) {
      setError("Error deleting bank details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch vendor bank details when the component mounts
  useEffect(() => {
    fetchVendorBankDetails();
  }, []);

  return (
    <VendorBankContext.Provider
      value={{
        vendorBankDetails,
        loading,
        error,
        addVendorBankDetails,
        updateVendorBankDetails,
        deleteVendorBankDetails,
      }}
    >
      {children}
    </VendorBankContext.Provider>
  );
};

// Custom hook to use the context
export const useVendorBank = () => {
  return useContext(VendorBankContext);
};
