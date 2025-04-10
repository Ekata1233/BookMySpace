// src/app/context/WorkBusinessContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

export interface WorkBusinessType {
  _id: string;
  title: string;
  description1: string;
  description2: string;
  imageTop: string;
  imageBottom: string;
}

interface WorkBusinessContextProps {
  workBusinessData: WorkBusinessType[];
  fetchWorkBusiness: () => void;
  createWorkBusiness: (data: FormData) => Promise<void>;
  updateWorkBusiness: (id: string, data: FormData) => Promise<void>;
  deleteWorkBusiness: (id: string) => Promise<void>;
}

const WorkBusinessContext = createContext<WorkBusinessContextProps | undefined>(undefined);

export const WorkBusinessProvider = ({ children }: { children: ReactNode }) => {
  const [workBusinessData, setWorkBusinessData] = useState<WorkBusinessType[]>([]);

  const fetchWorkBusiness = async () => {
    try {
      const res = await axios.get('/api/workbusiness');
      setWorkBusinessData(res.data);
    } catch (error) {
      console.error('Failed to fetch work business:', error);
    }
  };
console.log("workbusiness data : ",workBusinessData);

  const createWorkBusiness = async (data: FormData) => {
    try {
      await axios.post('/api/workbusiness', data);
      fetchWorkBusiness();
    } catch (error) {
      console.error('Failed to create work business:', error);
    }
  };

  const updateWorkBusiness = async (id: string, data: FormData) => {
    try {
      await axios.put(`/api/workbusiness/${id}`, data);
      fetchWorkBusiness();
    } catch (error) {
      console.error('Failed to update work business:', error);
    }
  };

  const deleteWorkBusiness = async (id: string) => {
    try {
      await axios.delete(`/api/workbusiness/${id}`);
      fetchWorkBusiness();
    } catch (error) {
      console.error('Failed to delete work business:', error);
    }
  };
  useEffect(() => {
    fetchWorkBusiness();
  }, []);

  return (
    <WorkBusinessContext.Provider
      value={{
        workBusinessData,
        fetchWorkBusiness,
        createWorkBusiness,
        updateWorkBusiness,
        deleteWorkBusiness,
      }}
    >
      {children}
    </WorkBusinessContext.Provider>
  );
};

export const useWorkBusiness = (): WorkBusinessContextProps => {
  const context = useContext(WorkBusinessContext);
  if (!context) {
    throw new Error('useWorkBusiness must be used within a WorkBusinessProvider');
  }
  return context;
};
