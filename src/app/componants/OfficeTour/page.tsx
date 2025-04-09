'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface OfficeTourItem {
  _id: string;
  image: string;
  title: string;
  description: string;
}

const OfficeTour = () => {
  const [tours, setTours] = useState<OfficeTourItem[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch('/api/office-tours');
        const data = await res.json();
        if (data.success) {
          setTours(data.data);
        }
      } catch (err) {
        console.error('Error fetching office tours:', err);
      }
    };

    fetchTours();
  }, []);

  return (
    <div>
      <div className="mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 text-center pt-12">
          Top-Tier Business Offices & Coworking Hubs in 
        </h1>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-500 text-center font-semibold py-5">
          Empowering Workspaces That Scale with Your Success
        </h1>
        <div className="flex justify-center">
          <Button className="text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-6 py-6 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none my-4">
            Book Office Tour Now
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 my-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tours.map((item, index) => (
            <div
              key={item._id || index}
              className="image-container shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Title */}
              <h2 className="absolute  w-full px-8 py-5 text-center break-words title-overlay">{item.title}</h2>

              {/* Hover Description */}
              <div className="hover-text text-base md:text-lg lg:text-xl xl:text-xl text-center px-4 md:px-6 break-words">
                <p className="absolute  w-full px-8 py-5 text-center break-words ">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficeTour;
