// context/VendorContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

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
};

interface VendorContextProps {
  formData: VendorData;
  setFormData: React.Dispatch<React.SetStateAction<VendorData>>;
  submitVendor: () => Promise<void>;
}

const VendorContext = createContext<VendorContextProps | undefined>(undefined);

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) throw new Error('useVendor must be used within VendorProvider');
  return context;
};

export const VendorProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<VendorData>({
    name: '',
    companyName: '',
    workEmail: '',
    phone: '',
    address: '',
    website: '',
    businessType: '',
    message: '',
    agreed: false,
    paid: true,
  });

  const submitVendor = async () => {
    try {
      const response = await axios.post('/api/vendor/registration', formData);
      // Handle response if needed
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Something went wrong';
      throw new Error(errorMessage);
    }
  };

  return (
    <VendorContext.Provider value={{ formData, setFormData, submitVendor }}>
      {children}
    </VendorContext.Provider>
  );
};
