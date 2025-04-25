"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

interface VendorBankDetails {
  _id: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
  branchName?: string;
  accountType: "Savings" | "Current";
  phone?: string;
  bankProof?: string | null;
  verification: "Pending" | "Verified";
  vendorId: string;
  isDeleted?: boolean;
}

interface VendorBankDetailsContextType {
  vendorBankDetails: VendorBankDetails[];
  addVendorBankDetail: (
    newBankDetail: Omit<VendorBankDetails, "_id">,
  ) => Promise<void>;
  updateVendorBankDetail: (
    id: string,
    updateData: Partial<VendorBankDetails>,
  ) => Promise<void>;
  deleteVendorBankDetail: (id: string) => Promise<void>;
  refreshVendorBankDetails: () => Promise<void>;
}

const VendorBankDetailsContext = createContext<
  VendorBankDetailsContextType | undefined
>(undefined);

export const VendorBankDetailsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [vendorBankDetails, setVendorBankDetails] = useState<
    VendorBankDetails[]
  >([]);

  const fetchVendorBankDetails = async () => {
    try {
      const response = await axios.get<{
        success: boolean;
        data: VendorBankDetails[];
      }>("/api/vendor/bankDetails");
      setVendorBankDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching vendor bank details:", error);
    }
  };

  const addVendorBankDetail = async (
    newBankDetail: Omit<VendorBankDetails, "_id">,
  ) => {
    // Optimistic UI update
    setVendorBankDetails((prev) => [
      ...prev,
      { ...newBankDetail, _id: "optimistic-id" },
    ]);

    try {
      const response = await axios.post<{
        success: boolean;
        data: VendorBankDetails;
      }>("/api/vendor/bankDetails", newBankDetail);
      setVendorBankDetails((prev) =>
        prev.map((vendorBankDetail) =>
          vendorBankDetail._id === "optimistic-id"
            ? response.data.data
            : vendorBankDetail,
        ),
      );
    } catch (error) {
      console.error("Error adding vendor bank detail:", error);
      // Rollback the optimistic update on error
      setVendorBankDetails((prev) =>
        prev.filter(
          (vendorBankDetail) => vendorBankDetail._id !== "optimistic-id",
        ),
      );
    }
  };

  const updateVendorBankDetail = async (
    id: string,
    updateData: Partial<VendorBankDetails>,
  ) => {
    try {
      const response = await axios.put<{
        success: boolean;
        data: VendorBankDetails;
      }>("/api/vendor/bankDetails", { _id: id, ...updateData });
      setVendorBankDetails((prev) =>
        prev.map((vendorBankDetail) =>
          vendorBankDetail._id === id ? response.data.data : vendorBankDetail,
        ),
      );
    } catch (error) {
      console.error("Error updating vendor bank detail:", error);
    }
  };

  const deleteVendorBankDetail = async (id: string) => {
    try {
      await axios.delete("/api/vendor/bankDetails", { data: { _id: id } });
      setVendorBankDetails((prev) =>
        prev.filter((vendorBankDetail) => vendorBankDetail._id !== id),
      );
    } catch (error) {
      console.error("Error deleting vendor bank detail:", error);
    }
  };

  useEffect(() => {
    fetchVendorBankDetails();
  }, []);

  return (
    <VendorBankDetailsContext.Provider
      value={{
        vendorBankDetails,
        addVendorBankDetail,
        updateVendorBankDetail,
        deleteVendorBankDetail,
        refreshVendorBankDetails: fetchVendorBankDetails,
      }}
    >
      {children}
    </VendorBankDetailsContext.Provider>
  );
};

export const useVendorBankDetails = (): VendorBankDetailsContextType => {
  const context = useContext(VendorBankDetailsContext);
  if (!context) {
    throw new Error(
      "useVendorBankDetails must be used within a VendorBankDetailsProvider",
    );
  }
  return context;
};
