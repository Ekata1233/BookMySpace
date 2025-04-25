"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  vendor: any;
  formData: VendorData;
  setFormData: React.Dispatch<React.SetStateAction<VendorData>>;
  submitVendor: () => Promise<void>;
  logoutVendor: () => void;
  vendorLogin: (email: string, password: string) => Promise<void>;
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

  const [vendor, setVendor] = useState<any>(null);
  const router = useRouter();

  // Load vendor from localStorage
  useEffect(() => {
    const storedVendor = localStorage.getItem("vendor");
    if (storedVendor && storedVendor !== "undefined") {
      try {
        setVendor(JSON.parse(storedVendor));
      } catch (error) {
        console.error("Error parsing vendor from localStorage:", error);
        localStorage.removeItem("vendor");
      }
    }
  }, []);

  // Submit and login vendor
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

      // 🚀 Submit to your API
      const response = await axios.post("/api/vendor/registration", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;

      // ✅ Save vendor & token in localStorage
      localStorage.setItem("vendor", JSON.stringify(data.vendor));
      localStorage.setItem("vendorToken", data.token);
      setVendor(data.vendor);

      toast.success("Vendor registered & logged in! 🚀");
      router.push("/"); // or wherever you want to send them
    } catch (error: any) {
      const errMsg = error.response?.data?.error || "Vendor registration failed";
      toast.error(errMsg);
    }
  };

  const vendorLogin = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/vendor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workEmail: email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setVendor(data.vendor);
        localStorage.setItem("vendor", JSON.stringify(data.vendor));
        localStorage.setItem("vendorToken", data.token);
        alert("Login successful!");
        router.push("/");
      } else {
        // alert("Vendor Login Failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  };

  // Logout
  const logoutVendor = () => {
    setVendor(null);
    localStorage.removeItem("vendor");
    localStorage.removeItem("vendorToken");
    router.push("/auth"); // or vendor login page
  };

  const fetchVendor = async () => {
    const token = localStorage.getItem("vendorToken");
    if (!token) return;
  
    try {
      const res = await fetch("/api/vendor/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setVendor(data.vendor);
        localStorage.setItem("vendor", JSON.stringify(data.vendor));
      } else {
        toast.error("Invalid token or session expired.");
        logoutVendor();
      }
    } catch (error) {
      console.error("Fetch vendor error:", error);
    }
  };
  
  useEffect(() => {
    fetchVendor();
  }, []);

  return (
    <VendorContext.Provider
      value={{ vendor, formData, setFormData, submitVendor, logoutVendor, vendorLogin }}
    >
      {children}
    </VendorContext.Provider>
  );
};
