"use client";

import * as React from "react";
import { useState, useEffect } from "react";

const images = [
  "/hero1.jpeg",
  "/hero_2.jpeg",
  "/hero_3.jpeg",
  "/hero_4.jpeg",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[77vh] flex items-center justify-center relative overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default Hero;