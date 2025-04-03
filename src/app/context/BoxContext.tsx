"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface Box {
  icon: string;
  link: string;
  text: string;
  description: string;
}

interface BoxContextType {
  boxes: Box[];
  addBox: (newBox: Box) => Promise<void>;
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

  const addBox = async (newBox: Box) => {
    try {
      const response = await axios.post<{ success: boolean; data: Box }>("/api/boxes", newBox);
      setBoxes((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.error("Error adding box:", error);
    }
  };

  useEffect(() => {
    fetchBoxes();
  }, []);

  return (
    <BoxContext.Provider value={{ boxes, addBox, refreshBoxes: fetchBoxes }}>
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
