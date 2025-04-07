// src/app/context/OfficeTourContext.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface Tour {
  _id?: string;
  image: string;
  title: string;
  text: string;
}

interface OfficeTourContextProps {
  tours: Tour[];
  fetchTours: () => void;
}

const OfficeTourContext = createContext<OfficeTourContextProps>({
  tours: [],
  fetchTours: () => {},
});

export const useOfficeTour = () => useContext(OfficeTourContext);

export const OfficeTourProvider = ({ children }: { children: React.ReactNode }) => {
  const [tours, setTours] = useState<Tour[]>([]);

  const fetchTours = async () => {
    const res = await fetch('/api/office-tours');
    const data = await res.json();
    setTours(data);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <OfficeTourContext.Provider value={{ tours, fetchTours }}>
      {children}
    </OfficeTourContext.Provider>
  );
};
