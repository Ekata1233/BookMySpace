"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: "user" | "vendor";
}

interface Vendor {
    _id: string;
    companyName: string;
    workEmail: string;
    phone: string;
    website?: string;
    businessType: "Individual" | "Company";
    address: string;
    message: string;
    logo: string;
    contactName: string;
    contactMobile: number;
    contactEmail: string;
    documentType: "GST" | "License" | "Other";
    documentNo: number;
    documentImage: string;
    agreed: boolean;
    userId?: string;
    paid?: boolean;
    order_id?: string;
    amount?: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  }

interface UserContextType {
    users: User[];
    refreshUsers: () => Promise<void>;
    vendors: Vendor[];
    refreshVendors: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [vendors, setVendors] = useState<Vendor[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get<{ success: boolean; data: User[] }>("/api/users");
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchVendors = async () => {
        try {
          const response = await axios.get<{ success: boolean; data: Vendor[] }>("/api/vendor/allVendors");
          setVendors(response.data.data);
        } catch (error) {
          console.error("Error fetching vendors:", error);
        }
      };
    
      useEffect(() => {
        fetchUsers();
        fetchVendors();
    }, []);
    

    return (
        <UserContext.Provider value={{ users, refreshUsers: fetchUsers,vendors, refreshVendors: fetchVendors }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUsers must be used within a UserProvider");
    }
    return context;
};
