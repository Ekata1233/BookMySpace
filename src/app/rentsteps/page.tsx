'use client';

import Image from 'next/image';
import React from 'react';

const steps = [
  {
    id: 1,
    image: '/Office_Space_Pricing_Step_1.png',
    title: '1. Select and set up your office space',
    description: 'Choose the perfect location, decide how many people will use the space, and pick a layout that suits your team’s workflow.'
  },
  {
    id: 2,
    image: '/Office_Space_Pricing_Step_2.png',
    title: '2. Personalise and upgrade it',
    description: 'Use our Design Your Office service to tailor your space to your needs, or let us handle the specifications for you.'
  },
  {
    id: 3,
    image: '/Office_Space_Pricing_Step_3.png',
    title: '3. Sign up and move in',
    description: 'Once your contract is signed, you’re ready to start working. Our experts will manage all the details, including any last-minute changes.'
  }
];

const RentSteps = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight sm:leading-snug md:leading-normal text-start pt-8">
        Rent your ideal office in three quick steps
        <span className="text-[#6BB7BE] font-extrabold">.</span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 py-2">Browse top spaces, customize your choice, and move in hassle-free. Our offices are affordable, flexible, and designed to fit your business needs. Whether you're a startup, freelancer, or established business, we have the perfect space for you.</p>

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
