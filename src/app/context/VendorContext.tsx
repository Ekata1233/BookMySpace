// context/VendorContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

type VendorData = {
  name: string;
  companyName: string;
  workEmail: string;
  phone: string;
  address: string;
  website?: string;
  businessType: string;
  message: string;
  agreed: boolean;
  paid: boolean;
  amount: number;
};

interface VendorContextProps {
  formData: VendorData;
  setFormData: React.Dispatch<React.SetStateAction<VendorData>>;
  submitVendor: () => Promise<void>;
}

const VendorContext = createContext<VendorContextProps | undefined>(undefined);

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) throw new Error("useVendor must be used within VendorProvider");
  return context;
};

export const VendorProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<VendorData>({
    name: "",
    companyName: "",
    workEmail: "",
    phone: "",
    address: "",
    website: "",
    businessType: "",
    message: "",
    agreed: false,
    paid: true,
    amount: 1999,
  });

  const submitVendor = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("companyName", formData.companyName);
      formDataToSend.append("workEmail", formData.workEmail);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("website", formData.website || "");
      formDataToSend.append("businessType", formData.businessType);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("agreed", String(formData.agreed));
      formDataToSend.append("paid", String(formData.paid));
      formDataToSend.append("amount", String(formData.amount));
  
      // Append your file fields here if available (logo, documentImage)
      // formDataToSend.append("logo", yourLogoFile);
      // formDataToSend.append("documentImage", yourDocFile);
  
      await axios.post("/api/vendor/registration", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Something went wrong";
      throw new Error(errorMessage);
    }
  };

  return (
    <VendorContext.Provider value={{ formData, setFormData, submitVendor }}>
      {children}
    </VendorContext.Provider>
  );
};
