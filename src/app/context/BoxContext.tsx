"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface Box {
  _id: string;
  icon: string;
  link: string;
  text: string;
  description: string;
  isDeleted?: boolean;
}

interface BoxContextType {
  boxes: Box[];
  addBox: (newBox: Omit<Box, '_id'>) => Promise<void>;
  updateBox: (id: string, updateData: Partial<Box>) => Promise<void>;
  deleteBox: (id: string) => Promise<void>;
  refreshBoxes: () => Promise<void>;
}

const BoxContext = createContext<BoxContextType | undefined>(undefined);

export const BoxProvider = ({ children }: { children: ReactNode }) => {
  const [boxes, setBoxes] = useState<Box[]>([]);

  const fetchBoxes = async () => {
    try {
      const response = await axios.get<{ success: boolean; data: Box[] }>("/api/boxes");
      setBoxes(response.data.data);
    } catch (error) {
      console.error("Error fetching boxes:", error);
    }
  };

  const addBox = async (newBox: Omit<Box, '_id'>) => {
    try {
      const response = await axios.post<{ success: boolean; data: Box }>("/api/boxes", newBox);
      setBoxes((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.error("Error adding box:", error);
    }
  };

  const updateBox = async (id: string, updateData: Partial<Box>) => {
    try {
      const response = await axios.put<{ success: boolean; data: Box }>("/api/boxes", { _id: id, ...updateData });
      setBoxes((prev) => prev.map(box => box._id === id ? response.data.data : box));
    } catch (error) {
      console.error("Error updating box:", error);
    }
  };

  const deleteBox = async (id: string) => {
    try {
      await axios.delete("/api/boxes", { data: { _id: id } });
      setBoxes((prev) => prev.filter(box => box._id !== id));
    } catch (error) {
      console.error("Error deleting box:", error);
    }
  };

  useEffect(() => {
    fetchBoxes();
  }, []);

  return (
    <BoxContext.Provider value={{ boxes, addBox, updateBox, deleteBox, refreshBoxes: fetchBoxes }}>
      {children}
    </BoxContext.Provider>
  );
};

export const useBoxes = (): BoxContextType => {
  const context = useContext(BoxContext);
  if (!context) {
    throw new Error("useBoxes must be used within a BoxProvider");
  }
  return context;
};