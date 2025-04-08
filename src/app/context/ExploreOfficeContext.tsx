"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface Office {
  _id?: string;
  name: string;
  address: string;
  image: string;
}

interface ContextType {
  offices: Office[];
  fetchOffices: () => void;
  addOffice: (formData: FormData) => void;
  updateOffice: (id: string, data: Office) => void;
  deleteOffice: (id: string) => void;
}

const ExploreOfficeContext = createContext<ContextType | null>(null);

export const ExploreOfficeProvider = ({ children }: { children: React.ReactNode }) => {
  const [offices, setOffices] = useState<Office[]>([]);

  const fetchOffices = async () => {
    try {
      const res = await axios.get<{ data: Office[] }>("/api/explore-office");
      setOffices(res.data.data);
    } catch (error) {
      console.error("Failed to fetch offices:", error);
    }
  };

  const addOffice = async (formData: FormData) => {
    try {
      const res = await axios.post<{ data: Office }>("/api/explore-office", formData);
      setOffices((prev) => [...prev, res.data.data]);
    } catch (error) {
      console.error("Failed to add office:", error);
    }
  };

  const updateOffice = async (id: string, data: Office) => {
    try {
      const res = await axios.put<{ data: Office }>(`/api/explore-office/${id}`, data);
      setOffices((prev) => prev.map((item) => (item._id === id ? res.data.data : item)));
    } catch (error) {
      console.error("Failed to update office:", error);
    }
  };

  const deleteOffice = async (id: string) => {
    try {
      await axios.delete(`/api/explore-office/${id}`);
      setOffices((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete office:", error);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  return (
    <ExploreOfficeContext.Provider
      value={{ offices, fetchOffices, addOffice, updateOffice, deleteOffice }}
    >
      {children}
    </ExploreOfficeContext.Provider>
  );
};

export const useExploreOffice = () => {
  const context = useContext(ExploreOfficeContext);
  if (!context) throw new Error("useExploreOffice must be used within ExploreOfficeProvider");
  return context;
};
