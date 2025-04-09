'use client';

import Image from 'next/image';
import React from 'react';

const steps = [
  {
    id: 1,
    image: '/Office_Space_Pricing_Step_1.png',
    title: '1. Choose your space',
    description: 'Select from office spaces, coworking, Virtual Spaces, meeting rooms, or dedicated desks.'
  },
  {
    id: 2,
    image: '/Office_Space_Pricing_Step_2.png',
    title: '2. Customise your setup',
    description: 'Personalise your workspace with the right amenities, layout, and services.'
  },
  {
    id: 3,
    image: '/Office_Space_Pricing_Step_3.png',
    title: '3. Sign up and start working',
    description: 'Move in or activate your space instantly—our team handles the details.'
  }
];

const RentSteps = () => {
  return (
    <div className="container mx-auto p-4 mt-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight sm:leading-snug md:leading-normal text-start pt-8">
      Get your ideal workspace in three quick steps.
        <span className="text-[#6BB7BE] font-extrabold">.</span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 py-2">Browse top spaces, customise your choice, and start working hassle-free. Our solutions are affordable, flexible, and designed to fit your business needs. Whether you need an office, coworking space, Virtual Space, or meeting room, we have the perfect option for you.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div key={step.id} className="p-6 shadow-md  bg-white flex flex-col text-start h-full">
            <div className="w-full h-full">
              <Image 
                src={step.image} 
                alt={step.title} 
                width={500} 
                height={300} 
                className="w-full h-full object-cover rounded-lg mb-4"
              />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">{step.title}</h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 py-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentSteps;
